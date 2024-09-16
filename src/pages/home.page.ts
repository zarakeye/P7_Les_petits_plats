import { recipes as recipesArray } from '../data/recipes';
import { Recipe } from '../modules/recipe';
import { RecipesSection } from '../components/RecipesSection';
import { RecipesGrid } from '../components/RecipesGrid';
import { Header, MainSearchbarEvent,handleMainSearchbarEvent } from '../components/Header';
import { FilterFactory } from '../factories/filter.factory';
import {  FilterType } from '../modules/recipe';
import { DisplayFiltersMenusEvent, HideFiltersMenusEvent } from '../components/SomeTypeOfFiltersManager';
import { displayFiltersMenu, hideFiltersMenu } from '../components/SomeTypeFiltersMenu';
import { SelectFilterEvent,handleClickOnFilterListItem } from '../components/FilterTag';
import { UnselectFilterEvent, unselectFilter } from '../components/FilterButton';
import { hideActiveFiltersMenu } from '../components/SomeTypeActiveFiltersMenu';
import { RecipesCounter } from '../components/RecipesCounter';

/**
 * Creates the home page, which includes a header with a search bar, a
 * section for the recipes and, before it, a section for the filters to apply on the recipes.
 * @returns The home page element.
 */
export const HomePage = async () => {
  Recipe.originalRecipes = Recipe.createRecipes(recipesArray);
  
  const page = document.createElement('div');
  
  const header = Header();
  page.appendChild(header);

  const main = document.createElement('main')
  page.appendChild(main);

  const recipesSection: HTMLElement = RecipesSection();
  const recipesCards = Recipe.createRecipesCards(Recipe.originalRecipes);

  let recipesGrid: HTMLDivElement = RecipesGrid(Recipe.originalRecipes);
  recipesGrid.append(...recipesCards);
  recipesSection.appendChild(recipesGrid);
  
  const filtersTypes = ['ingredient', 'appliance', 'ustensil'] as FilterType[];

  const filters = Recipe.extractFilters(Recipe.originalRecipes, filtersTypes);
  const filtersTags = Recipe.createFiltersTags(filters);
  const recipesCounter = RecipesCounter(Recipe.originalRecipes);
  let filtersSection = FilterFactory.buildFilterSection(filtersTypes, filtersTags);

  filtersSection.appendChild(recipesCounter);

  main.appendChild(filtersSection);
  
  main.appendChild(recipesSection);

  page.addEventListener(MainSearchbarEvent, (e: any) => handleMainSearchbarEvent(e, page));

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
