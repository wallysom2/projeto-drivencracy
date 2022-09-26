import joi from "joi";

const pollSchema = joi.object({
  title: joi.string().required(),
  expireAt: joi.date(),
});

export default pollSchema;