import { Recipe } from "../models/recipe.model";
import { extractJSONData } from "../helpers";
// import { isAvailableSearchTerm } from "../helpers";

const dataUrl = 'src/data/recipes.js';

export const Api = {
  /**
   * Fetches recipes from the specified data URL.
   *
   * @return {Promise<any>} A promise that resolves to an array of recipe objects.
   * @throws {Error} If an HTTP error occurs during the fetch.
   */
  getRecipes: async (): Promise<any> => {
    try {
      const response = await fetch(dataUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const recipes = await response.text()
        .then((text) => JSON.stringify(text))
        .then((str) =>JSON.parse(str))
        .then((dataSource) => extractJSONData(dataSource))
        .then((data) => JSON.parse(data));

      return recipes;
    } catch (error) {
      console.log('An error occurred while fetching recipes : ', error);
    }
  },

  /**
   * Fetches a recipe by its title from the specified data URL.
   *
   * @param {string} title - The title of the recipe to fetch.
   * @return {Promise<Recipe | undefined>} A promise that resolves to the recipe object if found, or undefined if not found or an error occurs.
   */
  getRecipeByTitle: async (title: string) => {
    try {
      const response = await fetch(dataUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const recipe = data.find((recipe: Recipe) => recipe.name === title);
      return recipe;
    } catch (error) {
      console.log(`An error occurred while fetching recipe with title ${title}: ${error}`);
    }
  },

  getRecipesByIngredient: async (ingredient: string) => {
    try {
      const response = await fetch(dataUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const recipes = data.filter((recipe: Recipe) => {
        const recipeIngredients = recipe.ingredients.map((ingredient) => ingredient.ingredient);
        return recipeIngredients.includes(ingredient);
      });

      return recipes;
    } catch (error) {
      console.log(`An error occurred while fetching recipes containing the ingredient ${ingredient}: ${error}`);
    }
  },

  getRecipesByWord: async (word: string) => {
    try {
      const response = await fetch(dataUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const recipes = data.filter((recipe: Recipe) => {
        const recipeName = recipe.name.toLowerCase();
        return recipeName.includes(word.toLowerCase());
      });
      return recipes;
    } catch (error) {
      console.log(`An error occurred while fetching recipes containing the word ${word}: ${error}`);
    }
  }
}