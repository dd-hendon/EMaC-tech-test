const { selectRecipes, selectRecipeById } = require("../models/recipe");

exports.getRecipes = async (req, res) => {
  const recipes = await selectRecipes(req.query);
  res.status(200).send({ recipes });
};

exports.getRecipeById = async (req, res) => {
  const id = req.params.id;
  const recipe = await selectRecipeById(id);
  res.status(200).send({ recipe });
};
