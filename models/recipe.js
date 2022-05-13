const { readFile } = require("fs/promises");

exports.selectRecipes = async (queries) => {
  const { exclude_ingredients } = queries;
  const recipesString = await readFile("./data/data.json", "utf-8");
  const recipes = JSON.parse(recipesString);

  if (exclude_ingredients) {
    const excluded = exclude_ingredients.split(",");
    return recipes.filter((recipe) => {
      return recipe.ingredients.every((ingredient) => {
        return !excluded.includes(ingredient.name);
      });
    });
  }
  return recipes;
};
