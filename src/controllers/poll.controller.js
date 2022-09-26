import dayjs from "dayjs";
import db from "../database/database.js"
import { ObjectId } from "mongodb";

export async function addPoll(req, res) {
  const { title, expireAt } = req.body;
  const poll = req.body;

  try {
    const checkPoll = await db.collection("polls").findOne({ title });

    if (!checkPoll) {
      return res.status(409).send("Essa enquete já existe");
    }

    if (!expireAt) {
      let currentTime = dayjs().add(30, "day").format("YYYY-MM-D hh:mm");

      const completedPoll = { title, expireAt: currentTime };
      await db.collection("polls").insertOne(completedPoll);
      return res.status(201).send(`Enquete "${title}" foi criada!`);
    }

    await db.collection("polls").insertOne(poll);
    return res.status(201).send(`Enquete ${title} foi criada!`);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

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