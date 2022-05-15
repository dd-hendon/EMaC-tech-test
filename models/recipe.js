const { readFile } = require("fs/promises");

exports.selectRecipes = async (queries) => {
  const { exclude_ingredients } = queries;
  const file = await readFile("./data/data.json", "utf-8");
  const recipes = JSON.parse(file);

  if (exclude_ingredients) {
    const excluded = exclude_ingredients.split(",");
    return recipes.filter((recipe) => {
      return recipe.ingredients.every((ingredient) => {
        return !excluded.includes(ingredient.name);
      });
    });
  }
  if (recipes === undefined) {
    throw new Error();
  }
  return recipes;
};

exports.selectRecipeById = async (id) => {
  const file = await readFile("./data/data.json", "utf-8");
  const recipes = JSON.parse(file);
  const recipe = recipes.find((recipe) => recipe.id === `recipe-${id}`);
  if (recipe === undefined) {
    throw new Error();
  }
  return recipe;
};
