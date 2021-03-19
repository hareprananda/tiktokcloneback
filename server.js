import express from "express";
import cors from "cors";
import Data from "./data.js";
import mongoose from "mongoose";
import VideoModel from "./model/dbModel.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// DB config
const mongoUrl = `mongodb+srv://admin:${process.env.MONGOPASSWORD}@cluster0.pof57.mongodb.net/tiktok?retryWrites=true&w=majority`;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => console.log("Database successfully connect"));

// app config
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  next();
});
// app middleware

// app endpoint
app.get("/apitest", (req, res) => res.json(Data));

app.get("/v1/posts", (req, res) => res.json(Data));

app.post("/v2/posts", (req, res) => {
  const dbVideos = req.body;

  VideoModel.create(dbVideos, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/v2/posts", (req, res) => {
  VideoModel.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
//  mongo password
