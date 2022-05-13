const { readFile } = require("fs/promises");

exports.selectRecipes = async () => {
  const recipesString = await readFile("./data/data.json", "utf-8");
  const recipes = JSON.parse(recipesString);
  return recipes;
};
