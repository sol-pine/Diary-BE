import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import routes from "./routes/routes";

// .env
dotenv.config();
const dataBase = String(process.env.DB_URL)

// express
const app = express();

// cors
app.use(cors());

// body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// routes
app.use(routes);

mongoose
    .connect(dataBase)
    .then(() => {
        console.log('connect')
        app.listen(8080)
    })
    .catch(err => console.log(err));