import { capitalizeFirstLetter } from '../helpers';
import { Recipe, FilterType } from '../modules/recipe';
import { updateRecipesCounter } from './RecipesCounter';
import { FilterButton } from './FilterButton';

// export const SelectFilterEvent = 'select-filter-event';

export function FilterTag(filter: any, type: FilterType) {
  const filterName = String(filter);
  const tag: HTMLLIElement = document.createElement('li');
  tag.classList.add('text-[14px]', 'bg-white', `${type}`, 'filter', 'text-black'); 
  tag.textContent = capitalizeFirstLetter(filterName);

  return tag;
}

export function updateCardsAndFiltersTagsWhenSomeFilterIsSelected(recipes: Recipe[], filter: string, type: FilterType, page: HTMLElement) {
  updateRecipesGrid(recipes, type, filter, page);
  updateClickableFiltersMenu(type, page);
  addUnselectFilterButton(filter, type, page);
  updateRecipesCounter(Recipe.matchingRecipes.length, page);
}

export function updateCardsAndFiltersTagsWhenAFilterIsRemoved(filter: string, type: FilterType, filtersTypesList: FilterType[], page: HTMLElement) {
  const activeTagsMenu = page.querySelectorAll(`#list-of-active-${type}s .filter`);
  const tag = Array.from(activeTagsMenu).find(tag => String(tag.querySelector('p')?.textContent?.trim()) === filter.trim()) as HTMLLIElement;
  
  // remove tag from active tags menu, it will be created after updating selectable filters
  tag.remove();

  // remove filter from active ones
  const activeFiltersKey = `${type}s` as keyof typeof Recipe.activeFilters;
  Recipe.activeFilters[activeFiltersKey] = Recipe.activeFilters[activeFiltersKey].filter((activeFilter: string) => activeFilter !== filter);
  
  // Refilter recipes. Matching recipes inited with all recipes.
  // Remove from matchingRecipes any recipe that does not match any of the active filters
  Recipe.matchingRecipes = Recipe.originalRecipes;
  filtersTypesList.forEach((type: FilterType) => {
      Recipe.activeFilters[`${type}s`].forEach((activeFilter: any) => {
        Recipe.filterRecipesWithActivatedFilter(Recipe.matchingRecipes, type, activeFilter);
      })
      const updatedRecipesCards = Recipe.createRecipesCards(Recipe.matchingRecipes);
      const recipesGrid = page.querySelector('#recipes-grid');
      recipesGrid?.replaceChildren(...updatedRecipesCards);
  });

  let newFiltersTags = createTagsOfATypeOfFilters(type);
  const clickableFitersMenu = page.querySelector(`#list-of-selectable-${type}s`);
  clickableFitersMenu?.replaceChildren(...newFiltersTags);

  const clearButons = page.querySelectorAll(`.current-${type}`);
  Array.from(clearButons).find(button => String(button.textContent?.trim()) === filter.trim())?.parentElement?.remove();

  updateRecipesCounter(Recipe.matchingRecipes.length, page);
}

export function createTagsOfATypeOfFilters(type: FilterType): HTMLLIElement[] {
  const key = `${type}s`;

  let filtersOfType: string[] = [];
  if (Recipe.selectableFilters[key]) {
    filtersOfType = (Recipe.selectableFilters as any)[key];
  }
  console.log('typeof filtersOfType', typeof filtersOfType);
  return filtersOfType.map((filter: string) => FilterTag(filter, type));
}

function updateRecipesGrid(recipes: Recipe[], type: FilterType, filter: string, page: HTMLElement) {
  Recipe.filterRecipesWithActivatedFilter(recipes, type, filter);
  const updatedRecipesCards = Recipe.createRecipesCards(Recipe.matchingRecipes);
  const recipesGrid = page.querySelector('#recipes-grid');
  recipesGrid?.replaceChildren(...updatedRecipesCards);
}

function updateClickableFiltersMenu(type: FilterType, page: HTMLElement) {
  Recipe.updateSelectableFilters();
  let newFiltersTags = createTagsOfATypeOfFilters(type);
    
  const clickableFitersMenu = page.querySelector(`#list-of-selectable-${type}s`);
  clickableFitersMenu?.replaceChildren(...newFiltersTags);
}

function addUnselectFilterButton(filter: string, type: FilterType, page: HTMLElement) {
  const buttonsContainer = page.querySelector(`#active-${type}s-clear-buttons_container`);
  const unselectFilterButton = FilterButton(filter, type);
  buttonsContainer?.appendChild(unselectFilterButton);
}