const {
  selectRecipes,
  selectRecipeById,
  createRecipe,
} = require("../models/recipe");

exports.getRecipes = async (req, res) => {
  try {
    const recipes = await selectRecipes(req.query);
    res.status(200).send({ recipes });
  } catch (error) {
    res.status(500).send({ message: "Internal resource error" });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const id = req.params.id;
    const recipe = await selectRecipeById(id);
    res.status(200).send({ recipe });
  } catch (error) {
    res.status(404).send({ message: "Recipe not found" });
  }
};

exports.postRecipe = async (req, res) => {
  try {
    const id = await createRecipe(req.body);
    res.status(201).send({ id });
  } catch (error) {
    res.status(400).send({ message: "Invalid input" });
  }
};
