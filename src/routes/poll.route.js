import {Router} from "express";

import {getPoll, addPoll, getPollChoices, getPollResults} from "../controllers/poll.controller.js";

const pollRouter = Router();

pollRouter.get("/poll", getPoll);
pollRouter.post("/poll", addPoll);
pollRouter.get("/poll/:id/choice/", getPollChoices);
pollRouter.get("/poll/:id/result", getPollResults);

export default pollRouter;