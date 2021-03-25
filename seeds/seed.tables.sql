BEGIN;

TRUNCATE
"create_user",
"new_recipe",
"recipe_ingredients",
"recipe_instructions";

INSERT INTO "create_user" ("username", "name", "password")
VALUES 
(
    'admin',
    'Dunder Mifflin Admin',
    -- password = "pass"
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
);

INSERT INTO "new_recipe" ("title", "description", "user_id")
VALUES
('Strawberries and Cream Macaroons', 'This recipe makes 32 macaroons.', 1),
('Lemon Squares', 'This is a second description for lemon squares', 1);

INSERT INTO "recipe_ingredients" ("ingredients", "ingredients_recipe_id")
VALUES
('3/4 oz strawberries', 1),
('115 g almond flour', 1),
( '230 g powdered sugar', 1),
( '144 g egg whites', 1),
('72 g sugar', 1),
('2 g salt', 1),
( '4 tbsp unsalted butter', 1),
( '4 oz cream cheese', 1),
( 'Lemons', 2),
( 'Sugar', 2),
( 'Powdered sugar', 2);

INSERT INTO "recipe_instructions" ("instructions", "instructions_recipe_id")
VALUES
( 'Preheat oven to 280 degrees F and fit a large disposable pastry
bag with a round tip. Line two baking sheets with
parchment paper. On a third sheet of parchment paper,
trace out 24 1.5-inch circles (use a round cookie cutter
or stencil as a guide), spaced 1 inch apart. Set aside as
a master guide.', 1),
( 'Process strawberries and almond flour in a food processor
until finely ground. Use a fine mesh sieve or sifter to
sift strawberry-almond flour mixture and powdered sugar
together twice; use a firm spatula to push any large
particles through. Set aside.', 1),
( 'Combine egg whites, sugar, and salt in a large mixer bowl
fitted with wire whip attachment. Whip for 3 minutes on
medium speed (4 on a KitchenAid), until egg whites begin
to foam. Increase speed to medium-high (7 on a KitchenAid)
and whip for 3 minutes, until meringue forms soft peaks.
Increase speed to 8 and whip for another 3 minutes. Turn
off mixer and add gel food coloring; whip another 1 to 2
minutes on high speed to evenly distribute color until
meringue is stiff and dry. The meringue should clump in
the center of the wire whip attachment; knock against
mixer bowl to release.', 1),
( 'Add dry ingredients to meringue all at once. Use a rubber
spatula to fold dry mixture into meringue, smearing the
mixture against the side of the bowl to knock the air out
(you want to deflate the whites, so do not worry about
folding them gently). After 25 folds, your mixture may
still look lumpy. Continue to fold about 10 to 12 more
times, checking texture after each fold. The batter is
ready when it holds its shape when spooned onto itself and
slowly flattens out after 15 to 20 seconds. If the batter
is stiff and does not flatten out, it is undermixed. If the
batter is runny and fluid, it is overmixed and will not hold a
shape.', 1),
( 'Transfer half the batter to pastry bag. Slide master guide
of circles between baking sheet and parchment paper. Hold
piping bag vertically and pipe batter to within 1/8 inch from
the edge of the circle. Carefully remove master guide from
underneath piped circles and transfer to second baking
sheet, repeating with remaining batter. Remove guide and
save for future use. Tap pans sharply on counter; rotate
90 degrees and tap two more times (to deflate air bubbles
and prevent cracked shells).', 1),
('Bake for 22 to 25 minutes, until you can cleanly peel the
parchment paper away from the macaron. Place pans on wire
racks and cool completely before removing shells. For the
cream cheese frosting, beat butter, cream cheese and salt
in a large mixer bowl on medium speed until light and
fluffy. Reduce speed to low; gradually add powdered sugar
1/3 cup at a time and beat just until smooth.', 1),
( 'When ready to assemble, fit a large disposable pastry bag
with a round tip and fill with frosting. Pipe about a
tablespoon of frosting onto the bottom of half the shells,
then sandwich with remaining shells. Store in an airtight
container in the refrigerator up to three days. Bring to
room temperature before serving.', 1),
( 'Instruction one for lemon squares', 2),
('Instruction two for lemon square bars', 2),
( 'Instruction three for lemon square bars', 2);

COMMIT;