import { FilterType } from '../modules/recipe';

export const UnactivateFilterEvent = 'cancel-filter-event';
export const FilterEvent = 'filter-event';
export const UpdateSelectableFiltersEvent = 'update-selectable-filters-event';

/**
 * Creates an unordered list element for the dropdown menu of
 * selectable filters. The id of the element is 'list-of-selectable-<filterType>s'
 * and it has the classes: 'menu-of-selectable-filters', 'h-[202px]',
 * 'gap-[13px]', 'px-[16px]', 'overscroll-y-contain', 'overflow-y-auto',
 * 'scrollbar-hide'.
 * @param {FilterType} filterType - the type of filters
 * @returns {HTMLUListElement} - the unordered list element
 */
export function SomeTypeFiltersMenu(filterType: FilterType) {
  const menu: HTMLUListElement = document.createElement('ul');
  menu.id = `list-of-selectable-${filterType}s`;
  menu.classList.add(
    'menu-of-selectable-filters',
    'h-[202px]',
    'gap-[13px]', 
    'px-[16px]', 
    'overscroll-y-contain', 
    'overflow-y-auto', 
    'scrollbar-hide'
  );

  return menu;
}

/**
 * Displays the list of selectable filters for a given filter type.
 * It is a event handler of the event 'display-selectable-filters-event'.
 * The event detail should contain a property 'filterType' with the type of filters
 * to be displayed.
 * @param {any} event - the event
 */
export function displayFiltersMenu(event: any) {
  const typeToDisplay: FilterType = event.detail.filterType;
  const menuIntoDOM = document.querySelector(`#list-of-selectable-${typeToDisplay}s`);
  menuIntoDOM?.classList.remove('hidden');
}

/**
 * Hides the list of selectable filters for a given filter type.
 * It is a event handler of the event 'hide-selectable-filters-event'.
 * The event detail should contain a property 'filterType' with the type of filters
 * to be hidden.
 * @param {any} event - the event
 */
export function hideFiltersMenu (event: any) {
  const typeToHide: FilterType = event.detail.filterType;
  const menuIntoDOM = document.querySelector(`#list-of-selectable-${typeToHide}s`);
  menuIntoDOM?.classList.add('hidden');
}