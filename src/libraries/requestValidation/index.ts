import Joi from "joi"; // Module used for request query parameters verification
import { failure, success, IStatus } from "../utilities/status";

type IValidateQuery = (
  query: object,
  schema?: Joi.ObjectSchema,
  allowUnknown?: boolean
) => IStatus;

const validateQuery: IValidateQuery = (query, schema, allowUnknown = false) => {
  // Call Joi validation function
  let validation: any = schema?.validate(query, { allowUnknown }) || query;

  // If error field exists then an error courred
  if (validation.error) {
    const errorMessage = validation.error.details[0].message;
    return failure(400, errorMessage);
  }

  // If there is not error then return data
  return success(validation.value);
};

export default validateQuery;
