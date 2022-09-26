import {Router} from "express";

import {getPoll, addPoll, getPollChoices, getPollResults, postChoice, postVote} from "../controllers/poll.controller.js";
import { choiceValidation } from "../middlewares/choice.middleware.js"
const pollRouter = Router();

pollRouter.get("/poll", getPoll);
pollRouter.post("/poll", addPoll);
pollRouter.get("/poll/:id/choice/", getPollChoices);
pollRouter.get("/poll/:id/result", getPollResults);
pollRouter.post('/choice', choiceValidation, postChoice);
pollRouter.post('/choice/:id/vote', postVote);

export default pollRouter;