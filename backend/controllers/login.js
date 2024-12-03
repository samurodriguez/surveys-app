import Joi from "joi";
import { pool } from "../db/pool.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateError } from "../utils/generate-error.js";

const { JWT_SECRET } = process.env;

const login = async (req, res, next) => {
  try {
    const loginSchema = Joi.object({
      email: Joi.string().email().min(5).max(150).required(),
      password: Joi.string().min(3).max(150).required(),
    });

    await loginSchema.validateAsync(req.body);

    const [[user]] = await pool.query("SELECT * FROM users WHERE email = ?", [
      req.body.email,
    ]);

    if (!user) {
      throw generateError("No existe ningún usuario con ese email", 400);
    }

    const isPasswordOk = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordOk) {
      throw generateError("La contraseña es incorrecta", 400);
    }

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });

    res.send({ data: { token } });
  } catch (error) {
    next(error);
  }
};

export { login };
