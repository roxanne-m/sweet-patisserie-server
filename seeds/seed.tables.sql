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
('Lemon Squares', 'This recipe makes a serving of 36 lemon squares and takes a total time of 55 minutes to complete.', 1),
('Chocolate Croissants', 'This recipe makes 8 servings.', 1);

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
( '1 cup butter', 2),
( 'Half a cup of white sugar', 2),
( '2 cups all purpose flour', 2),
( '4 eggs', 2),
( '2 lemons, juiced', 2),
('4 cups flour', 3),
('half a cup of water', 3),
('half a cup of milk', 3),
('quarter cup of sugar', 3),
('2 teaspoons of salt', 3),
('1 packet of instant dry yeast', 3),
('3 tablespoons unsalted butter, softened', 3),
('1 and a quarter cups of cold unsalted butter, cut into half inch slices', 3),
('1 egg beaten', 3),
('2 bars sweetened chocolate bar', 3);

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
( 'Preheat oven to 350 degrees F', 2),
('In a medium bowl, blend together softened butter, 2 cups flour and half a cup sugar. Press into the bottom of an ungreased 9x13 inch pan.', 2),
( 'Bake for 15 to 20 minutes in the preheated oven, or until firm and golden. In another bowl, whisk together the remaining 1 and a half cups sugar and a quarter cup flour. Whisk in the eggs and lemon juice. Pour over the baked crust.', 2),
('Bake for an additional 20 minutes in the preheated oven. The bars will firm up as they cool. After the pan has cooled, cut into uniform 2 inch squares and arrange in a checker board fashion.', 2),
('In a large bowl, mix the flour, water, milk, sugar, salt, yeast, and butter.', 3),
('Once the dough starts to clump, turn it out onto a clean counter.', 3),
('Lightly knead the dough and form it into a ball, making sure not to over-knead it.', 3),
('Cover the dough with plastic wrap and refrigerate for one hour.', 3),
('Slice the cold butter in thirds and place it onto a sheet of parchment paper..', 3),
('Place another piece of parchment on top of the butter, and beat it with a rolling pin.', 3),
('Keeping the parchment paper on the butter, use a rolling pin to roll the butter into a 7 inch square, half inch thick. If necessary, use a knife to trim the edges and place the trimmings back on top of the butter and continue to roll into a square.', 3),
('Transfer the butter layer to the refrigerator.', 3),
('To roll out the dough, lightly flour the counter. Place the dough on the counter, and push the rolling pin once vertically into the dough and once horizontally to form four quadrants.', 3),
('Roll out each corner and form a 10 inch square.', 3),
('Place the butter layer on top of the dough and fold the sides of the dough over the butter, enclosing it completely.', 3),
('Roll the dough with a rolling pin to seal the seams, making sure to lengthen the dough, rather than widening it.', 3),
('Transfer the dough to a baking sheet and cover with plastic wrap. Refrigerate for 1 hour.', 3),
('Roll out the dough on a floured surface until it’s 8 by 24 inches.', 3),
('Fold the top half down to the middle, and brush off any excess flour.', 3),
('Fold the bottom half over the top and turn the dough clockwise to the left. This completes the first turn.', 3),
('Cover and refrigerate for one hour.', 3),
('Roll out the dough again two more times, completing three turns in total and refrigerating for 1 hour in between each turn. If at anytime the dough or butter begins to soften, stop and transfer back to the fridge.', 3),
('After the final turn, cover the dough with plastic wrap and refrigerate overnight.', 3),
('To form the croissants, cut the dough in half. Place one half in the refrigerator.', 3),
('Flour the surface and roll out the dough into a long narrow strip, about 8 by 40 inches.', 3),
('With a knife, trim the edges of the dough. Cut the dough into 4 rectangles.', 3),
('Place the chocolate on the edge of the dough and roll tightly enclosing it in the dough.', 3),
('Place the croissants on a baking sheet, seam side down. Repeat with the other half of the dough.', 3),
('Brush the croissants with the beaten egg. Save the rest of the egg wash in the fridge for later.', 3),
('Place the croissants in a warm place to rise for 1 to 2 hours. Preheat oven to 400 degrees F.', 3),
('Once the croissants have proofed, brush them with one more layer of egg wash.', 3),
('Bake for 15 minutes or until golden brown and cooked through. Serve warm.', 3);

COMMIT;