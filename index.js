import express from "express";
import connectDatabase from "./src/database/database.js";
import dotenv from "dotenv";


dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

connectDatabase();
app.use(express.json());

app.get ("/", (req,res) => {
    res.send ("Tudo ok")
})

app.listen(port, () => console.log(`Server running on port: ${port}`));