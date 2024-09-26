import { firstStringInSecondString, introSort } from '../helpers';

export type Ingredient = {
  ingredient: string;
  quantity?: number;
  unit?: string;
}

export type RecipeType = {
  id: number;
  image: string;
  name: string;
  servings: number;
  ingredients: Ingredient[];
  time: number;
  description: string;
  appliance: string;
  ustensils: string[];
}

export type FilterType = 'ingredient' | 'appliance' | 'ustensil';

export class Recipe {
  constructor() {}

  private static originalRecipes: RecipeType[] = [];
  private static matchingRecipes: RecipeType[] = [];
  private static mainSearchResults: RecipeType[] = [];
  private static activeFilters: any = {
    ingredients: [],
    appliances: [],
    ustensils: [],
  };

  private static selectableFilters: any = {
    ingredients: [],
    appliances: [],
    ustensils: [],
  };

  /**
   * Takes an array of recipes and creates an array of RecipeType objects.
   * It parses the ingredients and ustensils of each recipe, trims the strings
   * and converts the quantity of ingredients from string to number if given.
   * It also sorts the recipes by their name.
   * The resulting array of RecipeType objects is stored in the Recipe.originalRecipes
   * property and is returned by the function.
   * @param recipes The array of recipes to be parsed.
   * @returns The parsed array of RecipeType objects.
   */
  static createRecipes(recipes: any[]): RecipeType[] {
    for (const recipe of recipes) {
      const ingredients: Ingredient[] = [];
      const ustensils: string[] = [];
      // Parse ingredients and ustensils
      for (const ingredient of recipe.ingredients) {
        let quantity;
  
        switch (typeof ingredient.quantity) {
          case 'number':
            quantity = ingredient.quantity;
            break;
          case 'string':
            quantity = Number(ingredient.quantity.trim()); // Convert string to number when given in string
            break;
          default:
            quantity = undefined;
        }
        
        ingredients.push({
          ingredient: ingredient.ingredient.trim(),
          quantity,
          unit: ingredient.unit
        });
      }
  
      for (const ustensil of recipe.ustensils) {
        ustensils.push(ustensil.trim());
      }
  
      const newRecipe: RecipeType = {
        id: recipe.id,
        image: recipe.image.trim(),
        name: recipe.name.trim(),
        servings: recipe.servings,
        ingredients: ingredients,
        time: recipe.time,
        description: recipe.description.trim(),
        appliance: recipe.appliance.trim(),
        ustensils: ustensils,
      };
  
      this.originalRecipes.push(newRecipe);
    }

    let recipesNames = Recipe.originalRecipes.map((recipe) => recipe.name);
    recipesNames = [...new Set(introSort(recipesNames))];
    
    const sortedRecipes: RecipeType[] = [];
    recipesNames.forEach((name) => {
      const recipe = this.originalRecipes.find((recipe) => recipe.name === name);
      if (recipe) {
        sortedRecipes.push(recipe);
      }
    });

    if (sortedRecipes !== undefined) {
      this.originalRecipes = sortedRecipes;
    }

    return this.originalRecipes;
  }

  /**
   * Gets the main search results array.
   * This array is updated each time the user enters a new search query in the search bar.
   * It contains all the recipes that match the user's search query.
   * @returns {RecipeType[]} the main search results array
   */
  static getMainSearchResults(): RecipeType[] {
    return this.mainSearchResults;
  }

  /**
   * Gets the original recipes array.
   * This array is set once, when the recipes data is loaded.
   * It contains all the recipes, without any filtering.
   * @returns {RecipeType[]} the original recipes array
   */
  static getOriginalRecipes(): RecipeType[] {
    return this.originalRecipes;
  }

  /**
   * Gets the matching recipes after a filter has been activated or deactivated.
   * It returns the recipes that match the active filters.
   * @returns {RecipeType[]} the matching recipes
   */
  static getMatchingRecipes(): RecipeType[] {
    return this.matchingRecipes;
  }

  /**
   * Gets the number of active filters.
   * It returns the sum of the length of the active filters arrays of each type.
   * @returns {number} the number of active filters
   */
  static getNumberOfActiveFilters(): number {
    return this.activeFilters.ingredients.length + this.activeFilters.appliances.length + this.activeFilters.ustensils.length;
  }

