import express from "express";
import connectDatabase from "./src/database/database.js";
import dotenv from "dotenv";

import poolRouter from "./src/routes/poll.route.js"

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

connectDatabase();
app.use(express.json());

app.use(poolRouter);

app.listen(port, () => console.log(`Server running on port: ${port}`));