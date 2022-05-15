exports.mergeIngredients = (recipes) => {
  return recipes.map((recipe) => {
    const merged = {};
    const ingredientNames = [];

    for (ingredient of recipe.ingredients) {
      if (ingredientNames.includes(ingredient.name)) {
        merged[ingredient.name] = merged[ingredient.name] + ingredient.grams;
      } else {
        merged[ingredient.name] = ingredient.grams;
      }
      ingredientNames.push(ingredient.name);
    }

    const ingredients = [];
    for (ingredient in merged) {
      mergedIngredient = { [ingredient]: merged[ingredient] };
      ingredients.push(mergedIngredient);
    }

    mergedRecipe = { ...recipe };
    mergedRecipe.ingredients = ingredients;

    return mergedRecipe;
  });
};
