import { FilterType } from "../modules/recipe";

/**
 * Creates a container for the buttons of the active filters of a given type.
 * The container is a `div` element with an id of `active-${filterType}s-clear-buttons_container`.
 * It has the classses `relative`, `active-${filterType}`, `text-[14px]`, `text-center`, `text-gray`, `mt-[77px]`, `inline-flex`, `flex-wrap`, `gap-[5px]`.
 * It is meant to be used to contain the buttons of the active filters of a given type in the filters manager.
 * @param {FilterType} filterType - the type of the filters
 * @returns {HTMLElement} the container element
 */
export function SomeTypeButtonsContainerOfActiveFilters(filterType: FilterType) {
  const container = document.createElement('div');
  container.id = `active-${filterType}s-clear-buttons_container`;
  container.classList.add('relative', `active-${filterType}`, 'text-[14px]', 'text-center', 'text-gray', 'mt-[77px]', 'inline-flex', 'flex-wrap', 'gap-[5px]');

  return container;
}