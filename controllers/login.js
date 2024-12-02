import Joi from "joi";
import { pool } from "../db/pool.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  "d9895b139e673fa54b74d233376b526eb60590783144f4d73821ebcb95b73b51";

const login = async (req, res) => {
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
      throw new Error("No existe ningún usuario con ese email");
    }

    const isPasswordOk = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordOk) {
      throw new Error("La contraseña es incorrecta");
    }

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });

    res.send({ data: { token } });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: error.message });
  }
};

export { login };
