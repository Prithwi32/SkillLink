import Joi from "joi";

export const validateEvent = (data) => {
  const schema = Joi.object({
    title: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    skills: Joi.array().items(Joi.string().required().trim()).min(1).required(),
    date: Joi.date().required(),
    start_time: Joi.date().required(),
    end_time: Joi.date()
      .required()
      .greater(Joi.ref("start_time"))
      .messages({ "date.greater": "End time must be after start time." }),
    link: Joi.string().uri().required(),
    max_participants: Joi.number().integer().min(0),
  });

  return schema.validate(data);
};
