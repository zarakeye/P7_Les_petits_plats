import { createEventAndDispatch } from '../helpers';
import { UnactivateFilterEvent } from './SomeTypeFiltersMenu';
import { Filter as FilterObject} from '../modules/filter';
import { capitalizeFirstLetter } from '../helpers';
import { FilterFactory } from '../factories/filter.factory';
import { Recipe } from '../modules/recipe';

export const SelectFilterEvent = 'select-filter-event';
const UpdateSelectableFiltersEvent = 'update-selectable-filters-event';

export function Filter(filter: FilterObject) {
  const domfilter: HTMLLIElement = document.createElement('li');
  domfilter.id = `${filter.type}-${filter.id}`;
  domfilter.classList.add('text-[14px]', 'bg-white', `${filter.type}`); 
  domfilter.textContent = capitalizeFirstLetter(filter.name);

  domfilter.addEventListener('click', () => {
    createEventAndDispatch(domfilter, SelectFilterEvent, { filter: filter });
  });

  return domfilter;
}

export function handleClickOnFilterListItem(event: any, page: HTMLElement) {
  const filter: FilterObject = event.detail.filter;
  const filterListItem = event.target;
  
  filter.active = !filter.active;
  if (filter.active) {
    FilterObject.mappingOfActiveFiltersByName.push(filter.name);
  } else {
    const updatedMappingOfActiveFiltersByName = [];
    for (let i = 0; i < FilterObject.mappingOfActiveFiltersByName.length; i++) {
      if (FilterObject.mappingOfActiveFiltersByName[i] !== filter.name) {
        updatedMappingOfActiveFiltersByName.push(FilterObject.mappingOfActiveFiltersByName[i]);
      }
    }
    FilterObject.mappingOfActiveFiltersByName = updatedMappingOfActiveFiltersByName;
  }

  filterListItem.classList.toggle('active');
  const activeFiltersMenu = page.querySelector(`#list-of-active-${filter.type}s`);
  const selectableFiltersMenu = page.querySelector(`#list-of-selectable-${filter.type}s`);
  const clearButtonContainer: HTMLDivElement | null = page.querySelector(`#active-${filter.type}s-clear-buttons_container`);

  if (filter.active) {
    activeFiltersMenu?.appendChild(filterListItem);
    filterListItem.classList.add('text-left', 'px-[16px]', 'py-[9px]', 'mb-px');
    filterListItem.classList.remove('bg-white');
    clearButtonContainer && FilterFactory.createClearButtonOfSelectedFilterAndBindToContainer(filter, clearButtonContainer);
    
    if (Recipe.matchingRecipes.length === 0) {
      if (Recipe.mainSearchMatchingRecipes.length === 0) {
        console.log('None previously main search filtered recipes: rebuild filters section with all recipes');
        console.log('None previously filtered recipes: rebuild filters section with all recipes');
        Recipe.filterRecipes(Recipe.originalListOfRecipes, filter.name, page);
      } else {
        Recipe.filterRecipes(Recipe.mainSearchMatchingRecipes, filter.name, page);
      }
      console.log('None previously filtered recipes: rebuild filters section with all recipes');
      Recipe.filterRecipes(Recipe.originalListOfRecipes, filter.name, page);
      // createEventAndDispatch(page, UpdateRecipesCardsEvent, { filterType: filter.type });
      console.log('Recipe.matchingRecipes', Recipe.matchingRecipes);
    } else {
      console.log('Some previously filtered recipes: rebuild filters section with previously matching recipes');
      
      Recipe.filterRecipes(Recipe.matchingRecipes, filter.name, page);
      console.log('Recipe.matchingRecipes', Recipe.matchingRecipes);
    }
  } else {
    filterListItem.classList.remove('text-left', 'px-[16px]', 'py-[9px]', 'mb-px');
    filterListItem.classList.add('bg-white');
    selectableFiltersMenu?.appendChild(filterListItem);
    let clearButton = clearButtonContainer?.querySelector(`#${filter.type}-${filter.id}-unselect-button`);
    clearButton?.remove();
    console.log('clear filter\nNew list of matching filters', FilterObject.mappingOfActiveFiltersByName);
    Recipe.matchingRecipes = [];
    for (let i = 0; i < FilterObject.mappingOfActiveFiltersByName.length; i++) {
      console.log('Filter with : ', FilterObject.mappingOfActiveFiltersByName[i]);
      if (i === 0) {
        if (Recipe.mainSearchMatchingRecipes.length === 0) {
          console.log('None previously main search filtered recipes: rebuild filters section with all recipes');

          Recipe.filterRecipes(Recipe.originalListOfRecipes, FilterObject.mappingOfActiveFiltersByName[i], page);
          console.log('Recipe.matchingRecipes', Recipe.matchingRecipes);
        } else {
          console.log('Some previously filtered recipes: rebuild filters section with previously main search matching recipes');
          Recipe.filterRecipes(Recipe.mainSearchMatchingRecipes, FilterObject.mappingOfActiveFiltersByName[i], page);
          console.log('Recipe.matchingRecipes', Recipe.matchingRecipes);
        }
      } else {
        console.log('Some previously filtered recipes: rebuild filters section with previously matching recipes');
        Recipe.filterRecipes(Recipe.matchingRecipes, FilterObject.mappingOfActiveFiltersByName[i], page);
        console.log('Recipe.matchingRecipes', Recipe.matchingRecipes);
      }
    }
  }
}
