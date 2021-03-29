CREATE TABLE IF NOT EXISTS "recipe_ingredients" (
    "recipe_ingredients_id" SERIAL PRIMARY KEY,
    "ingredients" TEXT NOT NULL,
    "new_recipe_id" INTEGER REFERENCES new_recipe(new_recipe_id) ON DELETE CASCADE NOT NULL
);