import Joi from "joi";
import bcrypt from "bcrypt";
import { pool } from "../db/pool.js";
import { generateError } from "../utils/generate-error.js";

const register = async (req, res, next) => {
  try {
    const registerSchema = Joi.object({
      email: Joi.string().email().min(5).max(150).required(),
      password: Joi.string().min(3).max(150).required(),
      username: Joi.string().min(3).max(100).required(),
    });

    await registerSchema.validateAsync(req.body);

    const { email, password, username } = req.body;

    const [[userWithSameEmail]] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    const [[userWithSameUsername]] = await pool.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (userWithSameEmail) {
      throw generateError("Ya existe una cuenta con ese email", 400);
    }

    if (userWithSameUsername) {
      throw generateError("Ya existe una cuenta con ese username", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (email, password, username) VALUES (?, ?, ?);",
      [email, hashedPassword, username]
    );

    res.status(201).send({ message: "Registro completado con éxito" });
  } catch (error) {
    next(error);
  }
};

export { register };
