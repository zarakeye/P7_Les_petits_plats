import { FilterType } from '../modules/recipe';

export const UnactivateFilterEvent = 'cancel-filter-event';
export const FilterEvent = 'filter-event';
export const updateActivableFiltersEvent = 'update-selectable-filters-event';

/**
 * Creates an unordered list element for the dropdown menu of
 * selectable filters. The id of the element is 'list-of-selectable-<filterType>s'
 * and it has the classes: 'menu-of-selectable-filters', 'h-[202px]',
 * 'gap-[13px]', 'px-[16px]', 'overscroll-y-contain', 'overflow-y-auto',
 * 'scrollbar-hide'.
 * @param {FilterType} filterType - the type of filters
 * @returns {HTMLUListElement} - the unordered list element
 */
export function ClickableFiltersMenu(filterType: FilterType): HTMLUListElement {
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

