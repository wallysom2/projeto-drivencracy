import express from "express";
import { json } from "express";
import cors from "cors";
import pollRouter from "./src/routes/poll.route.js"


const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use (pollRouter);

app.listen(port, () => console.log(`Server running on port: ${port}`));