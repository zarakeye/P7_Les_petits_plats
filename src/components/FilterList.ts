import { Recipe } from '../models/recipe.model';
import { recipeFactory } from '../factory/recipe.factory';
import { SearchBar } from './SearchBar';
import { createEventAndDispatch } from '../helpers';

export type FilterRule = 'ingredients' | 'appliance' | 'ustensils';
export const FilterEvent = 'filter-event';
export const CancelFilterEvent = 'cancel-filter-event';

export function FilterList(recipes: Recipe[], filterRule: FilterRule) {
  let titleRule = '';
  switch (filterRule) {
    case 'ingredients':
      titleRule = 'Ingrédients';
      break;

    case 'appliance':
      titleRule = 'Appareil';
      break;

    case 'ustensils':
      titleRule = 'Ustensiles';
      break;
  }

  let set = recipeFactory.setOf(recipes, filterRule);

  let itemsList: string = '';

  let setCounter = 0;
  // for (const element of set) {
  //   itemsList += `
  //     <li
  //       id="${filterRule}-${setCounter}"
  //       class="${filterRule} text-[14px] bg-white"
  //     >
  //       ${element}
  //     </li>
  //   `;

  //   setCounter++;
  // }
  set.forEach(element => {
    itemsList += `
      <li
        id="${filterRule}-${setCounter}"
        class="${filterRule} text-[14px] bg-white"
      >
        ${element}
      </li>
    `;
    setCounter++;
  });

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
  filterList.classList.add('filter-list', 'relative', 'w-[195px]');
  filterList.innerHTML = `
    <aside
      id="${filterRule}__dropdown"
      class="absolute z-10 w-[195px] bg-white rounded-[11px] py-[17px] mb-[21px] mr-[66px]"
      aria-expanded="false"
    >
      <header
        class="flex flex-row justify-between items-center text-[16px] px-[16px] font-bold"
      >
        <h2>${titleRule}</h2>
        <button type="button" class="expandCollapse">
          <i class="fa fa-chevron-up" aria-hidden="true"></i>
        </button>
      </header>
      <div id="active-${filterRule}-container"></div>
      <ul id="${filterRule}__items" class="hidden flex-col h-[202px] gap-[13px] px-[16px] overscroll-y-contain overflow-y-auto scrollbar-hide">
        ${itemsList}
      </ul>
    </aside>
    <div id="current-${filterRule}-container"></div>
  `;

  const header = filterList.querySelector('header');
  header?.insertAdjacentElement('afterend', searchBar);

  const expandCollapse = filterList.querySelector('.expandCollapse');
  const itemsUL = filterList.querySelector(`#${filterRule}__items`);
  const activeContainer = filterList.querySelector(`#active-${filterRule}-container`);
  const activeItems = filterList.querySelectorAll(`active-${filterRule}`);
  const currentContainer = filterList.querySelector(`#current-${filterRule}-container`);
  const dropdownMenu = filterList.querySelector(`#${filterRule}__dropdown`);

  dropdownMenu?.addEventListener('click', (e: any) => {
    if (dropdownMenu.getAttribute('aria-expanded') === 'false') {
      dropdownMenu.setAttribute('aria-expanded', 'true');
      expandCollapse?.classList.add('rotate-180');
      searchBar.classList.remove('hidden');
      searchBar.classList.add('flex');
      searchBar.querySelector('input')?.focus();
      itemsUL?.classList.remove('hidden');
      itemsUL?.classList.add('flex');
      activeContainer?.classList.remove('hidden');
      if (activeItems) {
        // for (const active of activeItems) {
        //   active?.classList.remove('hidden');
        // }
        activeItems.forEach(active => {
          active?.classList.remove('hidden');
        });
      }
    } else {
      if (dropdownMenu.querySelector('header')?.contains(e.target)) {
        dropdownMenu.setAttribute('aria-expanded', 'false');
        expandCollapse?.classList.remove('rotate-180');
        searchBar.classList.remove('flex');
        searchBar.classList.add('hidden');
        itemsUL?.classList.remove('flex');
        itemsUL?.classList.add('hidden');
        activeContainer?.classList.add('hidden');
      }
    }
  });

  document.addEventListener('click', (e: any) => {
    if (!dropdownMenu?.contains(e.target)) {
      dropdownMenu?.setAttribute('aria-expanded', 'false');
      expandCollapse?.classList.remove('rotate-180');
      searchBar.classList.remove('flex');
      searchBar.classList.add('hidden');
      itemsUL?.classList.remove('flex');
      itemsUL?.classList.add('hidden');
    }
  });

  const inputElement = filterList.querySelector('input');
  inputElement?.addEventListener('input', (e: any) => {
    const items = filterList.querySelectorAll('li');
    // for (const item of items) {
    //   if (item.textContent?.trim().toLowerCase().includes(e.target.value.trim().toLowerCase())) {
    //     item.classList.remove('hidden');
    //     item.classList.add('flex');
    //   } else {
    //     item.classList.remove('flex');
    //     item.classList.add('hidden');
    //   }
    // }
    items.forEach(item => {
      if (item.textContent?.trim().toLowerCase().includes(e.target.value.trim().toLowerCase())) {
        item.classList.remove('hidden');
        item.classList.add('flex');
      } else {
        item.classList.remove('flex');
        item.classList.add('hidden');
      }
    });
  });

  // Add click event listener to each list item
  const items = filterList.querySelectorAll(`.${filterRule}`) as NodeListOf<HTMLLIElement>;
  // for (const item of items) {
  items.forEach(item => {
    item.addEventListener('click', () => {
      if (item.textContent === null) {
        item.textContent = '';
      }
      
      const matchingRecipes = recipeFactory.filterRecipes(recipes, item.textContent);
      createEventAndDispatch(filterList, FilterEvent, {recipesBasedOn: recipes, matchingRecipes: matchingRecipes, filter: item.textContent});

      searchBar.classList.remove('mb-[24px]');
      searchBar.classList.add('mb-[15px]');
      itemsUL?.classList.add('mt-[20px]');
      
      const activeItem = document.createElement('div');
      activeItem.id = `${item.id}-active`;
      activeItem.classList.add(`active-${filterRule}`, 'relative', 'text-[14px]', 'text-center', 'bg-yellow', 'text-gray');
      activeItem.innerHTML = `
        <p
          class="active-item text-[14px] text-left px-[16px] py-[9px] mb-px"
          aria-label="filtre ${item.textContent} actif"
        >
          ${item.textContent}
        </p>
        <button
          type="button"
          class="absolute right-[5px] top-[50%] translate-y-[-50%]"
          aria-label="close ${item.textContent}"
        >
          <i class="fa fa-times" aria-hidden="true"></i>
        </button>
      `;
      activeContainer?.appendChild(activeItem);

      item.classList.add('hidden');

      const filterButton = document.createElement('button');
      filterButton.id = `${item.id}-current`;
      filterButton.classList.add(`current-${filterRule}`, 'z-0', 'active', 'text-[14px]', 'text-center', 'bg-yellow', 'text-gray', 'rounded-[10px]', 'px-[18px]', 'py-[17px]', 'mr-[5px]','mb-[21px]', 'first:mt-[79px]');
      filterButton.textContent = item.textContent;
      currentContainer?.appendChild(filterButton);

      //---------------
      activeItem.addEventListener('click', (e) => {
        item.classList.remove('hidden');
        activeItem.remove();
        filterButton.remove();
        if (activeItems.length === 0) {
          searchBar.classList.remove('mb-[15px]');
          searchBar.classList.add('mb-[24px]');
          itemsUL?.classList.remove('mt-[20px]');
        }

        const activeItemsContents = filterList.querySelectorAll(`.active-item`);
        // const activeFiltersRemaining: string[] = [];
        // for (const active of activeItemsContents) {
        //   if (active !== e.target && active.textContent !== null) {
        //     activeFiltersRemaining.push(active.textContent.trim());
        //   }
        // }
        const activeFiltersRemaining = Array.from(activeItemsContents)
          .filter(active => active !== e.target)
          .map(active => active.textContent?.trim());

        createEventAndDispatch(filterList, CancelFilterEvent, {activeFiltersRemaining: activeFiltersRemaining});
      });

      filterButton.addEventListener('click', (e) => {
        item.classList.remove('hidden');
        activeItem.remove();
        filterButton.remove();
        if (activeItems.length === 0) {
          searchBar.classList.remove('mb-[15px]');
          searchBar.classList.add('mb-[24px]');
          itemsUL?.classList.remove('mt-[20px]');
        }

        const activeFiltersButtons = filterList.querySelectorAll(`.current-${filterRule}`);
        // const activeFiltersRemaining: string[] = [];
        // for (const active of activeFiltersButtons) {
        //   if (active !== e.target && active.textContent !== null) {
        //     activeFiltersRemaining.push(active.textContent.trim());
        //   }
        // }

        const activeFiltersRemaining = Array.from(activeFiltersButtons)
          .filter(active => active !== e.target)
          .map(active => active.textContent?.trim());

        createEventAndDispatch(filterList, CancelFilterEvent, {activeFiltersRemaining: activeFiltersRemaining});
      });

      const activeItems = filterList.querySelectorAll(`.active-${filterRule}`) as NodeListOf<HTMLLIElement>;
      dropdownMenu?.addEventListener('click', () => {
        if (dropdownMenu.getAttribute('aria-expanded') === 'true') {
          if (activeItems.length!== 0) {
            // for (const active of activeItems) {
            //   active?.classList.remove('hidden');
            // }
            activeItems.forEach(active => active?.classList.remove('hidden'));
          }           
        } else {
          // for (const active of activeItems) {
          //   active?.classList.add('hidden');
          // }
          activeItems.forEach(active => active?.classList.add('hidden'));
        }
      });

      document.addEventListener('click', (e: any) => {
        if (!dropdownMenu?.contains(e.target)) {
          activeItem.classList.add('hidden');
        }
      });
    });
  // }
  });
  return filterList;
}