  /**
   * Filters the recipes based on the user's input in the search bar.
   * It returns an array of recipes that match the user's input.
   * If the user's input is empty or less than 3 characters, it returns the same array of recipes as the input.
   * If the user's input is 3 characters or more, it filters the recipes based on the user's input.
   * It checks if the name of the recipe contains the user's input (case insensitive).
   * It also checks if any of the ingredients or ustensils of the recipe contain the user's input (case insensitive).
   * If the user's input matches any of the above, the recipe is added to the resulting array.
   * The resulting array is then deduplicated and returned.
   * @param {string} entry - the user's input in the search bar
   * @returns {RecipeType[]} an array of recipes that match the user's input
   */
  static filterRecipesWithUserInput(entry: string): RecipeType[] {
    let recipesBackup: RecipeType[] = this.matchingRecipes;

    if (Recipe.getNumberOfActiveFilters() === 0) {
      recipesBackup = this.originalRecipes;
    }
    
    let recipesToFilter = recipesBackup;

    let mainSearchResults: RecipeType[] = [];
    
    if (entry.length >= 3) {
      for (const recipe of recipesToFilter) {
        if (firstStringInSecondString(entry, recipe.name)) {
          mainSearchResults.push(recipe);
        }

        for (const ingredient of recipe.ingredients) {
          if (firstStringInSecondString(entry, ingredient.ingredient)) {
            mainSearchResults.push(recipe);
            break;
          }
        }

        for (const ustensil of recipe.ustensils) {
          if (firstStringInSecondString(entry, ustensil)) {
            mainSearchResults.push(recipe);
            break;
          }
        }
      }

      mainSearchResults = [...new Set(mainSearchResults)];
    } else {
      mainSearchResults = recipesBackup;
    }

    this.mainSearchResults = mainSearchResults;

    return mainSearchResults;
  }

  /**
   * Filters the recipes with the activated filter.
   * It returns an array of recipes that match the activated filter.
   * The matching recipes are the ones that have the activated filter in their ingredients, appliance, or ustensils.
   * If the matchingRecipes array is empty, it filters the recipes parameter.
   * @param {RecipeType[]} recipes - the recipes to filter
   * @param {FilterType} filterType - the type of the filter (e.g. "ingredient", "appliance", "ustensil")
   * @param {any} filter - the value of the activated filter
   * @returns {RecipeType[]} an array of recipes that match the activated filter
   */
  static filterRecipesWithActivatedFilter(recipes: RecipeType[], filterType: FilterType, filter: any): RecipeType[] {
    let recipesToFilter = this.matchingRecipes;
    if (this.matchingRecipes.length === 0) {
      recipesToFilter = recipes;
    }
    
    const filteredRecipes: RecipeType[] = [];

    let filtered: RecipeType[] = [];

    switch (filterType) {
      case 'ingredient':
        filtered = recipesToFilter.filter((recipe) => recipe.ingredients.some((ingredient) => ingredient.ingredient.trim().toLowerCase() === filter.trim().toLowerCase()));
        console.log('filtered', filtered);
        filteredRecipes.push(...filtered);
        break;
      case 'appliance':
        filtered = recipesToFilter.filter((recipe) => recipe.appliance.trim().toLowerCase() === filter.trim().toLowerCase());
        console.log('filtered', filtered);
        filteredRecipes.push(...filtered);
        break;
      case 'ustensil':
        filtered = recipesToFilter.filter((recipe) => recipe.ustensils.some((ustensil) => ustensil.trim().toLowerCase() === filter.trim().toLowerCase()));
        console.log('filtered', filtered);
        filteredRecipes.push(...filtered);
        break;
    }

    this.matchingRecipes = filteredRecipes;

    return filteredRecipes;
  }

  /**
   * Updates the matching recipes after a filter has been deactivated.
   * It re-filters the recipes based on the active filters.
   * If there are no active filters, it sets the matching recipes to the original recipes.
   * If the main search results are not empty, it sets the matching recipes to the main search results.
   * @returns the updated matching recipes
   */
  static filterRecipesAfterFilterDeactivation(): RecipeType[] {
    this.matchingRecipes = this.originalRecipes;
    
    if (this.mainSearchResults.length !== 0) {
      this.matchingRecipes = this.mainSearchResults;
    }

    const filtersTypes: FilterType[] = ['ingredient', 'appliance', 'ustensil'];
    filtersTypes.forEach((type: FilterType) => {
      if (this.activeFilters[`${type}s`].length !== 0) {
        this.activeFilters[`${type}s`].forEach((filter: string) => {
          this.matchingRecipes = this.filterRecipesWithActivatedFilter(this.matchingRecipes, type, filter);
        })
      }
    });

    return this.matchingRecipes;
  }

  /**
   * Extracts all filters from a given array of recipes.
   * @param {RecipeType[]} recipes - the recipes to extract filters from
   * @param {FilterType[]} filtersTypes - the types of filters to extract
   * @returns {any} an object containing arrays of filters, each array sorted in ascending order and deduplicated
   */
  static extractFilters(recipes: RecipeType[], filtersTypes: FilterType[]): any {
    let filters: any = {
      ingredients: [],
      appliances: [],
      ustensils: []
    }

    for (const recipe of recipes) {
      for (const ingredient of recipe.ingredients) {
        filters.ingredients.push(ingredient.ingredient);
      }

      filters.appliances.push(recipe.appliance);

      for (const ustensil of recipe.ustensils) {
        filters.ustensils.push(ustensil);
      }
    }

    filtersTypes.forEach((type: FilterType) => {
      filters[`${type}s`] = [...new Set(filters[`${type}s`])];
      filters[`${type}s`] = [...introSort(filters[`${type}s`])];
      filters[`${type}s`] = [...new Set(filters[`${type}s`])];
    });

    return filters;
  }

