import { FilterType } from "../modules/recipe";
import { buildFiltersTypeManager } from "./SomeTypeOfFiltersManager";

/**
 * Creates the filters section of the page by creating a section element with
 * the id `filters-section` and adding the necessary elements to it.
 * @returns {HTMLElement} the filters section element
 */
export function FiltersSection(): HTMLElement {
  const filtersSection = document.createElement('section');
  filtersSection.id = 'filters-section';
  
  filtersSection.classList.add('relative', 'flex', 'justify-between','bg-light-gray', 'pt-[21px]', 'px-[108px]')
  
  filtersSection.innerHTML = `
    <div
      id="filter-types-managers_container"
      class="w-[669px]"
    >
      <div id="managers_wrapper" class="flex justify-between  gap-[66px] left-[104px]"></div>
      <div id="active-filters-unselect-buttons_container" class="flex flex-wrap gap-[15px]"></div>
    </div>
  `;
  
  return filtersSection;
}

/**
 * Builds the filters section of the page by creating a FiltersSection element and adding
 * a SomeTypeOfFiltersManager for each filter type in the filterTypes array.
 * @param {FilterType[]} filterTypes - an array of filter types to add managers for
 * @returns {HTMLElement} the filters section element
 */
export function buildFilterSection(filterTypes: FilterType[]) {
  const filtersSection = FiltersSection();
  const typesManagersContainers = filtersSection.querySelector('#managers_wrapper');

  for (const filterType of filterTypes) {
    const filtersTypeManager = buildFiltersTypeManager(filterType);
    typesManagersContainers?.appendChild(filtersTypeManager);
  }

  return filtersSection;
}

