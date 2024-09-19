import { firstStringInSecondString, introSort } from '../helpers';
import { RecipesGrid } from '../components/RecipesGrid';
import { RecipeCard } from '../components/RecipeCard';
import { FilterTag } from '../components/FilterTag';

export type Ingredient = {
  ingredient: string;
  quantity?: number;
  unit?: string;
}

export type FilterType = 'ingredient' | 'appliance' | 'ustensil';

export class Recipe {
  static filterRecipesWithActivatedFilter(recipes: Recipe[], filterType: FilterType, filter: any) {
    const filteredRecipes: Recipe[] = [];

    switch (filterType) {
      case 'ingredient':
        recipes.forEach((recipe) => {
          if (recipe.ingredients.some((ingredient) => ingredient.ingredient === filter)) {
            filteredRecipes.push(recipe);
          }
        });
        break;
      case 'appliance':
        recipes.forEach((recipe) => {
          if (recipe.appliance === filter) {
            filteredRecipes.push(recipe);
          }
        });
        break;
      case 'ustensil':
        recipes.forEach((recipe) => {
          if (recipe.ustensils.some((ustensil) => ustensil === filter)) {
            filteredRecipes.push(recipe);
          }
        });
        break;
    }

    Recipe.matchingRecipes = filteredRecipes;
  }

  static createRecipesCards(recipes: Recipe[]) {
    const recipesCards = [];
    for (const recipe of recipes) {
      recipesCards.push(RecipeCard(recipe));
    }
    return recipesCards;
  }

  constructor(
    public id: number,
    public image: string,
    public name: string,
    public servings: number,
    public ingredients: Ingredient[],
    public time: number,
    public description: string,
    public appliance: string,
    public ustensils: string[]
  ) {}

  static originalRecipes: Recipe[] = [];
  static matchingRecipes: Recipe[] = [];
  static activeFilters: any = {
    ingredients: [],
    appliances: [],
    ustensils: [],
  };

  static selectableFilters: any = {
    ingredients: [],
    appliances: [],
    ustensils: [],
  };

  static createRecipes(recipes: any[]): Recipe[] {
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
  
      const newRecipe = new Recipe(
        recipe.id,
        recipe.image.trim(),
        recipe.name.trim(),
        recipe.servings,
        ingredients,
        recipe.time,
        recipe.description.trim(),
        recipe.appliance.trim(),
        ustensils,
      );
  
      Recipe.originalRecipes.push(newRecipe);
    }

    let recipesNames = Recipe.originalRecipes.map((recipe) => recipe.name);
    recipesNames = [...new Set(introSort(recipesNames))];
    
    const sortedRecipes: Recipe[] = [];
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

  static extractFilters(recipes: Recipe[], filtersTypes: FilterType[]): any {
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

    for (const type of filtersTypes) {
      let temporaryArray = [...new Set(filters[`${type}s`])];
      let temporaryArrayCastedToArrayOfStrings: string[] = temporaryArray.map((item) => String(item));
      temporaryArray= [...introSort(temporaryArrayCastedToArrayOfStrings)];
      filters[`${type}s`] = [...new Set(temporaryArray)];
    }

    return filters;
  }

  static clone(recipe: Recipe): Recipe {
    return new Recipe(recipe.id, recipe.image, recipe.name, recipe.servings, recipe.ingredients, recipe.time, recipe.description, recipe.appliance, recipe.ustensils);
  }

  static createFiltersTags(filters: any): any {
    let filtersTags: any = {
      ingredients: [],
      appliances: [],
      ustensils: []
    }
    
    Object.keys(filters).forEach((key) => {
      filters[key] = introSort(filters[key]);
      filters[key].forEach((filter: string) => {
        const newFilterTag = FilterTag(filter, key.split('')[0] as FilterType);
        filtersTags[key].push(newFilterTag);
      })
    })

    return filtersTags;
  }

  static filterRecipeswithUserInput(recipes: Recipe[], entry: string): void {
    // let matchingRecipes: Recipe[] = [];
    
    // for (const recipe of recipes) {
    //   for (const ingredient of recipe.ingredients) {
    //     if (firstStringInSecondString(entry, ingredient.ingredient)) {
    //       matchingRecipes.push(recipe);
    //     }
    //   }

    //   if (firstStringInSecondString(entry, recipe.name)) {
    //     matchingRecipes.push(recipe);
    //   }

    //   if (firstStringInSecondString(entry, recipe.description)) {
    //     matchingRecipes.push(recipe);
    //   }
    // }
    const regexp = new RegExp(entry, "i");

    let matchingRecipes: Recipe[] = recipes.filter(recipe => {
      return regexp.test(recipe.name) ||
        recipe.ingredients.some(ingredient => regexp.test(ingredient.ingredient)) ||
        recipe.ustensils.some(ustensil => regexp.test(ustensil));
    });

    console.log('matchingRecipes', matchingRecipes)

    matchingRecipes = [...new Set(matchingRecipes)];

    console.log('matchingRecipes', matchingRecipes);

    Recipe.matchingRecipes = matchingRecipes;
  }

