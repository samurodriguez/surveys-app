import { pool } from "../db/pool.js";

const getSurveys = async (req, res, next) => {
  try {
    const [surveys] = await pool.query("SELECT * FROM surveys");

    for (const survey of surveys) {
      const [options] = await pool.query(
        "SELECT * FROM options WHERE id_survey = ?",
        [survey.id]
      );
      survey.options = options;
    }

    res.send({ data: { surveys } });
  } catch (error) {
    next(error);
  }
};

export { getSurveys };
