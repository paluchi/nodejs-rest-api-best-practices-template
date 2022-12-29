import Joi from "joi";
import { getType, Type } from "tst-reflect";
import { IAuthPolicy } from "../policies";

export interface IAuthPolicies {
  policies: IAuthPolicy[];
}

type ICreateAuthPolicies = (
  policies: IAuthPolicy[] | IAuthPolicy
) => IAuthPolicies;

export const createAuthPolicies: ICreateAuthPolicies = (policies) => {
  return {
    policies: Array.isArray(policies) ? policies : [policies],
  };
};

type IResources = "query" | "header" | "cookie" | "body";

export interface IValidationRules {
  resource: IResources; // "path" is not available because as an api is not required. (extra logic could be coded if needed)
  schema: Joi.ObjectSchema;
}

type ICreateValidationRules = (
  validationRules: IValidationRules | IValidationRules[]
) => IValidationRules[];

export const createValidationRules: ICreateValidationRules = (
  validationRules
) => {
  return Array.isArray(validationRules) ? validationRules : [validationRules];
};

export interface IMethodhandler {
  handler: Function;
  responseType: object;
  policies: IAuthPolicies;
  validation?: IValidationRules[];
}

export function createMethodHandler<IResponse>(
  handler: Function,
  policies: IAuthPolicies,
  validation?: IValidationRules[]
): IMethodhandler {
  function parseResponseType(type?: Type) {
    const IType = type ? type : getType<IResponse>(); // <<== get type of generic TType
    const result: any = {};

    IType.getProperties().forEach(({ name, type }) => {
      const value: string =
        type.name !== ""
          ? type.name.toLocaleLowerCase()
          : parseResponseType(type);
      result[name] = value;
    });

    return result;
  }

  const responseType = parseResponseType();

  if (Object.keys(responseType).length === 0)
    throw new Error("Handler's response not declared");

  return { handler, responseType, validation, policies };
}

type allowedMethods = "get" | "post" | "put" | "patch" | "delete" | "options";

export interface IMethod {
  method: allowedMethods;
  path: string;
  methodhandler: IMethodhandler;
  description?: string;
}

type ICreateMethod = <T extends string>(
  method: allowedMethods,
  path: T extends "" ? never : T,
  methodhandler: IMethodhandler,
  description?: string
) => IMethod;

export const createMethod: ICreateMethod = (
  method,
  path,
  methodhandler,
  description
) => {
  return { method, path, methodhandler, description };
};

export type exportedMethods = (IController | IMethod)[];

export interface IController {
  path: string;
  methods: exportedMethods;
  middlewares: ((...args: any[]) => void)[];
}

type ICreateController = (
  path: string | null,
  methods: (IController | IMethod)[] | (IController | IMethod),
  middlewares?: ((...args: any[]) => void) | ((...args: any[]) => void)[]
) => IController;

export const createController: ICreateController = (
  path,
  methods,
  middlewares
) => {
  let groupedMW: ((...args: any[]) => void)[] = [];
  if (middlewares)
    groupedMW = Array.isArray(middlewares) ? middlewares : [middlewares];

  const groupedMethods = Array.isArray(methods) ? methods : [methods];

  return {
    path: path ? path : "",
    methods: groupedMethods,
    middlewares: groupedMW,
  };
};
