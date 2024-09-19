import { capitalizeFirstLetter } from '../helpers';
import { Recipe, FilterType } from '../modules/recipe';
import { updateRecipesCounter } from './RecipesCounter';
import { FilterButton } from './FilterButton';

// export const SelectFilterEvent = 'select-filter-event';

export function FilterTag(filter: any, type: FilterType) {
  const filterName = String(filter);
  const tag: HTMLLIElement = document.createElement('li');
  tag.classList.add('text-[14px]', 'bg-white', `${type}`, 'filter', 'text-black'); 
  tag.textContent = capitalizeFirstLetter(filterName);

  // tag.addEventListener('click', () => {
  //   createEventAndDispatch(tag, SelectFilterEvent, { filter: filterName });
  // });

  return tag;
}

// export function handleClickOnFilterListItem(event: any, page: HTMLElement) {
//   const filter: string = event.detail.filter;
//   const tag = event.target;
//   const textContent = tag.textContent;
//   tag.classList.toggle('active');

//   const parent = tag.parentElement;
//   // extract filter type from parent id
//   const parentId = parent?.id;
//   const splittedParentId = parentId?.split('-');
//   const filterType =  splittedParentId[splittedParentId.length-1];
//   const realType = filterType.substring(0, filterType.length - 1) as FilterType;

//   const filtersTypesList = ['ingredient', 'appliance', 'ustensil'] as FilterType[];

//   const activeFiltersMenu = page.querySelector(`#list-of-active-${filterType}`);
//   if (tag.classList.contains('active')) {
//     Recipe.activeFilters[filterType].push(filter);
//     activeFiltersMenu?.appendChild(tag);
//     tag.classList.add('relative', 'text-[14px]', 'text-center', 'bg-yellow');
//     tag.textContent = '';
//     tag.innerHTML = `
//       <p
//         class="active-item text-[14px] text-black text-left px-[16px] py-[9px] mb-px hover:font-bold"
//         aria-label="filtre ${textContent} actif"
//       >
//         ${textContent}
//       </p>
//       <div
//         class="absolute right-[5px] top-[50%] translate-y-[-50%] w-[17px] h-[17px] hover:bg-black hover:text-yellow rounded-[50%] flex justify-center items-center"
//         aria-label="close ${textContent}"
//       >
//         <img src="icons/close_yellow.svg" alt"close button"class="h-[5px] p-[12px]" aria-hidden="true"></i>
//       </button>
//     `;


//     if (Recipe.matchingRecipes.length === 0) {
//       updateCardsAndFiltersTagsWhenSomeFilterIsSelected(Recipe.originalRecipes, filter, realType, page);
      
      
//     } else {
//       updateCardsAndFiltersTagsWhenSomeFilterIsSelected(Recipe.matchingRecipes, filter, realType, page);
//     }
//   } else {
//     updateCardsAndFiltersTagsWhenAFilterIsRemoved(filter, realType, filtersTypesList, page);
  
//   }
// }

export function updateCardsAndFiltersTagsWhenSomeFilterIsSelected(recipes: Recipe[], filter: string, type: FilterType, page: HTMLElement) {
  updateRecipesGrid(recipes, type, filter, page);
  updateClickableFiltersMenu(type, page);
  addUnselectFilterButton(filter, type, page);
  updateRecipesCounter(Recipe.matchingRecipes.length, page);
}

export function updateCardsAndFiltersTagsWhenAFilterIsRemoved(filter: string, type: FilterType, filtersTypesList: FilterType[], page: HTMLElement) {
  const activeTagsMenu = page.querySelectorAll(`#list-of-active-${type}s .filter`);
  const tag = Array.from(activeTagsMenu).find(tag => String(tag.querySelector('p')?.textContent?.trim()) === filter.trim()) as HTMLLIElement;
  
  // remove tag from active tags menu, it will be created after updating selectable filters
  tag.remove();



  // remove filter from active ones
  const activeFiltersKey = `${type}s` as keyof typeof Recipe.activeFilters;
  Recipe.activeFilters[activeFiltersKey] = Recipe.activeFilters[activeFiltersKey].filter((activeFilter: string) => activeFilter !== filter);
  
  // Refilter recipes. Matching recipes inited with all recipes.
  // Remove from matchingRecipes any recipe that does not match any of the active filters
  Recipe.matchingRecipes = Recipe.originalRecipes;
  filtersTypesList.forEach((type: FilterType) => {
      Recipe.activeFilters[`${type}s`].forEach((activeFilter: any) => {
        Recipe.filterRecipesWithActivatedFilter(Recipe.matchingRecipes, type, activeFilter);
      })
      const updatedRecipesCards = Recipe.createRecipesCards(Recipe.matchingRecipes);
      const recipesGrid = page.querySelector('#recipes-grid');
      recipesGrid?.replaceChildren(...updatedRecipesCards);
  });

  let newFiltersTags = createTagsOfATypeOfFilters(type);
  const clickableFitersMenu = page.querySelector(`#list-of-selectable-${type}s`);
  clickableFitersMenu?.replaceChildren(...newFiltersTags);

  const clearButons = page.querySelectorAll(`.current-${type}`);
  Array.from(clearButons).find(button => String(button.textContent?.trim()) === filter.trim())?.parentElement?.remove();

  updateRecipesCounter(Recipe.matchingRecipes.length, page);
}

export function createTagsOfATypeOfFilters(type: FilterType): HTMLLIElement[] {
  const key = `${type}s`;

  let filtersOfType: string[] = [];
  if (Recipe.selectableFilters[key]) {
    filtersOfType = (Recipe.selectableFilters as any)[key];
  }
  console.log('typeof filtersOfType', typeof filtersOfType);
  return filtersOfType.map((filter: string) => FilterTag(filter, type));
}

function updateRecipesGrid(recipes: Recipe[], type: FilterType, filter: string, page: HTMLElement) {
  Recipe.filterRecipesWithActivatedFilter(recipes, type, filter);
  const updatedRecipesCards = Recipe.createRecipesCards(Recipe.matchingRecipes);
  const recipesGrid = page.querySelector('#recipes-grid');
  recipesGrid?.replaceChildren(...updatedRecipesCards);
}

function updateClickableFiltersMenu(type: FilterType, page: HTMLElement) {
  Recipe.updateSelectableFilters();
  let newFiltersTags = createTagsOfATypeOfFilters(type);
    
  const clickableFitersMenu = page.querySelector(`#list-of-selectable-${type}s`);
  clickableFitersMenu?.replaceChildren(...newFiltersTags);
}

function addUnselectFilterButton(filter: string, type: FilterType, page: HTMLElement) {
  const buttonsContainer = page.querySelector(`#active-${type}s-clear-buttons_container`);
  const unselectFilterButton = FilterButton(filter, type);
  buttonsContainer?.appendChild(unselectFilterButton);
}