import { Recipe } from '../models/recipe.model';
import { recipeFactory } from '../factory/recipe.factory';
import { SearchBar } from './SearchBar';
// import { toLowerCase } from '../helpers';

export type FilterRule = 'ingredients' | 'appliance' | 'ustensils';

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
  
  for(const element of set) {
    itemsList += `
      <li
        id="filter-list__item-${element}"
        class="text-[14px] bg-white"
      >
        ${element}
      </li>
    `;
  }

  const searchBar = SearchBar();
  searchBar.classList.add(
    'mb-[24px]',
    'w-[163px]',
    'h-[36px]',
    'border',
    'border-[#7A7A7A]',
  );
  const input = searchBar.querySelector('input');
  input?.classList.add('w-full', 'h-full', 'text-[16px]');

  const searchButton = searchBar.querySelector('button');
  searchButton?.classList.add(
    'right-[5px]',
    'top-[50%]',
    'translate-y-[-50%]',
  );

  const filterList = document.createElement('aside');
  filterList.id = `${filterRule}__list`;
  filterList.classList.add(
    'w-[195px]',
    'h-[315px]',
    'bg-white',
    'rounded-[11px]',
    'px-[16px]',
    'py-[17px]',
  );

  filterList.innerHTML = `
    <header
      class="flex flex-row justify-between items-center text-[16px] font-bold mb-[14px]"
    >
      <h2>${titleRule}</h2>
      <button type="button">
        <i class="fa fa-chevron-up" aria-hidden="true"></i>
      </button>
    </header>
    <ul id="${filterRule}__items" class="flex flex-col w-[120px] h-[202px] gap-[13px] overscroll-y-contain overflow-y-auto scrollbar-hide">
      ${itemsList}
    </ul>
  `;

  const header = filterList.querySelector('header');
  header?.insertAdjacentElement('afterend', searchBar);

  const inputElement = filterList.querySelector('input');
  inputElement?.addEventListener('input', (e: any) => {
    const items = filterList.querySelectorAll('li');
    for (const item of items) {
        // if (item.textContent?.toLowerCase().includes(toLowerCase(e.target.value))) {
        if (item.textContent?.toLowerCase().includes(e.target.value.trim().toLowerCase())) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
    }
  });

  return filterList;
}