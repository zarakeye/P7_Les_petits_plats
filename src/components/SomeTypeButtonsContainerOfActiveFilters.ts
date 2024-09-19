import { FilterType } from "../modules/recipe";

export function SomeTypeButtonsContainerOfActiveFilters(filterType: FilterType) {
  const container = document.createElement('div');
  container.id = `active-${filterType}s-clear-buttons_container`;
  container.classList.add('relative', `active-${filterType}`, 'text-[14px]', 'text-center', 'text-gray', 'mt-[77px]', 'inline-flex', 'flex-wrap', 'gap-[5px]');

  return container;
}