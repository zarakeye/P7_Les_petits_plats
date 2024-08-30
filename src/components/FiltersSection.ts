import { FilterList, FilterRule } from '../components/FilterList';
import { Recipe } from '../models/recipe.model';

export function FiltersSection(recipes: Recipe[], filterRules: FilterRule[]) {
  let filterLists = [];
  for (const filter of filterRules) {
    filterLists.push(FilterList(recipes, filter));
  }

  const filtersSection = document.createElement('section')
  filtersSection.id = 'filters-section'
  filtersSection.classList.add('relative', 'bg-[#E5E5E5]', 'h-[132px]', 'pt-[21px]', 'px-[108px]')

  filtersSection.innerHTML = `
    <div
      id="filters-list"
      class="absolute z-[1] flex justify-between w-[195px] h-[56px] gap-[66px] left-[104px] text-[#7A7A7A] font-bold"
    >
    </div>
    <p class="font-anton text-[21px] text-right">1500 RECETTES</p>
  `;
  
  const filtersList = filtersSection.querySelector('#filters-list');

  for (let i = 0; i < filterLists.length; i++) {
    filtersList?.appendChild(filterLists[i]);
  }

  return filtersSection
}
