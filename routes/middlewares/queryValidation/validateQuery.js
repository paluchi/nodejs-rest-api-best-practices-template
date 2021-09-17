const joi = require("joi"); //module used for request query parameters verification
const createError = require("http-errors");

//schemas for diferent request entries
const getSchema = joi.object({
  limit: joi.number().integer().min(1).required(),
  from: joi.number().integer().min(0).required(),
  search: joi.string().min(0).required(),
});
const postSchema = joi.object({
  key: joi.string().required(),
  value: joi.string().required(),
});
const putSchema = joi.object({
  key: joi.string().required(),
  value: joi.string().required(),
});
const deleteSchema = joi.object({
  id: joi.string().required(),
});

module.exports.ValidateQuery = (req, res, next) => {
  //save request parameters
  const from = parseInt(req.query.from);
  const limit = parseInt(req.query.limit);
  const search = req.query.search;
  const key = req.query.key;
  const value = req.query.value;
  const AcronymId = req.query.id;

  //call joi validation function
  let validation = {};
  switch (req.method) {
    case "GET":
      validation = getSchema.validate({
        limit: limit,
        from: from,
        search: search,
      });
      break;
    case "POST":
      validation = postSchema.validate({ key: key, value: value });
      break;
    case "PUT":
      validation = putSchema.validate({ key: key, value: value });
      break;
    case "DELETE":
      validation = deleteSchema.validate({
        id: AcronymId,
      });
      break;
  }
  if (validation.error !== undefined) {
    //if error found then return the error
    next(createError(400, validation.error.details[0].message));
  }
  //if error not found then continue
  next();
};
