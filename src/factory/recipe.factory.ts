import { Recipe } from '../models/recipe.model';
import { capitalizeFirstLetter, deleteNoneFirstOccurrence } from '../helpers';

export const recipeFactory = {

  /**
   * Returns an array of ingredients for a given recipe.
   *
   * @param {Recipe} recipe - The recipe object.
   * @return {string[]} An array of ingredient names.
   */
  recipeIngredients: (recipe: Recipe): string[] => {
    const ingredients: string[] = [];

    for (const ingredient of recipe.Ingredients) {
      ingredients.push(ingredient.ingredient);
    }

    return ingredients;
  },
  
  /**
   * Returns an array of unique ingredients from an array of recipes.
   *
   * @param {Recipe[]} recipes - An array of recipe objects.
   * @return {string[]} An array of unique ingredient names.
   */
  setOf: (recipes: Recipe[], filter: string) => {
    let set: string[] = [];

    switch (filter) {
      case 'ingredients':
        let ingredients: string[] = [];
        for (const recipe of recipes) {
          for (const ingredient of recipe.Ingredients) {
            ingredients.push(ingredient.ingredient);
          }
        }

        for (let ingredient of ingredients) {
          ingredient = capitalizeFirstLetter(ingredient);
        }

        set = deleteNoneFirstOccurrence(ingredients);
        return set;

      case 'appliance':
        let appliances: string[] = [];
        for (const recipe of recipes) {
          appliances.push(recipe.Appliance);
        }

        for (let appliance of appliances) {
          appliance = capitalizeFirstLetter(appliance);
        }

        set = deleteNoneFirstOccurrence(appliances);
        return set;
      case 'ustensils':
        let ustensils: string[] = [];
        for (const recipe of recipes) {
          for (const ustensil of recipe.Ustensils) {
            ustensils.push(ustensil);
          }
        }

        let capitalized: string[] = [];
        for (let ustensil of ustensils) {
          capitalized.push(capitalizeFirstLetter(ustensil));
        }

        set = deleteNoneFirstOccurrence(capitalized);
        return set;
      default:
        console.log('Filter not found');
    }
  },
}