CREATE TABLE IF NOT EXISTS "recipe_ingredients" (
    "id" SERIAL PRIMARY KEY,
    "ingredients" TEXT NOT NULL,
    "ingredients_recipe_id" INTEGER REFERENCES new_recipe(id) ON DELETE CASCADE NOT NULL
);