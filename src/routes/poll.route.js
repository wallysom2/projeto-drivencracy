import {Router} from "express";

import {getPoll, addPoll} from "../controllers/poll.controller.js";

const pollRouter = Router();

pollRouter.get("/poll", getPoll);
pollRouter.post("/poll", addPoll);

export default pollRouter;