const { selectRecipes } = require("../models/recipe");

exports.getRecipes = async (req, res) => {
  const recipes = await selectRecipes();
  res.status(200).send({ recipes });
};
