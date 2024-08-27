import { Recipe } from '../models/recipe.model';
import { recipeFactory } from '../factory/recipe.factory';

export function FilterList(recipes: Recipe[], filterRule: string) {
  let set:any = [];

  switch (filterRule) {
    case 'ingredients':
      filterRule = 'Ingrédients';
      set = recipeFactory.setOf(recipes, 'ingredients');
      break;

    case 'appliance':
      filterRule = 'Appareil';
      set = recipeFactory.setOf(recipes, 'appliance');
      break;

    case 'ustensils':
      filterRule = 'Ustensiles';
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

  const filterList = document.createElement('aside');
  filterList.id = 'filter-list';
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
      <h2>${filterRule}</h2>
      <button type="button">
        <i class="fa fa-chevron-up" aria-hidden="true"></i>
      </button>
    </header>
    <input
      type="text"
      class="w-[163px] h-[36px] border border-[#7A7A7A] mb-[24px]"
      name="filter-list__item-1"
      id="filter-list__item-1"
    >
    <ul class="flex flex-col justify-between w-[120px] h-[202px] gap-[13px] overscroll-y-contain overflow-y-auto scrollbar-hide">
      ${itemsList}
    </ul>
  `;

  return filterList;
}