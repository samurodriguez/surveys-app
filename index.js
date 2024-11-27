import express from "express";

const app = express();

app.use((req, res) => {
  res.send("<h1>¡Hola amigos!</h1>");
});

app.listen(3000);
