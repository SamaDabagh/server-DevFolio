const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "https://react-devfolio.onrender.com",
    methods: ["GET", "POST"],
  })
);
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const uri =
  "mongodb+srv://sdabbaghchi:pTilggHTqxpYi8ca@cluster0.dygjhgx.mongodb.net/WebApp?retryWrites=true&w=majority";

mongoose
  .connect(uri)
  .then(() => console.log("Successfully connected to DataBase"));

const messageSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: String,
  email: String,
  message: String,
});

const Message = mongoose.model("message", messageSchema);

app.post("/save-message", (req, res) => {
  console.log("arg:", req.body);

  const message = new Message({ ...req.body });

  message
    .save()
    .then(() => console.log("Save a Message Success!!!!"))
    .catch((error) => console.error("Save a Message ERROR!!! ->", error));

  res.send(message);
});

app.get("/getall-message", (_, res) => {
  Message.find({})
    .then((data) => {
      console.log("Get All Messages Success!!!");
      res.send(data);
    })
    .catch((error) => console.error("All Messages ERROR!!! ->", error));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
