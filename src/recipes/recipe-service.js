'use strict';

// This file will store the recipeService object
// We will put methods on this object that store our transactions.
const recipeService = {
  // Get ALL recipes stored by user
  getAllRecipes(knex, user_id) {
    return knex('new_recipe').select('*').where('user_id', user_id);
  },

  // Add a recipe
  addRecipe(knex, newRecipe) {
    return knex('new_recipe')
      .insert(newRecipe)
      .into('new_recipe')
      .returning('*')
      .then((rows) => {
        return rows[0];
      });
  },
  // Add ingredients
  addIngredients(knex, newIngredients) {
    return knex('recipe_ingredients')
      .insert(newIngredients)
      .into('recipe_ingredients')
      .returning('*')
      .then((rows) => {
        return rows;
      });
  },
  // Add instructions
  addInstructions(knex, newInstructions) {
    return knex('recipe_instructions')
      .insert(newInstructions)
      .into('recipe_instructions')
      .returning('*')
      .then((rows) => {
        return rows;
      });
  },

  // gets specific recipe with ingredients and instructions
  getRecipeById(knex, new_recipe_id) {
    return knex('new_recipe')
      .select('*')
      .where('new_recipe_id', new_recipe_id)
      .first()
      .then((recipe) => {
        return recipe;
      })
      .then((recipe) => {
        return knex('recipe_ingredients')
          .select('*')
          .where('new_recipe_id', recipe.new_recipe_id)
          .then((ingredients) => {
            return {
              ...recipe,
              ingredients,
            };
          });
      })
      .then((recipe) => {
        return knex('recipe_instructions')
          .select('*')
          .where('new_recipe_id', recipe.new_recipe_id)
          .then((instructions) => {
            return {
              ...recipe,
              instructions,
            };
          });
      });
  },

  // Delete a recipe by its id
  deleteRecipe(knex, new_recipe_id) {
    return knex('new_recipe').where({ new_recipe_id }).delete();
  },
};

module.exports = recipeService;
