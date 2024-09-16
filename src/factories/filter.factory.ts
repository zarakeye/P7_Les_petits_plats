import { SomeTypeFiltersMenu } from '../components/SomeTypeFiltersMenu';
import { SomeTypeActiveFiltersMenu } from '../components/SomeTypeActiveFiltersMenu';
import { SomeTypeButtonsContainerOfActiveFilters } from '../components/SomeTypeButtonsContainerOfActiveFilters';
import { SomeTypeOfFiltersManager } from '../components/SomeTypeOfFiltersManager';
import { FilterTag } from '../components/FilterTag';
import { FiltersSection } from '../components/FiltersSection';
import { FilterButton } from '../components/FilterButton';
import { FilterType } from '../modules/recipe';


export const FilterFactory = {
  createMappingOfActiveFiltersByName(filters: any[]) {
    const mappingOfActiveFiltersByName: string[] = [];

    for (const filter of filters) {
      mappingOfActiveFiltersByName.push(filter.name);
    }

    return mappingOfActiveFiltersByName;
  },

  buildFiltersTypeManager(filterType: FilterType, domfilters: HTMLLIElement[]) {
    const filtersMenu = SomeTypeFiltersMenu(filterType);

    filtersMenu.classList.add('hidden');

    for (const value of domfilters) {
      filtersMenu.appendChild(value);
    }

    const activeFiltersMenu = SomeTypeActiveFiltersMenu(filterType);
    const activeFiltersButtonsContainer = SomeTypeButtonsContainerOfActiveFilters(filterType);
    const filtersManager = SomeTypeOfFiltersManager(filterType);
    const filtersManagerTitle = filtersManager.querySelector('h2');
    if (filtersManagerTitle) {
      switch (filterType) {
        case 'ingredient':
          filtersManagerTitle.textContent = 'Ingrédients';
          break;
        case 'appliance':
          filtersManagerTitle.textContent = 'Appareils';
          break;
        case 'ustensil':
          filtersManagerTitle.textContent = 'Ustensiles';
          break;
      }
    }
    const filtersManagerDropdown = filtersManager.querySelector('aside');

    filtersManagerDropdown?.appendChild(activeFiltersMenu);
    filtersManagerDropdown?.appendChild(filtersMenu);
    filtersManager?.appendChild(activeFiltersButtonsContainer);

    return filtersManager;
  },
  
  updateSelectableFiltersDisplay(filters: any, page: HTMLElement) {
    const filterTypes: FilterType[] = ['ingredient', 'appliance', 'ustensil'];

    const domfilters = page.querySelectorAll('.filter');
    console.log('domfilters', domfilters);

    for (const domFilter of domfilters) {
      domFilter.remove();
    }

    for (const type of filterTypes) {
      for (const filter of filters[`${type}s`]) {
        page.querySelector(`list-of-selectable-${type}s`)?.appendChild(FilterTag(filter, type));
      }
    }
  },

  buildFilterSection(filterTypes: FilterType[], filtersTags: any) {
    const filtersSection = FiltersSection();
    const typesManagersContainers = filtersSection.querySelector('#filter-types-managers_container');

    for (const filterType of filterTypes) {
      const filtersTypeManager = FilterFactory.buildFiltersTypeManager(filterType, filtersTags[`${filterType}s`]);
      typesManagersContainers?.appendChild(filtersTypeManager);
    }

    return filtersSection;
  },

  createClearButtonOfSelectedFilterAndBindToContainer(selectedFilter: FilterObject, clearButtonsContainer: HTMLDivElement) {
    const clearButton = FilterButton(selectedFilter, filterType);
    clearButtonsContainer?.appendChild(clearButton);
  }
}