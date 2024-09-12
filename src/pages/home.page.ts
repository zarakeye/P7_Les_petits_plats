import { recipes as recipesArray } from '../data/recipes';
import { Recipe, Ingredient } from '../modules/recipe';
import { RecipesSection } from '../components/RecipesSection';
import { RecipesGrid } from '../components/RecipesGrid';
import { Header, SearchbarEvent } from '../components/Header';
import { FilterFactory } from '../factories/filter.factory';
import { FilterEvent, UnactivateFilterEvent } from '../components/SomeTypeFiltersMenu';
import { FilterType, Filter } from '../modules/filter';
import { DisplayFiltersMenusEvent, HideFiltersMenusEvent } from '../components/SomeTypeOfFiltersManager';
import { displayFiltersMenu, hideFiltersMenu } from '../components/SomeTypeFiltersMenu';
import { /*FilterListClickItemEvent, */SelectFilterEvent,handleClickOnFilterListItem } from '../components/Filter';
import { UnselectFilterEvent, unselectFilter } from '../components/FilterButton';
import { hideActiveFiltersMenu } from '../components/SomeTypeActiveFiltersMenu';

  /**
   * Creates the home page, which includes a header with a search bar, a
   * section for the recipes and, before it, a section for the filters to apply on the recipes.
   * @returns The home page element.
   */
export const HomePage = async () => {
  for (const recipe of recipesArray) {
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
          quantity = Number(ingredient.quantity); // Convert string to number when given in string
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
    )

    Recipe.originalListOfRecipes.push(newRecipe);
  }
  const page = document.createElement('div');
  
  const header = Header(Recipe.originalListOfRecipes);
  page.appendChild(header);

  const main = document.createElement('main')
  page.appendChild(main);

  const recipesSection: HTMLElement = RecipesSection();

  let recipesGrid: HTMLDivElement = RecipesGrid(Recipe.originalListOfRecipes);
  recipesSection.appendChild(recipesGrid);
  
  // const filters = FilterFactory.createFilters(Recipe.originalListOfRecipes);

  const filterTypes = ['ingredient', 'appliance', 'ustensil'] as FilterType[];

  const filters = FilterFactory.createFilters(Recipe.originalListOfRecipes, filterTypes);
  console.log('filters', filters);
  const DOMFilters = FilterFactory.createDOMFilters(filterTypes, filters);
  console.log('DOMFilters', DOMFilters);
  let filtersSection = FilterFactory.buildFilterSection(filterTypes, DOMFilters);

  main.appendChild(filtersSection);
  
  main.appendChild(recipesSection);

  page.addEventListener(SearchbarEvent, (e: any) => Recipe.handleSearchbarEvent(e));

  page.addEventListener(SelectFilterEvent, (e: any) => handleClickOnFilterListItem(e, page));

  page.addEventListener(UnselectFilterEvent, (e: any) => handleUnselectFilterEvent(e, page));

  page.addEventListener(DisplayFiltersMenusEvent, (e: any) => displayFiltersMenu(e, page));

  page.addEventListener(HideFiltersMenusEvent, (e: any) => hideFiltersMenu(e, page));

  return page;
}

function handleUnselectFilterEvent(e: any, page: HTMLElement) {
  const filter = e.detail.filter;
  unselectFilter(e, page);

  hideActiveFiltersMenu(filter.type, page);
}
