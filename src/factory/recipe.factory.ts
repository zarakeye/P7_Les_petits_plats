import { FilterRule } from '../components/FilterList'
import { capitalizeFirstLetter, deleteNoneFirstOccurrence } from '../helpers'
import { Recipe } from '../models/recipe.model'

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
      ingredients.push(ingredient.ingredient)
    }

    return ingredients
  },

  /**
   * Returns an array of unique ingredients from an array of recipes.
   *
   * @param {Recipe[]} recipes - An array of recipe objects.
   * @return {string[]} An array of unique ingredient names.
   */
  setOf: (recipes: Recipe[], filter: FilterRule) => {
    let set: string[] = []

    switch (filter) {
      case 'ingredients':
        let ingredients: string[] = []
        for (const recipe of recipes) {
          for (const ingredient of recipe.ingredients) {
            ingredients.push(capitalizeFirstLetter(ingredient.ingredient))
          }
        }

        set = deleteNoneFirstOccurrence(ingredients)
        return set

      case 'appliance':
        let appliances: string[] = []
        for (const recipe of recipes) {
          appliances.push(capitalizeFirstLetter(recipe.appliance))
        }

        set = deleteNoneFirstOccurrence(appliances)
        return set
      case 'ustensils':
        let ustensils: string[] = []
        for (const recipe of recipes) {
          for (const ustensil of recipe.ustensils) {
            ustensils.push(ustensil)
          }
        }

        let capitalized: string[] = []
        for (let ustensil of ustensils) {
          capitalized.push(capitalizeFirstLetter(ustensil))
        }

        set = deleteNoneFirstOccurrence(capitalized)
        return set
      default:
        console.log('Filter not found')
    }
  },
}
