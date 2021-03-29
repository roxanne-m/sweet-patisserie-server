CREATE TABLE IF NOT EXISTS "new_recipe" (
    "new_recipe_id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "user_id" INTEGER REFERENCES create_user(user_id)
);