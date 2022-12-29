import { AttributeType } from "@aws-sdk/client-cognito-identity-provider";

export interface IAttribute {
  name: string;
  value: string;
}

type IParseAttributes = (attributes: IAttribute[]) => AttributeType[];

const standardAttrs = [
  "address",
  "nickname",
  "birthdate",
  "phone_number",
  "email",
  "picture",
  "family_name",
  "preferred_username",
  "gender",
  "profile",
  "given_name",
  "zoneinfo",
  "locale",
  "updated at",
  "middle_name",
  "website",
  "name",
];

const parseAttributes: IParseAttributes = (attributes) => {
  const attributeList: AttributeType[] = attributes.map(({ name, value }) => {
    return {
      Name: standardAttrs.includes(name!) ? name : `custom:${name}`,
      Value: value,
    };
  });

  return attributeList;
};

export default parseAttributes;
