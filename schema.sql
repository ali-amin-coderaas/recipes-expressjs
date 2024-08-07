CREATE DATABASE recipes_manager;
USE recipes_manager;

CREATE TABLE recipes (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	ingredients TEXT NOT NULL,
	instructions TEXT NOT NULL,
	caloriesPerServing INT NOT NULL,
	servings INT NOT NULL
)

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
)


-- *mock data

INSERT INTO recipes (name, ingredients, instructions, caloriesPerServing, servings) VALUES
(
    'Spaghetti Carbonara',
    '200g spaghetti, 100g pancetta, 2 large eggs, 50g pecorino cheese, 50g parmesan, 2 cloves garlic, black pepper, salt, 1 tbsp olive oil',
    '1. Cook the spaghetti. 2. Fry the pancetta with the garlic. 3. Beat the eggs and mix with the cheeses. 4. Combine spaghetti with pancetta and remove from heat. 5. Add the egg and cheese mixture, stir quickly. 6. Serve with extra cheese and pepper.',
    550,
    2
),
(
    'Chicken Curry',
    '500g chicken breast, 1 onion, 2 cloves garlic, 1 tbsp ginger, 2 tbsp curry powder, 400ml coconut milk, 1 tbsp olive oil, salt, pepper, 1 tbsp cilantro',
    '1. Heat oil and cook onion, garlic, and ginger until soft. 2. Add curry powder and cook for 2 minutes. 3. Add chicken and cook until browned. 4. Pour in coconut milk, bring to boil, and simmer for 20 minutes. 5. Season with salt and pepper, garnish with cilantro.',
    450,
    4
),
(
    'Chocolate Chip Cookies',
    '250g butter, 200g brown sugar, 150g white sugar, 2 eggs, 1 tsp vanilla extract, 400g flour, 1 tsp baking soda, 1/2 tsp baking powder, 300g chocolate chips, 1/2 tsp salt',
    '1. Preheat oven to 180°C (350°F). 2. Cream together butter and sugars. 3. Beat in eggs one at a time, then add vanilla. 4. Combine dry ingredients and stir into the butter mixture. 5. Mix in chocolate chips. 6. Drop by spoonfuls onto baking sheet. 7. Bake for 10-12 minutes until golden brown.',
    200,
    24
);