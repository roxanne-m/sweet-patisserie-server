CREATE TABLE IF NOT EXISTS "recipe_instructions" (
    "id" SERIAL PRIMARY KEY,
    "instructions" TEXT NOT NULL,
    "instructions_recipe_id" INTEGER REFERENCES new_recipe(id) ON DELETE CASCADE NOT NULL
)