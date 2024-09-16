import { FilterType } from '../modules/recipe';
// import { createEventAndDispatch } from '../helpers';
// import { Recipe } from '../modules/recipe';
// import { DisplaySelectableFiltersEvent, HideSelectableFiltersEvent } from '../components/SomeTypeOfFiltersManager';

export const UnactivateFilterEvent = 'cancel-filter-event';
export const FilterEvent = 'filter-event';
export const UpdateSelectableFiltersEvent = 'update-selectable-filters-event';

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

export function displayFiltersMenu(event: any, page: HTMLElement) {
  const typeToDisplay: FilterType = event.detail.filterType;
  const menuIntoDOM = page.querySelector(`#list-of-selectable-${typeToDisplay}s`);
  menuIntoDOM?.classList.remove('hidden');
}

export function hideFiltersMenu (event: any, page: HTMLElement) {
  const typeToHide: FilterType = event.detail.filterType;
  const menuIntoDOM = page.querySelector(`#list-of-selectable-${typeToHide}s`);
  menuIntoDOM?.classList.add('hidden');
}