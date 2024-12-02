import Joi from "joi";
import bcrypt from "bcrypt";
import { pool } from "../db/pool.js";

const register = async (req, res) => {
  try {
    const registerSchema = Joi.object({
      email: Joi.string().email().min(5).max(150).required(),
      password: Joi.string().min(3).max(150).required(),
      username: Joi.string().min(3).max(100).required(),
    });

    await registerSchema.validateAsync(req.body);

    const { email, password, username } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (email, password, username) VALUES (?, ?, ?);",
      [email, hashedPassword, username]
    );

    res.send({ message: "Registro completado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: error.message });
  }
};

export { register };
