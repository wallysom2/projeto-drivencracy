import dayjs from "dayjs";
import connectDatabase from "../database/database.js"
import pollSchema from "../schemas/poll.schema.js"

export async function getPoll(req, res) {
  const {polls} = res.locals;
  try {
    const polls = await connectDatabase.collection("polls").toArray();
    res.send(polls);
  } catch (error) {
    console.log("Error getting all polls.");
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function addPoll(req, res) {
  const { error } = pollSchema.validate(req.body);
  if(error) return res.status(422).send(error.details.map(detail => detail.message)); 

  const {poll} = res.locals;
  try {
    const { title, expireAt } = req.body;
    await connectDatabase.collection("polls").insertOne({
      title, 
      expireAt: dayjs().format('DD/MM'),
    });
    res.sendStatus(201);
  } catch (error) {
    console.log("Error adding new poll.");
    console.log(error);
    return res.sendStatus(500);
  }
}