import { SearchBar } from './SearchBar';
import { FilterType, Recipe } from '../modules/recipe';
import { SomeTypeActiveFiltersMenu } from './SomeTypeActiveFiltersMenu';
import { SomeTypeFiltersMenu } from './SomeTypeFiltersMenu';
import { SomeTypeButtonsContainerOfActiveFilters } from './SomeTypeButtonsContainerOfActiveFilters';
import { createfiltersTagsForType } from './ActivableFilterTag';

import { setDropdownState, getDropdownState, initDropdownStates } from '../state_managers/dropdownSateManager';

export const DisplayFiltersMenusEvent = 'display-selectable-filters-event';
export const HideFiltersMenusEvent = 'hide-selectable-filters-event';

  /**
   * Creates a manager for a type of filters (e.g. "diets", "cooking-times", etc.).
   * The manager contains a dropdown menu with a search bar and a list of selectable filters.
   * The manager also contains a list of active filters.
   * When the user clicks on the dropdown menu, it toggles the expanded state of the menu,
   * shows/hides the search bar and the list of selectable filters, and updates the tags of the active filters.
   * When the user clicks outside of the dropdown menu, it hides the dropdown menu,
   * the search bar and the list of selectable filters.
   * When the user types in the search bar, it shows/hides the items of the list of selectable filters based on the input value.
   * @param {FilterType} filterType - the type of the filters (e.g. "diets", "cooking-times", etc.)
   * @returns {HTMLElement} The manager element
   */
export function SomeTypeOfFiltersManager(filterType: FilterType) {
  const searchBar = SearchBar("magnifying_glass-gray.svg");
  searchBar.classList.add(
    'hidden',
    'mt-[14px]',
    'mb-[15px]',
    'px-[16px]',
    'h-[36px]',
  );
  const input = searchBar.querySelector('input');
  input?.classList.add('h-full', 'text-[16px]', 'pl-[10px]', 'pr-[36px]', 'border', 'border-gray', 'rounded-[2px]', 'focus:outline-none');

  const searchButton = searchBar.querySelector('button');
  searchButton?.classList.add(
    'right-[25px]',
    'top-[50%]',
    'translate-y-[-50%]',
  );

  const filterList = document.createElement('div');
  filterList.id = `${filterType}-manager`;
  filterList.classList.add('filter-list', 'relative', 'w-[195px]');
  filterList.innerHTML = `
    <aside
      id="${filterType}__dropdown"
      class="absolute z-10 w-[195px] bg-white rounded-[11px] py-[17px] mb-[21px] mr-[66px]"
      aria-expanded="false"
    >
      <header
        class="flex flex-row justify-between items-center text-[16px] text-black px-[16px]"
      >
        <h2 class="">${filterType}</h2>
        <button type="button" class="expandCollapse">
          <img src="icons/chevron.svg" alt="expand button">
        </button>
      </header>
    </aside>
  `;
  
  const header = filterList.querySelector('header');
  header?.insertAdjacentElement('afterend', searchBar);

  const expandCollapse = filterList.querySelector('.expandCollapse');

  // const activeContainer = filterList.querySelector(`#active-${filterType}-container`);
  const dropdownMenu = filterList.querySelector(`#${filterType}__dropdown`);
  const page = document.querySelector('#app') as HTMLElement;

  dropdownMenu?.addEventListener('click', (e: any) => handleClickEventOnDropdownMenu(e));

  page.addEventListener('click', (e: any) => handleClickEventOutOfDropdownMenu(e, page));

  const inputElement = filterList.querySelector('input');
  inputElement?.addEventListener('input', (e: any) => handleInputEvent(e));

 

  /**
   * Handles the click event on the dropdown menu. If the event target is the header of the menu,
   * toggles the expanded state of the menu, shows/hides the search bar and the list of selectable
   * filters, and updates the tags of the active filters.
   * @param {MouseEvent} e - the mouse event
   */
   function handleClickEventOnDropdownMenu(e: any) {
    if (dropdownMenu?.querySelector('header')?.contains(e.target)) {
      if (dropdownMenu?.getAttribute('aria-expanded') === 'false') {
        dropdownMenu.setAttribute('aria-expanded', 'true');
        expandCollapse?.classList.add('rotate-180');
        searchBar.classList.remove('hidden');
        searchBar.classList.add('flex');
        searchBar.querySelector('input')?.focus();
        const selectablefiltersMenu = SomeTypeFiltersMenu(filterType);
        dropdownMenu?.appendChild(selectablefiltersMenu);
        const filters = Recipe.updateSelectableFilters();
        console.log('filters', filters);
        const tags = createfiltersTagsForType(filterType);
        const activeTagsMenu = dropdownMenu.querySelector(`#list-of-active-${filterType}s`) as HTMLUListElement;
        activeTagsMenu.classList.remove('hidden');
        selectablefiltersMenu.classList.remove('hidden');
        selectablefiltersMenu.replaceChildren(...tags);
      } else {
        dropdownMenu.setAttribute('aria-expanded', 'false');
        expandCollapse?.classList.remove('rotate-180');
        searchBar.classList.remove('flex');
        searchBar.classList.add('hidden');
        dropdownMenu?.querySelector(`#list-of-selectable-${filterType}s`)?.remove();
        dropdownMenu?.querySelector(`#list-of-active-${filterType}s`)?.classList.add('hidden');
      }
    }
  }

  /**
   * Handles the click event on the page, outside of the dropdown menu.
   * If the event target is not a descendant of the dropdown menu, hides the dropdown menu,
   * the search bar and the list of selectable filters.
   * @param {MouseEvent} e - the mouse event
   * @param {HTMLElement} page - the page element
   */
  function handleClickEventOutOfDropdownMenu(e: any, page: HTMLElement) {
    if (!dropdownMenu?.contains(e.target)) {
      dropdownMenu?.setAttribute('aria-expanded', 'false');
      expandCollapse?.classList.remove('rotate-180');
      searchBar.classList.remove('flex');
      searchBar.classList.add('hidden');
      const activeFiltersMenu = page.querySelector(`#list-of-active-${filterType}s`);
      activeFiltersMenu?.classList.add('hidden');
      const selectableFiltersMenu = page.querySelector(`#list-of-selectable-${filterType}s`);
      selectableFiltersMenu?.remove();
    }
  }

  /**
   * Handles the input event on the search bar of the dropdown menu. Shows/hides the items
   * of the list of selectable filters based on the input value.
   * @param {InputEvent} e - the input event
   */
  function handleInputEvent(e: any) {
    const items = filterList.querySelectorAll('li');
    for (const item of items) {
      if (item.textContent?.trim().toLowerCase().includes(e.target.value.trim().toLowerCase())) {
        item.classList.remove('hidden');
        item.classList.add('flex');
      } else {
        item.classList.remove('flex');
        item.classList.add('hidden');
      }
    }
  }
  return filterList;
}

  /**
   * Builds a filters type manager element, which is a dropdown menu
   * containing the list of active filters and the list of selectable filters.
   * @param {FilterType} filterType - the type of filters
   * @returns {HTMLElement} the filters type manager element
   */
export function buildFiltersTypeManager(filterType: FilterType) {
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
  filtersManager?.appendChild(activeFiltersButtonsContainer);

  return filtersManager;
}