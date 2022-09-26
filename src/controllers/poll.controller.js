import dayjs from "dayjs";
import db from "../database/database.js"
import { ObjectId } from "mongodb";

export async function addPoll(req, res) {
  const { title, expireAt } = req.body;
  const poll = req.body;

  try {
    const checkPoll = await db.collection("polls").findOne({ title });

    if (!!checkPoll) {
      return res.status(409).send("Essa enquete já existe");
    }

    if (!expireAt) {
      let datePoll = dayjs().add(30, "day").format("YYYY-MM-D hh:mm");

      const newPoll = { title, expireAt: datePoll };
      await db.collection("polls").insertOne(newPoll);
      return res.status(201).send(`Enquete "${title}" criada!`);
    }

    await db.collection("polls").insertOne(poll);
    return res.status(201).send(`Enquete ${title} criada!`);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
export async function getPoll(req, res) {
  const allPolls = await db.collection("polls").find().toArray();

  try {
    if (allPolls.length === 0) {
      return res.status(204).send("Sem enquetes cadastradas!");
    }
    return res.status(200).send(allPolls);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}