import Joi from "joi";

export const createSessionValidation = (req, res, next) => {
  const schema = Joi.object({
    date: Joi.date()
    .iso()
    .required()
    .custom((value, helpers) => {
      const currentDate = new Date();
      // Normalize to only compare date parts (ignoring time)
      const inputDate = new Date(value.toISOString().split("T")[0]);
      const today = new Date(currentDate.toISOString().split("T")[0]);

      if (inputDate < today) {
        return helpers.message("Date should be greater than or equal to the current date.");
      }
      return value;
    }),
    userTwo: Joi.string().required().messages({
      "any.required": "UserTwo is required.",
    }),
    skillTaughtByUserOne: Joi.string().required().messages({
      "any.required": "Skill taught by User One is required.",
    }),
    skillTaughtByUserTwo: Joi.string().required().messages({
      "any.required": "Skill taught by User Two is required.",
    }),
    link: Joi.string().uri().required().messages({
      "string.uri": "Link must be a valid URI.",
      "any.required": "Link is required.",
    }),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  next();
};

export const editSessionValidation = (req, res, next) => {
  const schema = Joi.object({
    date: Joi.date().iso().required().greater("now").messages({
      "date.greater":
        "Date should be greater than or equal to the current date.",
    }),
    skillTaughtByUserOne: Joi.string().required().messages({
      "any.required": "Skill taught by User One is required.",
    }),
    skillTaughtByUserTwo: Joi.string().required().messages({
      "any.required": "Skill taught by User Two is required.",
    }),
    link: Joi.string().uri().required().messages({
      "string.uri": "Link must be a valid URI.",
      "any.required": "Link is required.",
    }),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  next();
};
