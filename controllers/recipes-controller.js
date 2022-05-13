const { selectRecipes } = require("../models/recipe");

exports.getRecipes = async (req, res) => {
  const recipes = await selectRecipes(req.query);
  res.status(200).send({ recipes });
};
