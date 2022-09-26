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

export async function getPollChoices(req, res) {
  const pollId = req.params.id;

  try {
    const pollChoices = await db.collection("choices").find({ pollId: pollId }).toArray();

    if (pollChoices.length === 0) {
      return res.status(404).send("Enquete não encontrada");
    }

    return res.status(200).send(pollChoices);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getPollResults(req, res) {
  const pollId = req.params.id;
  try {
    let choices = await db.collection("choices").find({ pollId: pollId }).toArray();
    let numberVotes = 0;
    let nameVotes = "";

    for (let i = 0; i < choices.length; i++) {
      let choiceVotes = choices[i].votes;

      if (choiceVotes > numberVotes) {
        numberVotes = choiceVotes;
        nameVotes = choices[i].title;
      }
    }

    const checkRepetition = await db.collection("choices").find({ votes: numberVotes }).toArray();
    let result = {};
    if (checkRepetition.length === 1) {
      result = {
        title: nameVotes,
        votes: numberVotes,
      };
    }

    if (checkRepetition.length > 1 && checkRepetition.length < 3) {
      result = {
        title: [checkRepetition[0].title, checkRepetition[1].title],
        votes: [checkRepetition[0].votes, checkRepetition[1].votes],
      };
    }

    if (checkRepetition.length >= 3) {
      return res.status(207).send("Votos empatados");
    }

    const poll = await db.collection("polls").findOne({ _id: ObjectId(pollId) });
    const pollResults = { ...poll, result };

    return res.status(200).send(pollResults);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}