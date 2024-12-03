import Joi from "joi";
import { pool } from "../db/pool.js";

const createSurvey = async (req, res, next) => {
  try {
    const createSurveySchema = Joi.object({
      title: Joi.string().min(4).max(500).required(),
      options: Joi.array()
        .items(Joi.string().min(2).max(500))
        .min(2)
        .max(5)
        .required(),
    });

    await createSurveySchema.validateAsync(req.body);

    const [{ insertId }] = await pool.query(
      "INSERT INTO surveys (title) VALUES (?);",
      [req.body.title]
    );

    for (const option of req.body.options) {
      await pool.query("INSERT INTO options (text, id_survey) VALUES (?, ?)", [
        option,
        insertId,
      ]);
    }

    const [[survey]] = await pool.query("SELECT * FROM surveys WHERE id = ?", [
      insertId,
    ]);

    const [options] = await pool.query(
      "SELECT * FROM options WHERE id_survey = ?",
      [insertId]
    );

    survey.options = options;

    res.status(201).send({
      message: "Encuesta creada con éxito",
      data: { survey },
    });
  } catch (error) {
    next(error);
  }
};

export { createSurvey };
