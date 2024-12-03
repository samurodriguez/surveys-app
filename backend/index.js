import "dotenv/config";
import express from "express";
import { auth } from "./middlewares/auth.js";
import { register } from "./controllers/register.js";
import { login } from "./controllers/login.js";
import { createSurvey } from "./controllers/create-survey.js";
import { getSurveys } from "./controllers/get-surveys.js";
import cors from "cors";

const app = express();

app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(express.json());

app.get("/surveys", getSurveys);
app.post("/register", register);
app.post("/login", login);
app.post("/survey", auth, createSurvey);

app.use((req, res) => {
  res.status(404).send({ message: "No se ha encontrado" });
});

app.use((error, req, res, _) => {
  if (error.name === "ValidationError") {
    error.httpStatus = 400;
  }

  console.error(error);
  res.status(error.httpStatus || 500).send({ message: error.message });
});

app.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});
