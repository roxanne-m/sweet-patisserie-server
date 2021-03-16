'use strict';

// This file will store the recipeService object
// We will put methods on this object that store our transactions.
const recipeService = {
  getAllRecipes(knex) {
    return knex.select('*').from('new_recipe');
  },

  addRecipe(knex, newRecipe) {
    return knex('new_recipe')
      .insert(newRecipe)
      .into('new_recipe')
      .returning('*')
      .then((rows) => {
        return rows[0];
      });
  },

  getRecipeById(knex, recipe_id) {
    return knex('new_recipe')
      .select('*')
      .where('id', recipe_id)
      .first()
      .then((recipe) => {
        console.log(recipe, 'RECIPE');

        return recipe;
      })
      .then((recipe) => {
        console.log(recipe, 'RECIPE INGREDIENT ID');
        return knex('recipe_ingredients')
          .select('*')
          .where('ingredients_recipe_id', recipe.id)
          .then((ingredients) => {
            console.log(ingredients, 'INGREDIENT');
            return {
              ...recipe,
              ingredients,
            };
          });
      })
      .then((recipe) => {
        return knex('recipe_instructions')
          .select('*')
          .where('instructions_recipe_id', recipe.id)
          .then((instructions) => {
            return {
              ...recipe,
              instructions,
            };
          });
      });
  },

  deleteRecipe(knex, id) {
    return knex('new_recipe').where({ id }).delete();
  },
};

module.exports = recipeService;
