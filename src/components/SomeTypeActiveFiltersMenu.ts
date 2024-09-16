import { FilterType } from '../modules/recipe';
export function SomeTypeActiveFiltersMenu(filterType: FilterType) {
  const filterTypeItems: HTMLUListElement = document.createElement('ul');
  filterTypeItems.id = `list-of-active-${filterType}s`;
  filterTypeItems.classList.add('menu-of-active-filters', `active-${filterType}`, 'relative', 'text-[14px]', 'text-center', 'bg-yellow', 'text-gray');
  
  return filterTypeItems;
}

export function hideActiveFiltersMenu (filterType: FilterType, page: HTMLElement) {
  const menuIntoDOM = page.querySelector(`#list-of-active-${filterType}s`);
  menuIntoDOM?.classList.add('hidden');
}