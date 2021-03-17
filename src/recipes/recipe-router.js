'use strict';
const path = require('path'); //creates proper string representing path to your file.
const express = require('express');
const xss = require('xss');
const { Router } = require('express');
const { getAllRecipes, getRecipeById } = require('./recipe-service');
const recipeService = require('./recipe-service');
const { requireAuth } = require('../middleware/jwt-auth');

const recipeRouter = express.Router();
const jsonParser = express.json(); //parses incoming requests with JSON payloads and is based on body-parser

const recipeFormat = (recipe) => ({
  id: recipe.id,
  title: xss(recipe.title),
  description: xss(recipe.description),
});

const ingredientsFormat = (ingredient) => ({
  id: ingredient.id,
  ingredients: xss(ingredient.ingredients),
  ingredients_recipe_id: ingredient.ingredients_recipe_id,
});

const instructionsFormat = (instruction) => ({
  id: instruction.id,
  instructions: xss(instruction.instructions),
  instructions_recipe_id: instruction.instructions_recipe_id,
});

// GET ALL RECIPES BY USER ID (/api/recipe/user/:user_id)
recipeRouter
  .use(requireAuth)
  .route('/user/:user_id')
  .get((req, res, next) => {
    getAllRecipes(req.app.get('db'), req.params.user_id)
      .then((recipes) => {
        if (!recipes) {
          return res.json({
            error: `Seems like you do not have any recipes saved, let's create one to get started!`,
          });
        } else {
          return res.json(recipes.map(recipeFormat));
        }
      })
      .catch(next);
  });

// POST RECIPE WITH INGREDIENTS AND INSTRUCTIONS (/api/recipe/add_recipe)
recipeRouter
  .use(requireAuth)
  .route('/add_recipe')
  .post(jsonParser, (req, res, next) => {
    const { title, ingredients, instructions } = req.body;
    const recipeTitle = { title };
    const recipeIngredients = { ingredients };
    const recipeInstructions = { instructions };

    if (!recipeTitle) {
      return res.status(400).json({
        error: { message: `Missing 'title' in request body.` },
      });
    }
    recipeService.addRecipe(req.app.get('db'), recipeTitle).then((recipe) => {
      res.status(201).json(recipe.map(recipeFormat));
    });
    if (!recipeIngredients) {
      return res.status(400).json({
        error: { message: `Missing 'ingredients' in request body.` },
      });
    }
    recipeService
      .addIngredients(req.app.get('db'), recipeIngredients)
      .then((ingredient) => {
        res.status(201).json(ingredient.map(ingredientsFormat));
      });

    if (!recipeInstructions) {
      return res.status(400).json({
        error: { message: `Missing 'instructions' in request body.` },
      });
    }
    recipeService
      .addInstructions(req.app.get('db'), recipeInstructions)
      .then((instruction) => {
        res.status(201).json(instruction.map(instructionsFormat));
      })
      .catch(next);
  });

recipeRouter
  .route('/:id')
  // DELETE A RECIPE BY ITS ID (/api/recipe/:id)
  .delete((req, res, next) => {
    recipeService
      .deleteRecipe(req.app.get('db'), req.params.id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  })

  // GET SPECIFIC RECIPE BY ITS ID (/api/recipe/:id)
  .get((req, res, next) => {
    getRecipeById(req.app.get('db'), req.params.id)
      .then((recipe) => {
        res.json(recipe);
      })
      .catch(next);
  });
module.exports = recipeRouter;
