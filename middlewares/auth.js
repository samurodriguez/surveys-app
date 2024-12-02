import jwt from "jsonwebtoken";

const JWT_SECRET =
  "d9895b139e673fa54b74d233376b526eb60590783144f4d73821ebcb95b73b51";

const auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error("Acceso denegado");
    }

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer" || !token) {
      throw new Error("Acceso denegado");
    }

    try {
      req.user = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error("Acceso denegado");
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).send({ error: error.message });
  }
};

export { auth };
