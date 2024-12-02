import express from "express";
import { auth } from "./middlewares/auth.js";
import { register } from "./controllers/register.js";
import { login } from "./controllers/login.js";
import { createSurvey } from "./controllers/create-survey.js";

const app = express();

app.use(express.json());

app.post("/register", register);
app.post("/login", login);
app.post("/survey", auth, createSurvey);

app.listen(3000);
