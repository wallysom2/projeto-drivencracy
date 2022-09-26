import joi from "joi";

const choiceSchema = joi.object({
    title: joi.string().required().trim(),
    pollId: joi.required()
});

export default choiceSchema;