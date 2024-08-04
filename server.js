import express from "express";
import { configDotenv } from "dotenv";
import connectDb from "./db/config.js";
import cors from "cors";
import router from "./routes/student.route.js";
// import dotenv from "dotenv";
configDotenv();
 
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

connectDb(process.env.CONNSTR);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Raj Zadafiya");
});

app.use("/student", router);


const PORT = process.env.PORT || 7001;

app.listen(PORT, () => {
  console.log("server listening http://localhost:7001/");
});
