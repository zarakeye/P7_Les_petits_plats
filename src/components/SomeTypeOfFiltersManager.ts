import { SearchBar } from './SearchBar';
import { createEventAndDispatch } from '../helpers';
import { FilterEvent, UnactivateFilterEvent } from './SomeTypeFiltersMenu';
import { FilterType } from '../modules/recipe';

export const DisplayFiltersMenusEvent = 'display-selectable-filters-event';
export const HideFiltersMenusEvent = 'hide-selectable-filters-event';
export const UpdateSelectableFiltersEvent = 'update-selectable-filters-event';

export function SomeTypeOfFiltersManager(filterType: FilterType) {
  const searchBar = SearchBar();
  searchBar.classList.add(
    'hidden',
    'mt-[14px]',
    'mb-[24px]',
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
        class="flex flex-row justify-between items-center text-[16px] px-[16px] font-bold"
      >
        <h2>${filterType}</h2>
        <button type="button" class="expandCollapse">
          <i class="fa fa-chevron-up" aria-hidden="true"></i>
        </button>
      </header>
      <!-- //TODO:Insert active filters menu of ${filterType} : SomeTypeActiveFiltersMenu -->
      <!-- //TODO:Insert selectable filters menu of ${filterType} : SomeTypeFiltersMenu -->
    </aside>
    <!-- //TODO:Insert container of active filters of ${filterType} : SomeTypeButtonsContainerOfActiveFilters -->
  `;
  
  const header = filterList.querySelector('header');
  header?.insertAdjacentElement('afterend', searchBar);

  const expandCollapse = filterList.querySelector('.expandCollapse');
  const itemsUL = filterList.querySelector(`#${filterType}__items`);

  // const activeContainer = filterList.querySelector(`#active-${filterType}-container`);
  const activeItems = filterList.querySelectorAll(`active-${filterType}`);
  const currentContainer = filterList.querySelector(`#current-${filterType}-container`);
  const dropdownMenu = filterList.querySelector(`#${filterType}__dropdown`);
  const page = document.querySelector('#app') as HTMLElement;

  dropdownMenu?.addEventListener('click', (e: any) => handleClickEventOnDropdownMenu(e, page));

  page.addEventListener('click', (e: any) => handleClickEventOutOfDropdownMenu(e, page));

  const inputElement = filterList.querySelector('input');
  inputElement?.addEventListener('input', (e: any) => handleInputEvent(e));
  const menu: HTMLUListElement | null = filterList.querySelector(`#${filterType}__items`);
  filterList.addEventListener(FilterEvent, (e: any) => ActivateFilterByClickingOnItInList(e));

  function ActivateFilterByClickingOnItInList(e: any) {
    const filterName: string = e.detail.filter;
    searchBar.reset();
    searchBar.classList.remove('mb-[24px]');
    searchBar.classList.add('mb-[15px]');
    // menu?.classList.add('mt-[20px]');
    // menu?.classList.remove('hidden');
    
    const activeItem = document.createElement('div');
    activeItem.classList.add(`active-${filterType}`, 'relative', 'text-[14px]', 'text-center', 'bg-yellow', 'text-gray');
    activeItem.innerHTML = `
      <p
        class="active-item text-[14px] text-left px-[16px] py-[9px] mb-px"
        aria-label="filtre ${filterName} actif"
      >
        ${filterName}
      </p>
      <button
        type="button"
        class="absolute right-[5px] top-[50%] translate-y-[-50%]"
        aria-label="close ${filterName}"
      >
        <i class="fa fa-times" aria-hidden="true"></i>
      </button>
    `;
    // activeContainer?.appendChild(activeItem);

    const filterButton = document.createElement('button');
    filterButton.classList.add(`current-${filterType}`, 'z-0', 'active', 'text-[14px]', 'text-center', 'bg-yellow', 'text-gray', 'rounded-[10px]', 'px-[18px]', 'py-[17px]', 'mr-[5px]','mb-[21px]', 'first:mt-[79px]');
    filterButton.textContent = filterName;
    currentContainer?.appendChild(filterButton);



    activeItem.addEventListener('click', (e) => cancelActiveFilterInDropdownMenu(e, filterName, activeItem, filterButton));

    filterButton.addEventListener('click', (e) => cancelActiveFilterByClickingOnFilterButton(e, filterName, activeItem, filterButton));

    const activeItems = filterList.querySelectorAll(`.active-${filterType}`) as NodeListOf<HTMLLIElement>;
    dropdownMenu?.addEventListener('click', () => handleClickEventOnDropdownMenuWhenSomeFiltersMayBeActive(dropdownMenu, activeItems));

    page.addEventListener('click', (e: any) => handleClickEventOutOfDropdownMenuWhenSomeFiltersMayBeActive(e, activeItem));
  }

  function handleClickEventOutOfDropdownMenuWhenSomeFiltersMayBeActive(e: any, activeItem: HTMLDivElement) {
    if (!dropdownMenu?.contains(e.target)) {
      activeItem.classList.add('hidden');
    }
  }

  function handleClickEventOnDropdownMenuWhenSomeFiltersMayBeActive(dropdownMenu: Element, activeItems: NodeListOf<HTMLLIElement>) {
    if (dropdownMenu.getAttribute('aria-expanded') === 'true') {
      if (activeItems.length!== 0) {
        for (const active of activeItems) {
          active?.classList.remove('hidden');
        } 
      }           
    } else {
      for (const active of activeItems) {
        active?.classList.add('hidden');
      }
    }
  }

  function cancelActiveFilterByClickingOnFilterButton(e: any, activeFilter: string, activeItem: HTMLDivElement, filterButton: HTMLButtonElement) {
    activeItem.remove();
    filterButton.remove();
    if (activeItems.length === 0) {
      searchBar.classList.remove('mb-[15px]');
      searchBar.classList.add('mb-[24px]');
      itemsUL?.classList.remove('mt-[20px]');
    }

    const activeFiltersButtons = filterList.querySelectorAll(`.current-${filterType}`);
    const activeFiltersRemaining: string[] = [];
    for (const active of activeFiltersButtons) {
      if (active !== e.target && active.textContent !== null) {
        activeFiltersRemaining.push(active.textContent.trim());
      }
    }
    createEventAndDispatch(filterList, UnactivateFilterEvent, {unactiveFilter: activeFilter});
  }

  function cancelActiveFilterInDropdownMenu(e: any, activeFilter: string, activeItem: HTMLDivElement, filterButton: HTMLButtonElement) {
    activeItem.remove();
    filterButton.remove();
    if (activeItems.length === 0) {
      searchBar.classList.remove('mb-[15px]');
      searchBar.classList.add('mb-[24px]');
      menu?.classList.remove('mt-[20px]');
    }

    const activeItemsContents = filterList.querySelectorAll(`.active-item`);
    const activeFiltersRemaining: string[] = [];
    for (const active of activeItemsContents) {
      if (active !== e.target && active.textContent !== null) {
        activeFiltersRemaining.push(active.textContent.trim());
      }
    }

    createEventAndDispatch(filterList, UnactivateFilterEvent, {unactiveFilter: activeFilter, activeFiltersRemaining: activeFiltersRemaining});
  }

  /**
   * Handles the click event on the dropdown menu.
   * If the dropdown menu is expanded, it collapses it and hides the search bar, items list and active container.
   * If the dropdown menu is collapsed, it expands it and shows the search bar, items list and active container.
   * It also removes the hidden class from all the active items.
   */
   function handleClickEventOnDropdownMenu(e: any, page: HTMLElement) {
    if (dropdownMenu?.getAttribute('aria-expanded') === 'false') {
      dropdownMenu.setAttribute('aria-expanded', 'true');
      expandCollapse?.classList.add('rotate-180');
      searchBar.classList.remove('hidden');
      searchBar.classList.add('flex');
      searchBar.querySelector('input')?.focus();
      page.querySelector(`#list-of-active-${filterType}s`)?.classList.remove('hidden');
      createEventAndDispatch(filterList, DisplayFiltersMenusEvent, {filterType: filterType});
    } else {
      if (dropdownMenu?.querySelector('header')?.contains(e.target)) {
        dropdownMenu.setAttribute('aria-expanded', 'false');
        expandCollapse?.classList.remove('rotate-180');
        searchBar.classList.remove('flex');
        searchBar.classList.add('hidden');
        page.querySelector(`#list-of-active-${filterType}s`)?.classList.add('hidden');
        createEventAndDispatch(filterList, HideFiltersMenusEvent, {filterType: filterType});
      }
    }
  }

  function handleClickEventOutOfDropdownMenu(e: any, page: HTMLElement) {
    if (!dropdownMenu?.contains(e.target)) {
      dropdownMenu?.setAttribute('aria-expanded', 'false');
      expandCollapse?.classList.remove('rotate-180');
      searchBar.classList.remove('flex');
      searchBar.classList.add('hidden');
      const activeFiltersMenu = page.querySelector(`#list-of-active-${filterType}s`);
      activeFiltersMenu?.classList.add('hidden');
      const selectableFiltersMenu = page.querySelector(`#list-of-selectable-${filterType}s`);
      selectableFiltersMenu?.classList.add('hidden');
    }
  }

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