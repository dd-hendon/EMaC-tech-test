exports.findMaxId = (recipes) => {
  return recipes
    .map((recipe) => Number(recipe.id.slice(7)))
    .reduce((a, b) => {
      return Math.max(a, b);
    });
};
