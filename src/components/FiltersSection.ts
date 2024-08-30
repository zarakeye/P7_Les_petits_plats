import { FilterList, FilterRule } from '../components/FilterList';
import { Recipe } from '../models/recipe.model';

export function FiltersSection(recipes: Recipe[], filterRules: FilterRule[]) {
  let itemsOfSomeGivenRule = [];
  for (const filter of filterRules) {
    itemsOfSomeGivenRule.push(FilterList(recipes, filter));
  }

  const filtersSection = document.createElement('section')
  filtersSection.id = 'filters-section'
  filtersSection.classList.add('relative', 'bg-[#E5E5E5]', 'h-[132px]', 'pt-[21px]', 'px-[108px]')

  filtersSection.innerHTML = `
    <div
      id="filter-types"
      class="absolute z-[1] flex justify-between w-[195px] h-[56px] gap-[66px] left-[104px] text-[#7A7A7A] font-bold"
    >
    </div>
    <p class="font-anton text-[21px] text-right">1500 RECETTES</p>
  `;
  
  const filterTypesContainer = filtersSection.querySelector('#filter-types');

  for (const list of itemsOfSomeGivenRule) {
    filterTypesContainer?.appendChild(list);
  }

  return filtersSection
}
