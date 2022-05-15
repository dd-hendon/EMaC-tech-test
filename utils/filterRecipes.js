exports.filterRecipes = (recipes, exclude_ingredients) => {
  let excluded = exclude_ingredients.split(",");
  return recipes.filter((recipe) => {
    return recipe.ingredients.every((ingredient) => {
      return !excluded.includes(ingredient.name);
    });
  });
};
