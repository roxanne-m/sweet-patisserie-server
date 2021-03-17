'use strict';
const path = require('path'); //creates proper string representing path to your file.
const express = require('express');
const xss = require('xss');
const { Router } = require('express');
const { getAllRecipes, getRecipeById } = require('./recipe-service');
const recipeService = require('./recipe-service');

const recipeRouter = express.Router();
const jsonParser = express.json(); //parses incoming requests with JSON payloads and is based on body-parser

const recipeFormat = (recipe) => ({
  id: recipe.id,
  title: xss(recipe.title),
  description: xss(recipe.description),
});

const ingredientsFormat = (ingredient) => ({
  id: ingredient.id,
  ingredients: ingredient.ingredients,
  ingredients_recipe_id: ingredient.ingredients_recipe_id,
});

const instructionsFormat = (instruction) => ({
  id: instruction.id,
  instructions: instruction.instructions,
  instructions_recipe_id: instruction.instructions_recipe_id,
});

// GET ALL RECIPES BY USER

recipeRouter.route('/user/:user_id').get((req, res, next) => {
  getAllRecipes(req.app.get('db'), req.params.user_id).then((recipes) => {
    res.json(recipes);
  });
});

// post recipe
recipeRouter.route('/').post(jsonParser, (req, res, next) => {});

recipeRouter
  .route('/:id')
  // delete recipe by id
  .delete((req, res, next) => {
    recipeService
      .deleteRecipe(req.app.get('db'), req.params.id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  })

  // get recipe by id
  .get((req, res, next) => {
    getRecipeById(req.app.get('db'), req.params.id)
      .then((recipe) => {
        res.json(recipe);
      })
      .catch(next);
  });
module.exports = recipeRouter;
