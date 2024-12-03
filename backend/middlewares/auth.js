import jwt from "jsonwebtoken";
import { generateError } from "../utils/generate-error.js";

const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw generateError("Acceso denegado", 401);
    }

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer" || !token) {
      throw generateError("Acceso denegado", 401);
    }

    try {
      req.user = jwt.verify(token, JWT_SECRET);
    } catch (_) {
      throw generateError("Acceso denegado", 401);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export { auth };
