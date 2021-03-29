CREATE TABLE IF NOT EXISTS "create_user" (
  "user_id" SERIAL PRIMARY KEY,
  "username" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "name" TEXT NOT NULL
);

