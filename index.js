import express from "express";
import connectDatabase from "./src/database/database.js";
import dotenv from "dotenv";


dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

connectDatabase();
app.use(express.json());

app.listen(port, () => console.log(`Server running on port: ${port}`));