import { FilterType } from "../modules/recipe";
import { buildFiltersTypeManager } from "./SomeTypeOfFiltersManager";

export function FiltersSection() {
  const filtersSection = document.createElement('section');
  filtersSection.id = 'filters-section';
  
  filtersSection.classList.add('relative', 'flex', 'justify-between','bg-light-gray', 'pt-[21px]', 'px-[108px]')
  
  filtersSection.innerHTML = `
    <div
      id="filter-types-managers_container"
      class="flex justify-between w-[669px] gap-[66px] left-[104px] text-gray font-bold"
    >
    </div>
  `;
  
  return filtersSection;
}

export function buildFilterSection(filterTypes: FilterType[]) {
  const filtersSection = FiltersSection();
  const typesManagersContainers = filtersSection.querySelector('#filter-types-managers_container');

  for (const filterType of filterTypes) {
    const filtersTypeManager = buildFiltersTypeManager(filterType);
    typesManagersContainers?.appendChild(filtersTypeManager);
  }

  return filtersSection;
}

