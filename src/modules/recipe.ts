import { capitalizeFirstLetter } from '../helpers';
import { NoMatchFound } from '../components/NoMatchFound';
import { RecipesGrid } from '../components/RecipesGrid';
import { RecipeCard } from '../components/RecipeCard';

export type Ingredient = {
  ingredient: string;
  quantity?: number;
  unit?: string;
}



export class Recipe {
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

  static originalListOfRecipes: Recipe[] = [];
  static mainSearchMatchingRecipes: Recipe[] = [];

  public clone(): Recipe {
    return new Recipe(this.id, this.image, this.name, this.servings, this.ingredients, this.time, this.description, this.appliance, this.ustensils);
  }

  static matchingRecipes: Recipe[] = [];


  static filterRecipes(recipes: Recipe[], filter: string, page: HTMLElement): void {
    let matchingRecipes: Recipe[] = [];
    for (const recipe of recipes) {
      for (const ingredient of recipe.ingredients) {
        if (ingredient.ingredient === filter) {
          matchingRecipes.push(recipe);
          break;
        }
      }

      if (recipe.appliance === filter) {
        matchingRecipes.push(recipe);
        break;
      }

      for (const ustensil of recipe.ustensils) {
        if (ustensil === filter) {
          matchingRecipes.push(recipe);
          break;
        }
      }
    }

    // console.log('Recipe.matchingRecipes', Recipe.matchingRecipes);
    matchingRecipes = [...new Set(matchingRecipes)];

    Recipe.rebuildFiltersSection(matchingRecipes, page);
    Recipe.matchingRecipes = matchingRecipes;

    
    
    //! A montrer à Aghilès !!!!!!!!!!!!!!!!!
    // const recipesCards = page.querySelectorAll('.recipe');
    // for (const recipe of matchingRecipes) {
    //   const recipeID: string = `recipe-${recipe.id}`;
    //   for (const card of recipesCards) {
    //     if (card.id.trim() != recipeID.trim()) {
    //       card.classList.add('hidden');
    //       // card.classList.remove('flex');
    //     }
    //   }
    // }
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


  //   console.log(`filtering ${filter} with ${recipes.length} recipes`);
  //   const filterValue = filter.trim().valueOf();
  //   const regexp = new RegExp(`^${filterValue}`);
  //   console.log('regexp', regexp);
    
  //   if (recipes === Recipe.originalListOfRecipes) {
  //     if (Recipe.matchingRecipes.length === 0) {
  //       recipes.forEach((recipe) => {
  //         const ingredients = recipe.ingredients.map((ingredient) => ingredient.ingredient);

  //         if ((ingredients.find((ingredient) => regexp.test(ingredient)) || regexp.test(recipe.appliance)) || recipe.ustensils.find((ustensil) => regexp.test(ustensil)) && !Recipe.matchingRecipes.includes(recipe)) {
  //           Recipe.matchingRecipes.push(recipe);
  //         }
  //       })
  //     }
  //   } else {
  //     Recipe.matchingRecipes = recipes.filter((recipe) => recipe.ingredients.some((ingredient) => regexp.test(ingredient.ingredient)) ||
  //       recipe.ustensils.some((ustensil) => regexp.test(ustensil)) ||
  //       regexp.test(recipe.appliance)
  //     );
  //   }
  }

  // static filterRecipes(recipes: Recipe[], filters: string[], page: HTMLElement): void {
  //   let matchingRecipesIDs: number[] = [];
    // for (const filter of filters) {
    //   for (const recipe of recipes) {
    //     let matchWithIngredient: boolean = false;
    //     let matchWithAppliance: boolean = false;
    //     let matchWithUstensil: boolean = false;
    //     for (const ingredient of recipe.ingredients) {
    //       if (filter === ingredient.ingredient) {
    //         matchWithIngredient = true;
    //         break;
    //       }
    //     }

    //     if (filter === recipe.appliance) {
    //       matchWithAppliance = true;
    //     }

    //     for (const ustensil of recipe.ustensils) {
    //       if (filter === ustensil) {
    //         matchWithUstensil = true;
    //         break;
    //       }
    //     }

    //     if (matchWithIngredient && matchWithAppliance || matchWithUstensil) {
    //       matchingRecipesIDs.push(recipe.id);
    //     }
    //   }
    // }

    // for (const recipe of recipes) {
    //   let matchCounter = 0;
    //   for (const filter of filters) {
    //     for (const ingredient of recipe.ingredients) {
    //       if (filter === ingredient.ingredient) {
    //         matchCounter++;
    //         break;
    //       }
    //     }

    //     if (filter === recipe.appliance) {
    //       matchCounter++;
    //     }

    //     for (const ustensil of recipe.ustensils) {
    //       if (filter === ustensil) {
    //         matchCounter++;
    //         break;
    //       }
    //     }
    //   }
    //   if (matchCounter === filters.length) {
    //     Recipe.matchingRecipes.push(recipe);
    //   }
    // }

    // matchingRecipesIDs = [...new Set(matchingRecipesIDs)];

    // console.log('matching recipes ids', matchingRecipesIDs);

    // if (matchingRecipesIDs.length !== 0) {
    //   for (const id of matchingRecipesIDs) {
    //     for (const recipe of recipes) {
    //       if (recipe.id === id) {
    //         Recipe.matchingRecipes.push(recipe);
    //       }
    //     }
    //   }
    // } else {
    //   Recipe.matchingRecipes = [];
    // }

    // const recipesCards = page.querySelectorAll('.recipe');

    // for (const card of recipesCards) {
    //   card.remove();
    // }

