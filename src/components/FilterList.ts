import { Recipe } from '../models/recipe.model';
import { recipeFactory } from '../factory/recipe.factory';
import { SearchBar } from './SearchBar';

export function FilterList(recipes: Recipe[], filterRule: string) {
  let set:any = [];
  let titleRule = '';
  switch (filterRule) {
    case 'ingredients':
      titleRule = 'Ingrédients';
      set = recipeFactory.setOf(recipes, 'ingredients');
      break;

    case 'appliance':
      titleRule = 'Appareil';
      set = recipeFactory.setOf(recipes, 'appliance');
      break;

    case 'ustensils':
      titleRule = 'Ustensiles';
      set = recipeFactory.setOf(recipes, 'ustensils');
      break;
  }

  let itemsList: any = [];
  
  for(const item of set){ 
    itemsList.push(`
      <li
        id="filter-list__item-${item}"
        class="text-[14px] bg-white"
      >
        ${item}
      </li>
    `);
  }

  itemsList = itemsList.join('');

  const searchBar = SearchBar(set);
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

  return filterList;
}