  static updateSelectableFilters(): any {
    const filtersTypes: FilterType[] = ['ingredient', 'appliance', 'ustensil'];

    let recipesBase: RecipeType[] = this.matchingRecipes;
    

    if (this.activeFilters.ingredients.length === 0 &&
      this.activeFilters.appliances.length === 0 &&
      this.activeFilters.ustensils.length === 0) {
        if (this.mainSearchResults.length !== 0) {
          recipesBase = this.mainSearchResults;
        } else if (this.mainSearchResults.length === 0) {
          recipesBase = this.originalRecipes;
        }
    }

    let recipesToFilter = recipesBase;
    let filters = this.extractFilters(recipesToFilter, filtersTypes);

    filtersTypes.forEach((type: FilterType) => {
      if (this.activeFilters[`${type}s`].length !== 0) {
        this.selectableFilters[`${type}s`] = filters[`${type}s`].filter((filter: any) => !this.activeFilters[`${type}s`].includes(filter));
        this.selectableFilters[`${type}s`] = [...introSort(this.selectableFilters[`${type}s`])];
        this.selectableFilters[`${type}s`] = [...new Set(this.selectableFilters[`${type}s`])];
      } else {
        this.selectableFilters[`${type}s`] = filters[`${type}s`];
      }
    });

    return this.selectableFilters;
  }

  /**
   * Returns the array of selectable filters of the given type.
   * @param {FilterType} type - the type of the filters (e.g. "ingredient", "appliance", "ustensil")
   * @returns {string[]} the array of strings representing the filters of the given type
   */
  static filtersOfType(type: FilterType): string[] {
    return this.selectableFilters[`${type}s`];
  }

  /**
   * Adds a filter to the active filters of the given type.
   * @param {string} filter - the name of the filter to add
   * @param {FilterType} type - the type of the filters
   */
  static addFilterToActiveOnes(filter: string, type: FilterType) {
    this.activeFilters[`${type}s`].push(filter);
  }

  /**
   * Removes a filter from the active filters of the given type.
   * @param {string} filter - the name of the filter to remove
   * @param {FilterType} type - the type of the filters
   */
  static removeFilterFromActiveOnes(filter: string, type: FilterType) {
    this.activeFilters[`${type}s`] = this.activeFilters[`${type}s`].filter((activeFilter: string) => activeFilter.trim().toLowerCase() !== filter.trim().toLowerCase());
  }

  /**
   * Gets the matching recipes and filters of the given type after a filter has been activated.
   * It adds the filter to the active filters of the given type,
   * filters the recipes with the activated filter, and
   * updates the selectable filters.
   * @param {string} filter - the name of the activated filter
   * @param {FilterType} type - the type of the filters (e.g. "ingredient", "appliance", "ustensil")
   * @returns {{ matchingRecipes: RecipeType[], filtersOfType: string[] }} an object containing the matching recipes and the filters of the given type
   */
  static getMatchingRecipesAndFiltersOfTypeAfterFilterActivation(filter: string, type: FilterType): { matchingRecipes: RecipeType[], filtersOfType: string[] } {
    Recipe.addFilterToActiveOnes(filter, type);
    let recipesTofilter: RecipeType[] = [];
    if (Recipe.getMainSearchResults().length !== 0) {
      recipesTofilter = Recipe.getMainSearchResults();
    } else {
      recipesTofilter = Recipe.getOriginalRecipes();
    }
    const matchingRecipes = Recipe.filterRecipesWithActivatedFilter(recipesTofilter, type, filter);
    Recipe.updateSelectableFilters();
    
    const filtersOfType = Recipe.filtersOfType(type);

    return { matchingRecipes, filtersOfType };
  }

  /**
   * Gets the matching recipes and filters of the given type after a filter has been deactivated.
   * It removes the filter from the active filters of the given type,
   * filters the recipes with the active filters, and
   * updates the selectable filters.
   * @param {string} filter - the name of the deactivated filter
   * @param {FilterType} type - the type of the filters (e.g. "ingredient", "appliance", "ustensil")
   * @returns {{ matchingRecipes: RecipeType[], filtersOfType: string[] }} an object containing the matching recipes and the filters of the given type
   */
  static getMatchingRecipesAndFiltersOfTypeAfterFilterDeactivation(filter: string, type: FilterType): { matchingRecipes: RecipeType[], filtersOfType: string[] } {
    Recipe.removeFilterFromActiveOnes(filter, type);
    const matchingRecipes = Recipe.filterRecipesAfterFilterDeactivation();
    Recipe.updateSelectableFilters();
    const filtersOfType = Recipe.filtersOfType(type);

    return { matchingRecipes, filtersOfType };
  }
}

  
