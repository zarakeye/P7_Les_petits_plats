import { FilterList, FilterRule } from '../components/FilterList.ts'
import { Recipe } from '../models/recipe.model.ts'

export function FiltersSection(recipes: Recipe[], filterRules: FilterRule[]) {
  let filterLists = []
  for (const filterRule of filterRules) {
    filterLists.push(FilterList(recipes, filterRule))
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
  `

  const filtersList = filtersSection.querySelector('#filters-list')

  for (const filter of filterLists) {
    if (!filter) continue
    filtersList?.appendChild(filter)
  }

  return filtersSection
}
