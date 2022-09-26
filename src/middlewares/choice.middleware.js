import choiceSchema from "../schemas/choice.schema.js"

export function choiceValidation(req, res, next){
    const body = req.body;

    const validation = choiceSchema.validate(body);

    if(validation.error){
        res.sendStatus(422);
        return
    }

    next();
}