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
  new_recipe_id: recipe.new_recipe_id,
  title: xss(recipe.title),
  description: xss(recipe.description),
});

const ingredientsFormat = (ingredient) => ({
  recipe_ingredients_id: ingredient.recipe_ingredients_id,
  ingredients: xss(ingredient.ingredients),
  new_recipe_id: ingredient.new_recipe_id,
});

const instructionsFormat = (instruction) => ({
  recipe_instructions_id: instruction.recipe_instructions_id,
  instructions: xss(instruction.instructions),
  new_recipe_id: instruction.new_recipe_id,
});

// GET ALL RECIPES BY USER ID (/api/recipes/)
recipeRouter
  .use(requireAuth)
  .route('/')
  .get((req, res, next) => {
    getAllRecipes(req.app.get('db'), req.user.user_id)
      .then((recipes) => {
        if (!recipes) {
          return res.json({
            error: `Missing 'title' in request body.`,
          });
        } else {
          return res.json(recipes.map(recipeFormat));
        }
      })
      .catch(next);
  });

// POST RECIPE WITH INGREDIENTS AND INSTRUCTIONS (/api/recipes/add)
recipeRouter
  .use(requireAuth)
  .route('/add')
  .post(jsonParser, (req, res, next) => {
    const { recipe, ingredients, instructions } = req.body;

    if (!recipe.title) {
      return res.status(400).json({
        error: { message: `Missing 'title' in request body.` },
      });
    }
    if (!ingredients) {
      return res.status(400).json({
        error: { message: `Missing 'ingredients' in request body.` },
      });
    }
    if (!instructions) {
      return res.status(400).json({
        error: { message: `Missing 'instructions' in request body.` },
      });
    }
    recipe.user_id = req.user.user_id;

    recipeService.addRecipe(req.app.get('db'), recipe).then((recipe) => {
      const recipeIngredients = ingredients.map((ingredient) => {
        return {
          ingredients: ingredient,
          new_recipe_id: recipe.new_recipe_id,
        };
      });

      recipeService
        .addIngredients(req.app.get('db'), recipeIngredients)
        .then((ingredients) => {
          const recipeInstructions = instructions.map((instruction) => {
            return {
              instructions: instruction,
              new_recipe_id: recipe.new_recipe_id,
            };
          });
          recipeService
            .addInstructions(req.app.get('db'), recipeInstructions)

            .then((instructions) => {
              res.status(201).json({
                recipe: recipe,
                ingredients: ingredients.map(ingredientsFormat),
                instructions: instructions.map(instructionsFormat),
              });
            })
            .catch(next);
        })
        .catch(next);
    });
  });

recipeRouter
  .route('/:id')
  // DELETE A RECIPE BY ITS ID (/api/recipes/:id)
  .delete((req, res, next) => {
    recipeService
      .deleteRecipe(req.app.get('db'), req.params.id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  })

  // GET SPECIFIC RECIPE BY ITS ID (/api/recipes/:id)
  .get((req, res, next) => {
    getRecipeById(req.app.get('db'), req.params.id)
      .then((recipe) => {
        res.json(recipe);
      })
      .catch(next);
  });
module.exports = recipeRouter;
