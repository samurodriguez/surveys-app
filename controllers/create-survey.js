const createSurvey = (req, res) => {
  try {
    res.send({ message: "Puedes pasar usuario " + req.user.id });
  } catch (error) {
    console.error(error);

    res.status(400).send({ message: error.message });
  }
};

export { createSurvey };
