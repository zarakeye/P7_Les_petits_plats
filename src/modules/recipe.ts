import { introSort } from '../helpers';
import { RecipeCard } from '../components/RecipeCard';

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

  static getMainSearchResults(): RecipeType[] {
    return this.mainSearchResults;
  }

  static getOriginalRecipes(): RecipeType[] {
    return this.originalRecipes;
  }

  static getMatchingRecipes(): RecipeType[] {
    return this.matchingRecipes;
  }

  static getNumberOfActiveFilters(): number {
    return this.activeFilters.ingredients.length + this.activeFilters.appliances.length + this.activeFilters.ustensils.length;
  }

  static filterRecipesWithActivatedFilter(recipes: RecipeType[], filterType: FilterType, filter: any): RecipeType[] {
    let recipesToFilter = this.matchingRecipes;
    if (this.matchingRecipes.length === 0) {
      recipesToFilter = recipes;
    }
    
    const filteredRecipes: RecipeType[] = [];

    let filtered: RecipeType[] = [];

    switch (filterType) {
      case 'ingredient':
        // recipesToFilter.forEach((recipe) => {
        //   if (recipe.ingredients.some((ingredient) => ingredient.ingredient.trim().toLowerCase() === filter.trim().toLowerCase())) {
        //     filteredRecipes.push(recipe);
        //   }
        // });
        filtered = recipesToFilter.filter((recipe) => recipe.ingredients.some((ingredient) => ingredient.ingredient.trim().toLowerCase() === filter.trim().toLowerCase()));
        console.log('filtered', filtered);
        filteredRecipes.push(...filtered);
        break;
      case 'appliance':
        // recipesToFilter.forEach((recipe) => {
        //   if (recipe.appliance.trim().toLowerCase() === filter.trim().toLowerCase()) {
        //     filteredRecipes.push(recipe);
        //   }
        // });
        filtered = recipesToFilter.filter((recipe) => recipe.appliance.trim().toLowerCase() === filter.trim().toLowerCase());
        console.log('filtered', filtered);
        filteredRecipes.push(...filtered);
        break;
      case 'ustensil':
        // recipesToFilter.forEach((recipe) => {
        //   if (recipe.ustensils.some((ustensil) => ustensil.trim().toLowerCase() === filter.trim().toLowerCase())) {
        //     filteredRecipes.push(recipe);
        //   }
        // });
        filtered = recipesToFilter.filter((recipe) => recipe.ustensils.some((ustensil) => ustensil.trim().toLowerCase() === filter.trim().toLowerCase()));
        console.log('filtered', filtered);
        filteredRecipes.push(...filtered);
        break;
    }

    this.matchingRecipes = filteredRecipes;

    return filteredRecipes;
  }

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
  
      Recipe.originalRecipes.push(newRecipe);
    }

    let recipesNames = Recipe.originalRecipes.map((recipe) => recipe.name);
    recipesNames = [...new Set(introSort(recipesNames))];
    
    const sortedRecipes: RecipeType[] = [];
    recipesNames.forEach((name) => {
      const recipe = Recipe.originalRecipes.find((recipe) => recipe.name === name);
      if (recipe) {
        sortedRecipes.push(recipe);
      }
    });

    if (sortedRecipes !== undefined) {
      Recipe.originalRecipes = sortedRecipes;
    }

    return Recipe.originalRecipes;
  }

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

    // for (const type of filtersTypes) {
    //   let temporaryArray = [...new Set(filters[`${type}s`])];
    //   let temporaryArrayCastedToArrayOfStrings: string[] = temporaryArray.map((item) => String(item));
    //   temporaryArray= [...introSort(temporaryArrayCastedToArrayOfStrings)];
    //   filters[`${type}s`] = [...new Set(temporaryArray)];
    // }

    filtersTypes.forEach((type: FilterType) => {
      filters[`${type}s`] = [...new Set(filters[`${type}s`])];
      filters[`${type}s`] = [...introSort(filters[`${type}s`])];
      filters[`${type}s`] = [...new Set(filters[`${type}s`])];
    });

    return filters;
  }

  // static clone(recipe: RecipeType): RecipeType {
  //   return new Recipe(recipe.id, recipe.image, recipe.name, recipe.servings, recipe.ingredients, recipe.time, recipe.description, recipe.appliance, recipe.ustensils);
  // }


  static filterRecipeswithUserInput(entry: string): RecipeType[] {
    let recipesBackup: RecipeType[] = this.matchingRecipes;

    if (this.matchingRecipes.length === 0 && this.activeFilters.ingredients.length === 0 && this.activeFilters.appliances.length === 0 && this.activeFilters.ustensils.length === 0) {
      recipesBackup = Recipe.originalRecipes;
    }
    
    let recipesToFilter = recipesBackup;
    if (entry.length >= 3) {
      recipesToFilter = recipesToFilter.filter(recipe => {
        return recipe.name.toLocaleLowerCase().includes(entry) ||
          recipe.ingredients.some(ingredient => ingredient.ingredient.toLocaleLowerCase().includes(entry.trim().toLowerCase())) ||
          recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(entry.trim().toLowerCase()));
      });
    }

    recipesToFilter = [...new Set(recipesToFilter)];

    this.mainSearchResults = recipesToFilter;

    return recipesToFilter;
  }

  static rebuildFiltersSection(recipes: RecipeType[]) {
    const recipesCards = document.querySelectorAll('.recipe');

    for (const card of recipesCards) {
      card.remove();
    }

    const recipesGrid = document.querySelector('#recipes-grid');
    for (const recipe of recipes) {
      recipesGrid?.append(RecipeCard(recipe));
    }
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

  static filtersOfType(type: FilterType): string[] {
    return this.selectableFilters[`${type}s`];
  }

  static addFilterToActiveOnes(filter: string, type: FilterType) {
    Recipe.activeFilters[`${type}s`].push(filter);
  }

  static removeFilterFromActiveOnes(filter: string, type: FilterType) {
    Recipe.activeFilters[`${type}s`] = Recipe.activeFilters[`${type}s`].filter((activeFilter: string) => activeFilter.trim().toLowerCase() !== filter.trim().toLowerCase());
  }

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

  static getMatchingRecipesAndFiltersOfTypeAfterFilterDeactivation(filter: string, type: FilterType): { matchingRecipes: RecipeType[], filtersOfType: string[] } {
    Recipe.removeFilterFromActiveOnes(filter, type);
    const matchingRecipes = Recipe.filterRecipesAfterFilterDeactivation();
    Recipe.updateSelectableFilters();
    const filtersOfType = Recipe.filtersOfType(type);

    return { matchingRecipes, filtersOfType };
  }
}

  
