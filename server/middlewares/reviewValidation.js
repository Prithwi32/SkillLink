import Joi from "joi";

export const newReviewValidation = (req, res, next) => {
  const schema = Joi.object({
    reviewedTo: Joi.string().required(),
    sessionId: Joi.string().required(),
    skillId: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().min(1).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Bad Request", error: error.details[0].message });
  }
  next();
};

export const editReviewValidation = (req, res, next) => {
  const schema = Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().min(1).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Bad Request", error: error.details[0].message });
  }
  next();
};
