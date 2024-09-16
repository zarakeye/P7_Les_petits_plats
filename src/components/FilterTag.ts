import { createEventAndDispatch } from '../helpers';
import { capitalizeFirstLetter, introSort } from '../helpers';
import { Recipe, FilterType } from '../modules/recipe';
import { updateRecipesCounter } from './RecipesCounter';

export const SelectFilterEvent = 'select-filter-event';

export function FilterTag(filter: any, type: FilterType) {
  const filterName = String(filter);
  const filterTag: HTMLLIElement = document.createElement('li');
  filterTag.classList.add('text-[14px]', 'bg-white', `${type}`, 'filter'); 
  filterTag.textContent = capitalizeFirstLetter(filterName);

  filterTag.addEventListener('click', () => {
    createEventAndDispatch(filterTag, SelectFilterEvent, { filter: filterName });
  });

  return filterTag;
}

export function handleClickOnFilterListItem(event: any, page: HTMLElement) {
  const filter: string = event.detail.filter;
  const filterTag = event.target;
  const textContent = filterTag.textContent;
  filterTag.classList.toggle('active');

  const parent = filterTag.parentElement;
  // extract filter type from parent id
  const parentId = parent?.id;
  const splittedParentId = parentId?.split('-');
  const filterType =  splittedParentId[splittedParentId.length-1];
  const realType = filterType.substring(0, filterType.length - 1) as FilterType;

  const filtersTypesList = ['ingredient', 'appliance', 'ustensil'] as FilterType[];

  const activeFiltersMenu = page.querySelector(`#list-of-active-${filterType}`);
  if (filterTag.classList.contains('active')) {
    Recipe.activeFilters[filterType].push(filter);
    activeFiltersMenu?.appendChild(filterTag);
    filterTag.classList.add('relative', 'text-[14px]', 'text-center', 'bg-yellow', 'text-gray');
    filterTag.textContent = '';
    filterTag.innerHTML = `
      <p
        class="active-item text-[14px] text-left px-[16px] py-[9px] mb-px"
        aria-label="filtre ${textContent} actif"
      >
        ${textContent}
      </p>
      <button
        type="button"
        class="absolute right-[5px] top-[50%] translate-y-[-50%]"
        aria-label="close ${textContent}"
      >
        <i class="fa fa-times" aria-hidden="true"></i>
      </button>
    `;

    if (Recipe.matchingRecipes.length === 0) {
      updateCardsAndFiltersTagsWhenSomeFilterIsSelected(Recipe.originalRecipes, filter, realType, filtersTypesList, page);
      // console.log('page: ', page);
      // const recipesCounter = page.querySelector('#recipes-counter');
      // console.log('recipesCounter: ', recipesCounter);
      // if (recipesCounter) {
      //   recipesCounter.textContent = `${Recipe.matchingRecipes.length} RECETTES`;
      // }
      
    } else {
      updateCardsAndFiltersTagsWhenSomeFilterIsSelected(Recipe.matchingRecipes, filter, realType, filtersTypesList, page);
      // const recipesCounter = page.querySelector('#recipes-counter');
      // console.log('recipesCounter: ', recipesCounter);
      // if (recipesCounter) {
      //   recipesCounter.textContent = `${Recipe.matchingRecipes.length} RECETTES`;
      // }
    }
  } else {
    // remove filter tag from active filters menu and add it to selectable filters menu
    filterTag.innerHTML = textContent;
    filterTag.classList.remove('relative', 'text-[14px]', 'text-center', 'bg-yellow', 'text-gray');
    page.querySelector(`#list-of-selectable-${filterType}`)?.appendChild(filterTag);

    // remove filter from active filters
    Recipe.activeFilters[filterType] = Recipe.activeFilters[filterType].filter((activeFilter: string) => activeFilter !== filter);
    console.log('Recipe.activeFilters[filterType]: ', Recipe.activeFilters[filterType]);
    
    // refilter recipes. Matching repcipes initially must contains all recipes.
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

    // update possible filters
    let updatedFilters = Recipe.extractFilters(Recipe.matchingRecipes, filtersTypesList);

    // remove from updatedFilters any filter present in the active filters
    filtersTypesList.forEach((type: FilterType) => {
      if (Recipe.activeFilters[`${type}s`].length !== 0) {
        updatedFilters[`${type}s`] = updatedFilters[`${type}s`].filter((filter: any) => !Recipe.activeFilters[`${type}s`].includes(filter));
      }
    })

    Object.keys(updatedFilters).forEach((key: string) => {
      updatedFilters[key] = [...introSort(updatedFilters[key])];
    });

    // create new filters tags
    let newFiltersTags = Recipe.createFiltersTags(updatedFilters);
    filtersTypesList.forEach((type: FilterType) => {
      const clickableFitersMenu = page.querySelector(`#list-of-selectable-${type}s`);
      clickableFitersMenu?.replaceChildren(...newFiltersTags[`${type}s`]);
    });

    console.log('Recipe.matchingRecipes', Recipe.matchingRecipes);
    updateRecipesCounter(Recipe.matchingRecipes.length, page);
  }
}

function updateCardsAndFiltersTagsWhenSomeFilterIsSelected(recipes: Recipe[], filter: string, type: FilterType, filtersTypesList: FilterType[], page: HTMLElement) {
  Recipe.filterRecipesWithActivatedFilter(recipes, type, filter);
  const updatedRecipesCards = Recipe.createRecipesCards(Recipe.matchingRecipes);
  const recipesGrid = page.querySelector('#recipes-grid');
  recipesGrid?.replaceChildren(...updatedRecipesCards);
  let updatedFilters = Recipe.extractFilters(Recipe.matchingRecipes, filtersTypesList);

  filtersTypesList.forEach((type: FilterType) => {
    if (Recipe.activeFilters[`${type}s`].length !== 0) {
      updatedFilters[`${type}s`] = updatedFilters[`${type}s`].filter((filter: any) => !Recipe.activeFilters[`${type}s`].includes(filter));
    }
  });

  Object.keys(updatedFilters).forEach((key) => {
    updatedFilters[key] = [...introSort(updatedFilters[key])];
  });
  
  let newFiltersTags = Recipe.createFiltersTags(updatedFilters);
    
  filtersTypesList.forEach((type: FilterType) => {
    const clickableFitersMenu = page.querySelector(`#list-of-selectable-${type}s`);
    clickableFitersMenu?.replaceChildren(...newFiltersTags[`${type}s`]);
  });

  updateRecipesCounter(Recipe.matchingRecipes.length, page);
}
