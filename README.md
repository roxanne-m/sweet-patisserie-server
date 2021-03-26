# Sweet Patisserie

## Description

Spaced Repetition is an app that allows users to save their beloved sweet recipes and have the ability to revist them in order to recreate the magic. Users may register, have their personalized dashboard of their previous saved recipes, delete old recipes, and upload new ones!

## Link to Live App & Repos

- Live App:
  - https://sweet-patisserie-client-jzdm0fedy-roxanne-m.vercel.app/
- Server Repo:
  - https://github.com/roxanne-m/sweet-patisserie-server.git
- Client Repo:
  - https://github.com/roxanne-m/sweet-patisserie-client.git

## Application Features

- A landing page explains the purpose of Sweet Patisserie to new and returning users.

![landing](https://user-images.githubusercontent.com/70825798/112699857-f8089180-8e49-11eb-937f-a6da156c1c38.JPG)

- As a returning user, the user may login using their username and password.
- User can register using their name, a username, and a password. The password must be 8 characters long, must contain one upper case, lower case, number, and special character.

![register](https://user-images.githubusercontent.com/70825798/112699763-c68fc600-8e49-11eb-9bff-3998dfaff9e8.JPG)

- Once logged in, the user will view their dashboard that contains their previously save recipes with their title, description, and a delete button.

![dashboard](https://user-images.githubusercontent.com/70825798/112699905-1e2e3180-8e4a-11eb-8f70-e8a2fe812f56.JPG)

- When the user clicks ona specific recipe on their dashboard, they will be taken to the recipes page where the entirety of its information is displayed (Ex: title, description, ingredients, instructions)

![specificRecipe](https://user-images.githubusercontent.com/70825798/112699996-5d5c8280-8e4a-11eb-8026-c5e53882b330.JPG)

- If the user wishes to create a new recipe, they may click on the "Add Recipe" button where they will be redirected to a page where they will add the title, optional description, list of ingredients, and list of instructions.

![addrecipe](https://user-images.githubusercontent.com/70825798/112700113-a7ddff00-8e4a-11eb-9c91-317bca600717.JPG)

## Tech Stacks Used

- Front-end technologies
  - Javascript frameworks
  - CSS grid
  - React
  - Deployed via Vercel
- Back-end technologies
  - Node.js
  - RESTful Api
  - Deployed via Heroku
- Data Persistence
  - PostgreSQL

## Documentation of API

### Sweet Patisserie Endpoints

#### Dashboard Recipes Endpoint

`GET /api/recipes` <br/>
Provides full list of recipe titles and their descriptions saved. <br/>

#### Full Recipes Endpoint

`GET /api/recipes/:recipeId` <br/>
Provides a specific recipe by its id in its entirety such as the title, description, ingredients, and instructions. <br/>

`POST /api/recipes/add` <br/>
Creates new product that requires a title, ingredients, and instructions. The description is optional. <br/>
| Key | Value |
| ------------- | ------------- |
| title | Text, required |
| description | Text, optional |
| ingredients | Text, required |
| instructions | Text, required |

`DELETE /api/products/:product_id` <br/>
Deletes a specific recipe by its id. <br/>

## Setup

To setup the application

1. Fork and clone the project to your machine
2. `npm install`. This will also install the application _Cypress.io_ for running browser integration tests

The project expects you have the Spaced repetition API project setup and running on http://localhost:8000.

Find instructions to setup the API here https://github.com/Thinkful-Ed/spaced-repetition-api.

## Running project

This is a `create-react-app` project so `npm start` will start the project in development mode with hot reloading by default.
