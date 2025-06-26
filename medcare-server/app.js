import "./env.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import api from "./routes/index.js";

const app = express();

// const uri = 'mongodb+srv://harshaganji2004:Harsha123@cluster0.macfwpi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// //use the following uri when running local MongoDB server
// // const uri = "mongodb://127.0.0.1:27017/MedCare";

const { USER_NAME, PASSWORD } = process.env;
const uri = `mongodb+srv://${USER_NAME}:${PASSWORD}@cluster0.macfwpi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log(err));

app.use(express.static("public"));

app.use(cors({
  origin: "https://medcare-frontend-90qq.onrender.com", // <-- your deployed frontend URL
  credentials: true
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "public/index.html");
});

app.use("/api", api);

const port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log("Server started on port: ", port);
});
