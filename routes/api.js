const { home } = require("../controllers/home-controller");
const {
  getRecipes,
  getRecipeById,
  postRecipe,
} = require("../controllers/recipes-controller");

const apiRouter = require("express").Router();
const express = require("express");

apiRouter.use(express.json());

apiRouter.get("/", home);
apiRouter.get("/recipes", getRecipes);
apiRouter.get("/recipes/:id", getRecipeById);
apiRouter.post("/recipes", postRecipe);

module.exports = apiRouter;
