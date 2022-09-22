import joi from "joi";

const pollSchema = joi.object({
  title: joi.string().min(1).required(),
  expireAt: joi.date()
});

export default pollSchema;