import { Recipe } from '../modules/recipe';
// import { FilterTypeItem } from '../components/FilterTypeItem';
import { SomeTypeFiltersMenu } from '../components/SomeTypeFiltersMenu';
import { SomeTypeActiveFiltersMenu } from '../components/SomeTypeActiveFiltersMenu';
import { SomeTypeButtonsContainerOfActiveFilters } from '../components/SomeTypeButtonsContainerOfActiveFilters';
import { SomeTypeOfFiltersManager } from '../components/SomeTypeOfFiltersManager';
import { FilterType, Filter as FilterObject} from '../modules/filter';
import { Filter } from '../components/Filter';
import { FiltersSection } from '../components/FiltersSection';
import { FilterButton } from '../components/FilterButton';


export const FilterFactory = {
  createFilters(recipes: Recipe[], filterTypes: FilterType[]) {
    let filters: any = {
      ingredients: [],
      appliances: [],
      ustensils: []
    }

    for (const recipe of recipes) {
      for (const ingredient of recipe.ingredients) {
        filters.ingredients.push(ingredient.ingredient);
      }

      filters.appliances.push(recipe.appliance);

      for (const ustensil of recipe.ustensils) {
        filters.ustensils.push(ustensil);
      }
    }

    for (const type of filterTypes) {
      filters[`${type}s`] = [...new Set(filters[`${type}s`])];
      const length = filters[`${type}s`].length;
      for (let i = 0; i < length; i++) {
        FilterObject.filters[`${type}s`].push(new FilterObject(i, filters[`${type}s`][i], type, false));
        
      }
    }

    return FilterObject.filters;
  },

  createDOMFilters(filterTypes: FilterType[], filters: any) {
    const DOMFilters: any = [];

    for (const type of filterTypes) {
      const length = filters[`${type}s`].length;
      DOMFilters[`${type}s`] = [];
      for (let i = 0; i < length; i++) {
        DOMFilters[`${type}s`].push(Filter(filters[`${type}s`][i]));
      }
    }

    return DOMFilters;
  },

  createMappingOfActiveFiltersByName(filters: any[]) {
    const mappingOfActiveFiltersByName: string[] = [];

    for (const filter of filters) {
      mappingOfActiveFiltersByName.push(filter.name);
    }

    return mappingOfActiveFiltersByName;
  },

  buildFiltersTypeManager(filterType: FilterType, domfilter: HTMLLIElement[]) {
      const filtersMenu = SomeTypeFiltersMenu(filterType);

      filtersMenu.classList.add('hidden');

      for (const value of domfilter) {
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


  buildFilterSection(filterTypes: FilterType[], domFilters: any) {
    const filtersSection = FiltersSection();
    const typesManagersContainers = filtersSection.querySelector('#filter-types-managers_container');

    for (const filterType of filterTypes) {
      const filtersTypeManager = FilterFactory.buildFiltersTypeManager(filterType, domFilters[`${filterType}s`]);
      typesManagersContainers?.appendChild(filtersTypeManager);
    }

    return filtersSection;
  },

  createClearButtonOfSelectedFilterAndBindToContainer(selectedFilter: FilterObject, clearButtonsContainer: HTMLDivElement) {
    const clearButton = FilterButton(selectedFilter);
    clearButtonsContainer?.appendChild(clearButton);
  }
}