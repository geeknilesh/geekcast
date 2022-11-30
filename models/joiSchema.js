const joi = require("joi");

const joiSchema = joi.object({
  firstName: joi.string().max(30).required(),
  lastName: joi.string().max(30).required(),
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  password: joi
    .string()
    .min(6)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  confirmPassword: joi.ref("password"),
});

module.exports = joiSchema;