  static rebuildFiltersSection(recipes: Recipe[], page: HTMLElement) {
    const recipesCards = page.querySelectorAll('.recipe');

    for (const card of recipesCards) {
      card.remove();
    }

    const recipesGrid = page.querySelector('#recipes-grid');
    for (const recipe of recipes) {
      recipesGrid?.append(RecipeCard(recipe));
    }
  }

  /**
   * Handles the searchbar event by filtering the recipes, removing the filter section
   * and the recipes grid, and adding a "No match found" card if no recipe matches the search term.
   * @param event - The CustomEvent emitted by the SearchBar component, with the matching recipes and search term.
   */
  

  // static handleCancelFilterEvent() {
  //   const matchingRecipes: Recipe[] = [];
  //   /**
  //    * For each recipe in the original list of recipes, check if any of its ingredients, appliances or ustensils match any of the active filters
  //    * to determine if the recipe should be included in the list of matching recipes
  //    */
  //   for (const recipe of Recipe.originalRecipes) {
  //     const ingredients = recipe.ingredients.map((ingredient) => ingredient.ingredient);
  //     let matchingCount = 0;

  //     Recipe.activeFilters.forEach((filter: string) => {
  //       const filterTrim = filter.trim();
  //       const regexp = new RegExp(`^${filterTrim}$`);

  //       ingredients.find(ingredient => {
  //         if (regexp.exec(ingredient)) {
  //           matchingCount++;
  //         }
  //       });
        
  //       recipe.ustensils.find(ustensil => {
  //         if (regexp.exec(ustensil)) {
  //           matchingCount++;
  //         }
  //       });
        
  //       if (regexp.exec(recipe.appliance)) {
  //         matchingCount++;
  //       }
  //     });

  //     if (matchingCount === Recipe.activeFilters.length) {
  //       matchingRecipes.push(recipe);
  //     }
  //   }
  //   Recipe.matchingRecipes = matchingRecipes;

  //   const recipesSection = document.getElementById('recipes-section');
  //   let recipesGrid = document.getElementById('recipes-grid');
  //   const recipesCards = recipesGrid?.querySelectorAll('.recipe');
    
  //   if (recipesCards && recipesGrid && recipesSection) {
  //     for (const card of recipesCards) {
  //       card.remove();
  //     }
  //     recipesGrid.remove();

  //     if (matchingRecipes.length !== 0) {
  //       recipesGrid = RecipesGrid(matchingRecipes);
  //     } else {
  //       recipesGrid = RecipesGrid(Recipe.originalRecipes);
  //     }

  //     recipesSection.appendChild(recipesGrid);
  //   }
  // }

  static updateSelectableFilters() {
    const filtersTypes: FilterType[] = ['ingredient', 'appliance', 'ustensil'];
    if (Recipe.matchingRecipes.length !== 0) {
      console.log('Recipe.matchingRecipes.length', Recipe.matchingRecipes.length);
      const filters = Recipe.extractFilters(Recipe.matchingRecipes, filtersTypes);
      console.log('extracted filters', filters);
      console.log('Recipe.activeFilters', Recipe.activeFilters);

      filtersTypes.forEach((type: FilterType) => {
        if (Recipe.activeFilters[`${type}s`].length !== 0) {
          // this.selectableFilters[`${type}s`] = filters[`${type}s`].map((filter: any) => !Recipe.activeFilters[`${type}s`].includes(filter));
          this.selectableFilters[`${type}s`] = [];
          console.log(`this.selectableFilters[${type}s]`, this.selectableFilters[`${type}s`]);
          filters[`${type}s`].forEach((filter: any) => {
            console.log('filter', filter);
            if (!Recipe.activeFilters[`${type}s`].includes(filter)) {
              this.selectableFilters[`${type}s`].push(filter);
            }
            console.log(`this.selectableFilters[${type}s]`, this.selectableFilters[`${type}s`]);
          });
        } else {
          this.selectableFilters[`${type}s`] = filters[`${type}s`];
        }
      });

      console.log('this.selectableFilters', this.selectableFilters);
      

      // this.selectableFilters.forEach((type: FilterType) => {
      //   const key = `${type}s` as keyof typeof this.selectableFilters;
      //   this.selectableFilters[key] = [...introSort(this.selectableFilters[key])];
      //   console.log('this.selectableFilters[key]', this.selectableFilters[key]);
      // });
      Object.keys(this.selectableFilters).forEach((key: string) => {
        this.selectableFilters[key] = [...introSort(this.selectableFilters[key])];
        this.selectableFilters[key] = [...new Set(this.selectableFilters[key])];
      });
      console.log('this.selectableFilters', this.selectableFilters);
    } else {
      const filters = Recipe.extractFilters(Recipe.originalRecipes, filtersTypes);
      filtersTypes.forEach((type: FilterType) => {
        this.selectableFilters[`${type}s`] = filters[`${type}s`];
      });
      console.log('this.selectableFilters', this.selectableFilters);
    }
  }
}

  
