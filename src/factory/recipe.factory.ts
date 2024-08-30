import { Recipe } from '../models/recipe.model';
import { capitalizeFirstLetter } from '../helpers';
import { FilterRule } from '../components/FilterList';

export const recipeFactory = {
  /**
   * Returns an array of ingredients for a given recipe.
   *
   * @param {Recipe} recipe - The recipe object.
   * @return {string[]} An array of ingredient names.
   */
  recipeIngredients: (recipe: Recipe): string[] => {
    const ingredients: string[] = []

    for (const ingredient of recipe.ingredients) {
      ingredients.push(ingredient.ingredient);
    }

    return ingredients
  },

  /**
   * Returns an array of unique ingredients from an array of recipes.
   *
   * @param {Recipe[]} recipes - An array of recipe objects.
   * @return {string[]} An array of unique ingredient names.
   */
  setOf: (recipes: Recipe[], filter: FilterRule): Set<string> => {
    const set = new Set<string>();

    switch (filter) {
      case 'ingredients':
        for (const recipe of recipes) {
          for (const ingredient of recipe.ingredients) {
            if (!set.has(capitalizeFirstLetter(ingredient.ingredient))) {
              set.add(capitalizeFirstLetter(ingredient.ingredient));
            }
          }
        }

        break;

      case 'appliance':
        for (const recipe of recipes) {
          if (!set.has(capitalizeFirstLetter(recipe.appliance)))
          set.add(capitalizeFirstLetter(recipe.appliance));
        }

        break;

      case 'ustensils':
        for (const recipe of recipes) {
          for (const ustensil of recipe.ustensils) {
            if (!set.has(capitalizeFirstLetter(ustensil))) {
              set.add(capitalizeFirstLetter(ustensil)); 
            }
          }
        }

        break;

      default:
        console.log('Filter not found')
    }

    return set;
  },
}
