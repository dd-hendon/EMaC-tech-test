const { home } = require("../controllers/home-controller");
const {
  getRecipes,
  getRecipeById,
} = require("../controllers/recipes-controller");
const apiRouter = require("express").Router();

apiRouter.get("/", home);
apiRouter.get("/recipes", getRecipes);
apiRouter.get("/recipes/:id", getRecipeById);

module.exports = apiRouter;
