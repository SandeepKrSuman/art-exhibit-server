import "./env.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import api from "./routes/index.js";

const app = express();

const { USER_NAME, PASSWORD } = process.env;
// const uri = `mongodb://${USER_NAME}:${PASSWORD}@cluster0-shard-00-00.kmfwq.mongodb.net:27017,cluster0-shard-00-01.kmfwq.mongodb.net:27017,cluster0-shard-00-02.kmfwq.mongodb.net:27017/ArtExhibit?ssl=true&replicaSet=atlas-a9v4hk-shard-0&authSource=admin&retryWrites=true&w=majority`;

//use the following uri when running local MongoDB server
const uri = "mongodb://127.0.0.1:27017/ArtExhibit";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log(err));

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to ArtExhibit!</h1>");
});

app.use("/api", api);

const port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log("Server started on port: ", port);
});
