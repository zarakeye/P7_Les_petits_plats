import { SearchBar } from './SearchBar';
import { createEventAndDispatch } from '../helpers';
import { FilterType, Recipe } from '../modules/recipe';
import { SomeTypeActiveFiltersMenu } from './SomeTypeActiveFiltersMenu';
import { SomeTypeFiltersMenu } from './SomeTypeFiltersMenu';
import { SomeTypeButtonsContainerOfActiveFilters } from './SomeTypeButtonsContainerOfActiveFilters';
import { createTagsOfATypeOfFilters, updateCardsAndFiltersTagsWhenAFilterIsRemoved, updateCardsAndFiltersTagsWhenSomeFilterIsSelected } from './FilterTag';

export const DisplayFiltersMenusEvent = 'display-selectable-filters-event';
export const HideFiltersMenusEvent = 'hide-selectable-filters-event';

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
        class="flex flex-row justify-between items-center text-[16px] text-black px-[16px] font-bold"
      >
        <h2 class="">${filterType}</h2>
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

  // const activeContainer = filterList.querySelector(`#active-${filterType}-container`);
  const dropdownMenu = filterList.querySelector(`#${filterType}__dropdown`);
  const page = document.querySelector('#app') as HTMLElement;

  dropdownMenu?.addEventListener('click', (e: any) => handleClickEventOnDropdownMenu(e));

  page.addEventListener('click', (e: any) => handleClickEventOutOfDropdownMenu(e, page));

  const inputElement = filterList.querySelector('input');
  inputElement?.addEventListener('input', (e: any) => handleInputEvent(e));
 
  /**
   * Handles the click event on the dropdown menu.
   * If the dropdown menu is expanded, it collapses it and hides the search bar, items list and active container.
   * If the dropdown menu is collapsed, it expands it and shows the search bar, items list and active container.
   * It also removes the hidden class from all the active items.
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
        Recipe.updateSelectableFilters();
        const tags = createTagsOfATypeOfFilters(filterType);
        const activeTagsMenu = dropdownMenu.querySelector(`#list-of-active-${filterType}s`) as HTMLUListElement;
        activeTagsMenu.classList.remove('hidden');
        selectablefiltersMenu.replaceChildren(...tags);

        // page.querySelector(`#list-of-active-${filterType}s`)?.classList.remove('hidden');
        createEventAndDispatch(filterList, DisplayFiltersMenusEvent, {filterType: filterType});
      } else {
        dropdownMenu.setAttribute('aria-expanded', 'false');
        expandCollapse?.classList.remove('rotate-180');
        searchBar.classList.remove('flex');
        searchBar.classList.add('hidden');
        dropdownMenu?.querySelector(`#list-of-selectable-${filterType}s`)?.remove();
        dropdownMenu?.querySelector(`#list-of-active-${filterType}s`)?.classList.add('hidden');
        createEventAndDispatch(filterList, HideFiltersMenusEvent, {filterType: filterType});
      }
    } else {
      const page = document.querySelector('#app') as HTMLElement;
      const dropdownMenuInDOM = page.querySelector(`#${filterType}__dropdown`);
      console.log('dropdownMenuInDOM', dropdownMenuInDOM)
      const selectableFiltersMenu = dropdownMenuInDOM?.querySelector(`#list-of-selectable-${filterType}s`);
      console.log('selectableFiltersMenu', selectableFiltersMenu);
      const activeFiltersMenu = dropdownMenuInDOM?.querySelector(`#list-of-active-${filterType}s`);

      /******************* */
      if (selectableFiltersMenu?.contains(e.target)) {
        const tag = e.target;
        const filter = tag.textContent.trim();
        const tagsInDOM = dropdownMenuInDOM?.querySelectorAll('.filter');
        let tagInDOM;
        if (tagsInDOM) {
          tagInDOM = Array.from(tagsInDOM)?.find(tag => tag.textContent === e.target.textContent);
        }
        const textContent = tag.textContent;
        tagInDOM?.classList.add('active');

        const activeFiltersMenu = page.querySelector(`#list-of-active-${filterType}s`);
        Recipe.activeFilters[`${filterType}s`].push(filter);
        if (tagInDOM) {
          activeFiltersMenu?.appendChild(tagInDOM);
          tagInDOM.classList.add('relative', 'text-[14px]', 'text-center', 'bg-yellow');
          tagInDOM.textContent = '';
          tagInDOM.innerHTML = `
            <p
              class="active-item text-[14px] text-black text-left px-[16px] py-[9px] mb-px hover:font-bold"
              aria-label="filtre ${textContent} actif"
            >
              ${textContent}
            </p>
            <div
              class="absolute right-[5px] top-[50%] translate-y-[-50%] w-[17px] h-[17px] hover:bg-black hover:text-yellow rounded-[50%] flex justify-center items-center"
              aria-label="close ${textContent}"
            >
              <img src="icons/close_yellow.svg" alt"close button"class="h-[5px] p-[12px]" aria-hidden="true"></i>
            </button>
          `;


          if (Recipe.matchingRecipes.length === 0) {
            updateCardsAndFiltersTagsWhenSomeFilterIsSelected(Recipe.originalRecipes, filter, filterType, page); 
          } else {
            updateCardsAndFiltersTagsWhenSomeFilterIsSelected(Recipe.matchingRecipes, filter, filterType, page);
          }

          const searchBar = dropdownMenuInDOM?.querySelector('input');
          if (searchBar) searchBar.value = '';
        }
      } else if (activeFiltersMenu?.contains(e.target)) {
        const filter = e.target.textContent.trim();
        const filtersTypes: FilterType[] = ["ingredient", "appliance", "ustensil"];
        updateCardsAndFiltersTagsWhenAFilterIsRemoved(filter, filterType, filtersTypes, page);
        const dropdownMenuInDOM = page.querySelector(`${filterType}__dropdown`);
        console.log('blabla')
        const event = new MouseEvent('click', {
          bubbles: true,
        });
        dropdownMenuInDOM?.querySelector('header')?.dispatchEvent(event);
      }
      /***************************** */
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
      selectableFiltersMenu?.remove();
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