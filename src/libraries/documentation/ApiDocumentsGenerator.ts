import fs from "fs";

export interface IInfo {
  title: string;
  description: string;
  version: string;
}

export type IServer = { url: string };

export type ISecurity = { [key: string]: [] };

export type IComponent = { [key: string]: any };

export type IDocPath = any;

export interface IDocument {
  openapi: string;
  info: IInfo;
  servers?: IServer[];
  security?: ISecurity[];
  components?: IComponent;
  paths: IDocPath;
}

interface IParameter {
  type: string;
  resource: string;
  key: string;
  flags?: any;
}

interface IProperty {
  type: string;
  items?: any[];
  keys?: any;
}

interface IPath {
  method: string;
  path: string;
  specs: {
    validation: { schema: any; resource: string }[];
    responseType: object;
  };
}

class docsGenerator {
  docs: IDocument | { paths: {} } = { paths: {} };

  constructor(template?: IDocument) {
    this.docs = template || {
      openapi: "3.0.1",
      info: {
        title: "Default title",
        description: "Default description",
        version: "1.0.0",
      },
      servers: [
        {
          url: "https://defaulturl.com",
        },
      ],
      security: [],
      paths: {},
      components: {},
    };
  }

  generateParameter({ type, resource, key, flags }: IParameter) {
    const parameter = {
      in: resource,
      name: key,
      description: flags.description || "",
      required: flags.presence ? true : false,
      schema: this.generateProperty({ type }),
    };
    return parameter;
  }

  generateProperty({ type, items, keys: obj }: IProperty) {
    const property: any = { type };
    switch (type) {
      case "object":
        property["properties"] = {};
        for (const key in obj) {
          property["properties"][key] = this.generateProperty(obj[key]);
        }
        break;
      case "array":
        property["items"] = { anyOf: [] };
        property["items"]["anyOf"] = items?.map((item) =>
          this.generateProperty(item)
        );
        break;
    }

    return property;
  }

  generateDocsPath(
    prefix: string,
    description: string | undefined,
    { method, path, specs }: IPath
  ) {
    const newRoute: string = `${prefix}/${path}`;
    const pathContent: any = {
      description: description,
      responses: {
        "200": {
          description: "",
          ...this.generateResponse(specs.responseType),
        },
      },
    };
    specs.validation.forEach(({ schema, resource }) => {
      const { keys: obj, flags } = schema.describe();

      switch (resource) {
        case "query" || "header" || "cookie":
          pathContent["parameters"] = [];
          for (const key in obj) {
            pathContent["parameters"].push(
              this.generateParameter({ resource, ...obj[key], key })
            );
          }
          break;

        case "body":
          pathContent["requestBody"] = {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {},
                },
              },
            },
            required: flags?.presence ? true : false || false,
          };
          for (const key in obj) {
            const property = this.generateProperty(obj[key]);
            pathContent["requestBody"]["content"]["application/json"]["schema"][
              "properties"
            ][key] = property;
          }
          break;
      }
    });

    this.docs.paths[newRoute] = { [method]: pathContent };
  }

  generateResponse(schema: any) {
    const generateObject = (obj: any) => {
      const result: any = {
        type: "object",
        properties: {},
      };

      for (const key in obj) {
        if (typeof obj[key] === "object") {
          result.properties[key] = { ...generateObject(obj[key]) };
        } else {
          result.properties[key] = { type: obj[key] };
        }
      }

      return result;
    };

    const parameters: any = {};

    for (const key in schema) {
      if (typeof schema[key] === "object") {
        parameters[key] = generateObject(schema[key]);
      } else {
        parameters[key] = { type: schema[key] };
      }
    }

    const result = {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ...parameters,
            },
          },
        },
      },
    };

    return result;
  }

  save(path: string) {
    fs.writeFileSync(path, JSON.stringify(this.docs));
    console.log(`Docs saved in ${path}`);
  }

  read() {
    return this.docs;
  }
}

export default docsGenerator;
