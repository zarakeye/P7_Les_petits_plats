import { Recipe } from '../models/recipe.model';
import { capitalizeFirstLetter } from '../helpers';
import { FilterRule } from '../components/FilterList';

export const recipeFactory = {
  /**
   * Returns an array of unique ingredients from an array of recipes.
   *
   * @param {Recipe[]} recipes - An array of recipe objects.
   * @return {string[]} An array of unique ingredient names.
   */
  setOf: (recipes: Recipe[], filter: FilterRule): Set<string> => {
    const set = new Set<string>();

    if (recipes) {
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
    }
      

    return set;
  },

  filterRecipes: (recipes: Recipe[], filter: string): Recipe[] => {
    const matchingRecipes: Recipe[] = [];
    for (const recipe of recipes) {
      for (const ingredient of recipe.ingredients) {
        if (ingredient.ingredient.trim().valueOf() === filter.trim().valueOf()) {
          matchingRecipes.push(recipe);
        }
      }
      for (const ustensil of recipe.ustensils) {
        if (ustensil.trim().valueOf() == filter.trim().valueOf()) {
          matchingRecipes.push(recipe);
        }
      }

      if (recipe.appliance.trim().valueOf() == filter.trim().valueOf()) {
        matchingRecipes.push(recipe);
      }
    }
        
    return matchingRecipes;
  }
}
