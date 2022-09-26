import {Router} from "express";

import {getPoll, addPoll, getPollChoices} from "../controllers/poll.controller.js";

const pollRouter = Router();

pollRouter.get("/poll", getPoll);
pollRouter.post("/poll", addPoll);
pollRouter.get("/poll/:id/choice/", getPollChoices);

export default pollRouter;