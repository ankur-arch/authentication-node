const Joi = require("Joi");

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = schema.validate(req.body);
      console.log("received a request", req.body);
      if (result.error) {
        return res.status(400).json(result.error);
      }
      if (!req.value) req.value = {};
      req.value["body"] = result.value;
      next();
    };
  },
  schemas: {
    authSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
};
