const { readFile, writeFile } = require("fs/promises");

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

exports.createRecipe = async (recipe) => {
  const file = await readFile("./data/data.json", "utf-8");
  const recipes = JSON.parse(file);
  const highestId = recipes
    .map((recipe) => Number(recipe.id.slice(7)))
    .reduce((a, b) => {
      return Math.max(a, b);
    });
  const id = `recipe-${highestId + 1}`;
  recipe.id = id;
  recipes.push(recipe);
  const stringifiedRecipes = JSON.stringify(recipes);
  await writeFile("./data/data.json", stringifiedRecipes, "utf-8");
  return id;
};
