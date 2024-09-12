import { FilterType } from "../modules/filter";

export function SomeTypeButtonsContainerOfActiveFilters(filterType: FilterType) {
  const container = document.createElement('div');
  container.id = `active-${filterType}s-clear-buttons_container`;
  container.classList.add(`active-${filterType}`, 'relative', 'text-[14px]', 'text-center', 'bg-yellow', 'text-gray');

  return container;
}