    // const recipesGrid = page.querySelector('#recipes-grid');
    // for (const recipe of Recipe.matchingRecipes) {
    //   recipesGrid?.append(RecipeCard(recipe));
    // }

  //   if (Recipe.matchingRecipes.length !== 0) {
  //     Recipe.rebuildFiltersSection(Recipe.matchingRecipes, page);
  //   } else {
  //     Recipe.rebuildFiltersSection(Recipe.originalListOfRecipes, page);
  //   }

  //   console.log('matching recipes', Recipe.matchingRecipes);
  // }

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
  static handleSearchbarEvent(event: any) {
    let recipesSection = document.getElementById('recipes-section');
    let filtersSection = document.getElementById('filters-section');
    let recipesGrid = document.getElementById('recipes-grid');

    if (recipesSection) {
      
      Recipe.matchingRecipes = event.detail.matchingRecipes;
      console.log('matching recipes', Recipe.matchingRecipes);
      const searchTerm: string = event.detail.searchTerm;
      const filtersItems = filtersSection?.querySelectorAll('.filter');

      if (Recipe.matchingRecipes.length === 0) {
        // filtersSection?.remove();
        filtersSection?.classList.remove('flex');//<--
        filtersSection?.classList.add('hidden');//<--
        const recipesCards = recipesGrid?.querySelectorAll('.recipe');

        recipesGrid?.classList.add('hidden');//<--
        recipesGrid?.classList.remove('grid');//<--
        
        recipesSection.innerHTML = '';
        const noMatchFound = NoMatchFound(searchTerm);
        recipesSection.appendChild(noMatchFound);
      } else {
        const recipesCards = recipesGrid?.querySelectorAll('.recipe');

        if (recipesCards) {
          for (const card of recipesCards) {
            card.remove();
          }
        }
        recipesGrid?.remove();

        recipesGrid = RecipesGrid(Recipe.matchingRecipes);
        recipesSection.appendChild(recipesGrid);

        const filters = filtersSection?.querySelectorAll('.filter');
        if (filters) {
          for (const filter of filters) {
            filter.remove();
          }
        }
        // if (filtersSection) {
        //   FilterFactory.createAndBindLIListOFItemsOfEveryFilterTypeToTheseMenus(Recipe.matchingRecipes, filtersSection);
        // }
        
        console.log('Recipe.matchingRecipes', Recipe.matchingRecipes);
        console.log('Recipe.originalListOfRecipes', Recipe.originalListOfRecipes);
      }
    }
  }
  static handleFilterEvent(event: any) {
    const filter = event.detail.filter;
    
    console.log('Recipe.originalListOfRecipes', Recipe.originalListOfRecipes);
    console.log('Recipe.matchingRecipes', Recipe.matchingRecipes);

    if (Recipe.matchingRecipes.length === 0) {
      this.filterRecipes(Recipe.originalListOfRecipes, filter);
      console.log('Recipe.matchingRecipes', Recipe.matchingRecipes);
    } else {
      this.filterRecipes(Recipe.matchingRecipes, filter);
      console.log('Recipe.matchingRecipes', Recipe.matchingRecipes);
    }

    let filtersSection = document.getElementById('filters-section');

    const recipesSection = document.getElementById('recipes-section');

    let recipesGrid = document.getElementById('recipes-grid');
    const recipesCards = recipesGrid?.querySelectorAll('.recipe');
    if (recipesSection && recipesGrid && recipesCards) {
      for (const card of recipesCards) {
        card.remove();
      }
      recipesGrid.remove();
      recipesGrid = RecipesGrid(Recipe.matchingRecipes);
      recipesSection.appendChild(recipesGrid);
    }    
  }

  static handleCancelFilterEvent(event: any) {
    const matchingRecipes: Recipe[] = [];
    /**
     * For each recipe in the original list of recipes, check if any of its ingredients, appliances or ustensils match any of the active filters
     * to determine if the recipe should be included in the list of matching recipes
     */
    for (const recipe of Recipe.originalListOfRecipes) {
      const ingredients = recipe.ingredients.map((ingredient) => ingredient.ingredient);
      let matchingCount = 0;

      Recipe.activeFilters.forEach((filter: string) => {
        const filterTrim = filter.trim();
        const regexp = new RegExp(`^${filterTrim}$`);

        ingredients.find(ingredient => {
          if (regexp.exec(ingredient)) {
            matchingCount++;
            console.log(`filter ${filter} found in ${recipe.name}`);
          }
        });
        
        recipe.ustensils.find(ustensil => {
          if (regexp.exec(ustensil)) {
            matchingCount++;
            console.log(`filter ${filter} found in ${recipe.name}`);
          }
        });
        
        if (regexp.exec(recipe.appliance)) {
          matchingCount++;
          console.log(`filter ${filter} found in ${recipe.name}`);
        }
      });

      if (matchingCount === Recipe.activeFilters.length) {
        matchingRecipes.push(recipe);
      }
    }
    Recipe.matchingRecipes = matchingRecipes;
    console.log('matchingRecipes', Recipe.matchingRecipes);

    const recipesSection = document.getElementById('recipes-section');
    let recipesGrid = document.getElementById('recipes-grid');
    const recipesCards = recipesGrid?.querySelectorAll('.recipe');
    // console.log('recipesCards', recipesCards);
    if (recipesCards && recipesGrid && recipesSection) {
      for (const card of recipesCards) {
        card.remove();
      }
      recipesGrid.remove();

      if (matchingRecipes.length !== 0) {
        recipesGrid = RecipesGrid(matchingRecipes);
      } else {
        recipesGrid = RecipesGrid(Recipe.originalListOfRecipes);
      }

      recipesSection.appendChild(recipesGrid);
    }
  }
}

  
