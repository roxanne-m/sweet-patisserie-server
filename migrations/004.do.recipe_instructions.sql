CREATE TABLE IF NOT EXISTS "recipe_instructions" (
    "recipe_instructions_id" SERIAL PRIMARY KEY,
    "instructions" TEXT NOT NULL,
    "new_recipe_id" INTEGER REFERENCES new_recipe(new_recipe_id) ON DELETE CASCADE NOT NULL
);