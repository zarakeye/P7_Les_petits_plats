import { capitalizeFirstLetter } from '../helpers';
import { FilterRule } from '../components/FilterList';
import { NoMatchFound } from '../components/NoMatchFound';
import { FiltersSection } from '../components/FiltersSection';
import { RecipesGrid } from '../components/RecipesGrid';
import { RecipeCard } from '../components/RecipeCard.ts';

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

  /**
   * Returns an array of unique ingredients from an array of recipes.
   *
   * @param {Recipe[]} recipes - An array of recipe objects.
   * @return {string[]} An array of unique ingredient names.
   */
  static setOf(recipes: Recipe[], filter: FilterRule): Set<string> {
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
  }

  static filterRecipes(recipes: Recipe[], filter: string): Recipe[] {
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

  /**
   * Handles the searchbar event by filtering the recipes, removing the filter section
   * and the recipes grid, and adding a "No match found" card if no recipe matches the search term.
   * @param event - The CustomEvent emitted by the SearchBar component, with the matching recipes and search term.
   */
  static handleSearchbarEvent(event: any, advancedFilters: FilterRule[]) {
    // const advancedFilters: FilterRule[] = ['ingredients', 'appliance', 'ustensils'];
    let recipesSection = document.getElementById('recipes-section');
    let filtersSection = document.getElementById('filters-section');
    let recipesGrid = document.getElementById('recipes-grid');

    if (recipesSection) {
    recipesSection.innerHTML = '';
    
    const matchingRecipes: Recipe[] = event.detail.matchingRecipes;
    const searchTerm: string = event.detail.searchTerm;

    if (matchingRecipes.length === 0) {
      filtersSection?.remove();
      const recipesCards = recipesGrid?.querySelectorAll('.recipe');

      if (recipesCards) {
        for (const card of recipesCards) {
          card.remove();
        }
      }
      recipesGrid?.remove();
      
      const noMatchFound = NoMatchFound(searchTerm);
      recipesSection.appendChild(noMatchFound);
    } else {
      const filterLists = filtersSection?.querySelectorAll('.filter-list');
      if (filterLists) {
        for (const filterList of filterLists) {
          filterList.remove();
        }
      }

      filtersSection?.remove();

      const recipesCards = recipesGrid?.querySelectorAll('.recipe');

      if (recipesCards) {
        for (const card of recipesCards) {
          card.remove();
        }
      }

      filtersSection = FiltersSection(matchingRecipes, advancedFilters);
      recipesSection.insertAdjacentElement('beforebegin', filtersSection);
      recipesSection.innerHTML = '';
      recipesGrid = RecipesGrid(matchingRecipes);
      recipesSection.appendChild(recipesGrid);
    }
  }}

  static handleFilterEvent(event: any, recipesBasedOn: Recipe[], recipesSection: HTMLElement, recipesGrid: HTMLElement) {
    recipesBasedOn = event.detail.recipesBasedOn;
    const matchingRecipes = event.detail.matchingRecipes;
    //const filter = e.detail.filter;

    const recipesCards = recipesGrid.querySelectorAll('.recipe');
    for (const card of recipesCards) {
      card.remove();
    }
    for (const recipe of matchingRecipes) {
      recipesGrid.appendChild(RecipeCard(recipe));
    }

    recipesGrid = RecipesGrid(matchingRecipes);

    recipesSection.appendChild(recipesGrid);
  }

  static handleCancelFilterEvent(event: any, recipesBasedOn: Recipe[], recipesSection: HTMLElement, recipesGrid: HTMLElement) {
    const activeFiltersRemaining = event.detail.activeFiltersRemaining;
    for (let filter of activeFiltersRemaining) {
      filter = filter.trim();
    }

    const matchingRecipes: Recipe[] = [];
    for (const recipe of recipesBasedOn) {
      for (const ingredient of recipe.ingredients) {
        if (activeFiltersRemaining.includes(ingredient.ingredient.trim()) && !matchingRecipes.includes(recipe)) {
          matchingRecipes.push(recipe);
        }
      }
      for (const ustensil of recipe.ustensils) {
        if (activeFiltersRemaining.includes(ustensil) && !matchingRecipes.includes(recipe)) {
          matchingRecipes.push(recipe);
        }
      }
      if (activeFiltersRemaining.includes(recipe.appliance) && !matchingRecipes.includes(recipe)) {
        matchingRecipes.push(recipe);
      }
    }

    const recipesCards = recipesGrid.querySelectorAll('.recipe');
    for (const card of recipesCards) {
      card.remove();
    }
    if (matchingRecipes.length !== 0) {  
      for (const recipe of matchingRecipes) {
        recipesGrid.appendChild(RecipeCard(recipe));
      }
    } else {
      for (const recipe of recipesBasedOn) {
        recipesGrid.appendChild(RecipeCard(recipe));
      }
    }
    recipesSection.appendChild(recipesGrid);
  }
}

  
