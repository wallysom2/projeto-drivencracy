import {Router} from "express";

import {getPoll, addPoll} from "../controllers/poll.controller.js";

const poolRouter = Router();

poolRouter.get("/poll", getPoll);
poolRouter.post("/poll", addPoll);

export default poolRouter;