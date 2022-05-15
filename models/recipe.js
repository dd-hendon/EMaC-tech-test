const { readFile, writeFile } = require("fs/promises");
const { filterRecipes } = require("../utils/filterRecipes");
const { findMaxId } = require("../utils/findMaxId");
const { mergeIngredients } = require("../utils/mergeIngredients");

exports.selectRecipes = async (queries) => {
  const file = await readFile("./data/data.json", "utf-8");
  const recipes = mergeIngredients(JSON.parse(file));

  if (recipes === undefined) {
    throw new Error();
  }

  const { exclude_ingredients } = queries;
  return exclude_ingredients
    ? filterRecipes(recipes, exclude_ingredients)
    : recipes;
};

exports.selectRecipeById = async (id) => {
  const file = await readFile("./data/data.json", "utf-8");
  const recipes = mergeIngredients(JSON.parse(file));

  const recipe = recipes.find((recipe) => recipe.id === `recipe-${id}`);
  if (recipe === undefined) {
    throw new Error();
  }
  return recipe;
};

exports.createRecipe = async (recipe) => {
  const file = await readFile("./data/data.json", "utf-8");
  const recipes = JSON.parse(file);

  const newId = `recipe-${findMaxId(recipes) + 1}`;
  recipe.id = newId;
  recipes.push(recipe);

  const stringifiedRecipes = JSON.stringify(recipes);
  await writeFile("./data/data.json", stringifiedRecipes, "utf-8");

  return newId;
};
