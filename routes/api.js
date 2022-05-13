const { home } = require("../controllers/home-controller");
const { getRecipes } = require("../controllers/recipes-controller");
const apiRouter = require("express").Router();

apiRouter.get("/", home);
apiRouter.get("/recipes", getRecipes);

module.exports = apiRouter;
