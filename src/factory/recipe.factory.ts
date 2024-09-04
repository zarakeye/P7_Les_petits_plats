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
    // console.log('recipes', recipes);
    // console.log('filter', filter);
    // console.log('typeof filter : ', typeof filter);
    for (const recipe of recipes) {
      for (const ingredient of recipe.ingredients) {
        // console.log('ingredient.ingredient', ingredient.ingredient);
        // console.log('typeof ingredient.ingredient : ', typeof ingredient.ingredient);
        // console.log('ingredient.ingredient === filter', ingredient.ingredient === filter);
        console.log('ingredient.ingredient.valueOf() == filter', ingredient.ingredient.trim().valueOf() == filter.trim().valueOf());
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

      // console.log('ingredients', ingredients);
      // console.log('ustensils', ustensils);

      // console.log('ingredients.includes(filter) === ', ingredients.includes(filter));
      // console.log('typeof ingredients : ', typeof ingredients);
      // console.log('(recipe.appliance === filter) === ', recipe.appliance === filter);
      // console.log('typeof recipe.appliance : ', typeof recipe.appliance);
      // console.log('ustensils.includes(filter) === ', ustensils.includes(filter));
      // console.log('typeof ustensils : ', typeof ustensils);


      // if (ingredients.includes(`${filter}`) || ustensils.includes(filter) || recipe.appliance == filter) {
      //   matchingRecipes.push(recipe);
      // }
    }
    console.log('matchingRecipes', matchingRecipes);
        
    return matchingRecipes;
  }
}
