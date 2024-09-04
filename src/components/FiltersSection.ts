import { FilterList, FilterRule } from '../components/FilterList';
import { Recipe } from '../models/recipe.model';

export function FiltersSection(recipes: Recipe[], filterRules: FilterRule[]) {
  let itemsOfSomeGivenRule = [];
  for (const filter of filterRules) {
    itemsOfSomeGivenRule.push(FilterList(recipes, filter));
  }

  const filtersSection = document.createElement('section')
  filtersSection.id = 'filters-section'
  filtersSection.classList.add('relative', 'flex', 'justify-between','bg-light-gray', 'pt-[21px]', 'px-[108px]')

  filtersSection.innerHTML = `
    <div
      id="filter-types"
      class="flex justify-between w-[669px] gap-[66px] left-[104px] text-gray font-bold"
    >
    </div>
    <p class="font-anton text-[21px] pt-[17px]">1500 RECETTES</p>
  `;
  
  const filterTypesContainer = filtersSection.querySelector('#filter-types');

  for (const list of itemsOfSomeGivenRule) {
    filterTypesContainer?.appendChild(list);
  }

  return filtersSection
}
