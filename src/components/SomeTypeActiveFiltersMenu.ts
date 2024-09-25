import { FilterType } from '../modules/recipe';
/**
 * Creates an HTML element representing a menu of active filters of a given type.
 * This menu is a container that will be filled with tags representing the active filters of the given type.
 * @param {FilterType} filterType - the type of the filters to be represented in the menu
 * @returns {HTMLUListElement} the container element representing the menu of active filters
 */
export function SomeTypeActiveFiltersMenu(filterType: FilterType) {
  const filterTypeItems: HTMLUListElement = document.createElement('ul');
  filterTypeItems.id = `list-of-active-${filterType}s`;
  filterTypeItems.classList.add('menu-of-active-filters', `active-${filterType}`, 'relative', 'text-[14px]', 'text-center', 'bg-yellow');
  
  return filterTypeItems;
}

/**
 * Hides the menu of active filters of the given type by adding the 'hidden' class to the menu element.
 * @param {FilterType} filterType - the type of the filters for which to hide the active filters menu
 */
export function hideActiveFiltersMenu (filterType: FilterType) {
  const menuIntoDOM = document.querySelector(`#list-of-active-${filterType}s`);
  menuIntoDOM?.classList.add('hidden');
}