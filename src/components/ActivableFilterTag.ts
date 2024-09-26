import { capitalizeFirstLetter } from '../helpers';
import { Recipe, FilterType, RecipeType } from '../modules/recipe';
import { FilterButton } from './FilterButton';
import { createRecipesCards } from './RecipeCard';
import { } from './SomeTypeOfFiltersManager';
import { updateRecipesCounter } from './RecipesCounter';

/**
 * Creates an activable filter tag. The tag is an HTML list item element with text
 * content of the filter name capitalized. The tag is a child of the activable
 * filters menu and when clicked, it calls the handleClickOnFilter function.
 * @param {any} filter - the filter name
 * @param {FilterType} type - the type of the filter
 * @returns {HTMLLIElement} the activable filter tag
 */
export function ActivableFilterTag(filter: any, type: FilterType): HTMLLIElement {
  const filterName = String(filter);
  const tag: HTMLLIElement = document.createElement('li');
  tag.classList.add('block', 'text-[14px]', 'bg-white', `${type}`, 'filter', 'text-black', 'mt-[13px]'); 
  tag.textContent = capitalizeFirstLetter(filterName);

  tag.addEventListener('click', (e: any) => handleClickOnFilter(e, type));


  return tag;
}

/**
 * Handles a click event on an activable filter tag.
 * If the clicked tag is part of the activable filters menu,
 * it activates the filter and updates the active filters menu and the recipes grid.
 * If the clicked tag is part of the active filters menu,
 * it deactivates the filter and updates the active filters menu and the recipes grid.
 * @param {any} e - the click event
 * @param {FilterType} type - the type of the filter
 * @returns {void}
/******  a1c34025-3c09-4101-843e-4b72d878a529  *******/
export function handleClickOnFilter(e: any, type: FilterType): void {
  const activableFiltersMenu = document.querySelector(`#list-of-selectable-${type}s`) as HTMLUListElement;
  const activeFiltersMenu = document.querySelector(`#list-of-active-${type}s`) as HTMLUListElement;

  const filter = e.target.textContent;
  const tag = e.target;

  // Filter logic
  const { matchingRecipes, filtersOfType } = Recipe.getMatchingRecipesAndFiltersOfTypeAfterFilterActivation(filter, type);

  if (activableFiltersMenu?.contains(tag)) { // When the user activates a filter
    handleFilterActivation(tag, filter, type, matchingRecipes, filtersOfType);
  } else if (activeFiltersMenu?.contains(e.target)) { // When the user deactivates a filter
    handleFilterDeactivation(filter, type);
  }
}

/**
 * Creates an array of activable filter tags for a given type of filters.
 * @param {FilterType} type - the type of the filters
 * @returns {HTMLLIElement[]} the array of activable filter tags
 */
export function createfiltersTagsForType(type: FilterType): HTMLLIElement[] {
  const filtersOfType = Recipe.filtersOfType(type);
  return filtersOfType.map((filter: string) => ActivableFilterTag(filter, type));
}

/**
 * Updates the recipes grid content with the given recipes.
 * It first removes any existing recipe cards from the grid,
 * then creates new cards for the given recipes and appends them to the grid.
 * @param {RecipeType[]} recipes - the recipes to be displayed in the grid
 * @returns {void}
 */
export function updateRecipesGridContent(recipes: RecipeType[]): void {
  const updatedRecipesCards = createRecipesCards(recipes);
  const recipesGrid = document.querySelector('#recipes-grid');
  const recipesTags = recipesGrid?.querySelectorAll('.recipe');
  recipesTags?.forEach(tag => {
    recipesGrid?.removeChild(tag);
  })

  updatedRecipesCards.forEach((card: HTMLLIElement) => {
    recipesGrid?.appendChild(card);
  })
}


/**
 * Adds a button to the unselect filter buttons container
 * that removes a filter of the given type when clicked.
 * @param {string} filter - the name of the filter
 * @param {FilterType} type - the type of the filter
 */
export function addUnselectFilterButton(filter: string, type: FilterType) {
  const buttonsContainer = document.querySelector(`#active-filters-unselect-buttons_container`);
  const unselectFilterButton = FilterButton(filter, type);
  buttonsContainer?.appendChild(unselectFilterButton);
}

/**
 * Removes the button to unselect a filter from the unselect filter buttons container.
 * The button is found by its text content, which should be the name of the filter.
 * @param {string} filter - the name of the filter of which to remove the unselect button
 * @returns {void}
 */
export function removeUnselectFilterButton(filter: string): void {
  const unselectButtons = document.querySelectorAll(`.unselect-filter-button`);
  const unselectButton = Array.from(unselectButtons).find((button: any) => button.textContent.trim() === filter.trim());
  unselectButton?.parentElement?.remove();
}

/**
 * Erases the user's input in the search bar of the given type of filters.
 * @param {FilterType} type - the type of the filters
 * @returns {void}
 */
export function eraseUserInput(type: FilterType): void {
  const dropdownMenu = document.querySelector(`#${type}__dropdown`);
  const searchBar = dropdownMenu?.querySelector('input');
  if (searchBar) searchBar.value = '';
}

/**
 * Updates the menu of activable filters of the given type with the given filters.
 * It does this by replacing the children of the menu with new tags representing the given filters.
 * @param {FilterType} type - the type of the filters
 * @param {string[]} filtersOfType - the filters to be represented in the menu
 * @returns {void}
 */
export function updateActivableFiltersMenu(type: FilterType, filtersOfType: string[]): void {
  const selectableTagsMenu: HTMLUListElement | null = document.querySelector(`#list-of-selectable-${type}s`);
  const newFiltersTags: HTMLLIElement[] = [];
  filtersOfType.forEach((filter: any) => {
    newFiltersTags.push(ActivableFilterTag(filter, type));
  });

  selectableTagsMenu?.replaceChildren(...newFiltersTags);
}

/**
 * Removes the tag of a deactivated filter from the menu of active filters of the given type.
 * It does this by finding the tag in the menu of active filters and removing it from the menu.
 * @param {string} filter - the name of the deactivated filter
 * @param {FilterType} type - the type of the filters
 * @returns {void}
 */
export function removeTagOfDeactivatedFilter(filter: string, type: FilterType): void {
  let activeTags  = document.querySelectorAll(`#list-of-active-${type}s .active`);
  const tag = Array.from(activeTags).find(tag => String(tag.querySelector('p')?.textContent?.trim()) === filter.trim()) as HTMLLIElement;
  document.querySelector(`#list-of-active-${type}s`)?.removeChild(tag);
}

/**
 * Handles the activation of a filter.
 * It moves the tag of the activated filter from the menu of activable filters to the menu of active filters,
 * updates the content of the recipes grid with the matching recipes,
 * updates the menu of activable filters with the remaining filters,
 * updates the recipes counter with the number of matching recipes,
 * adds a button to unselect the activated filter, and
 * erases the user's input in the search bar.
 * @param {HTMLLIElement} tag - the tag of the activated filter
 * @param {string} filter - the name of the activated filter
 * @param {FilterType} type - the type of the filters
 * @param {RecipeType[]} matchingRecipes - the recipes that match the activated filter
 * @param {string[]} filtersOfType - the filters of the given type
   */
export function handleFilterActivation(tag: HTMLLIElement, filter: string, type: FilterType, matchingRecipes: RecipeType[], filtersOfType: string[]) {
  moveTagToActiveFiltersMenu(tag, filter, type);
    updateRecipesGridContent(matchingRecipes);
    updateActivableFiltersMenu(type, filtersOfType);
    updateRecipesCounter(matchingRecipes.length);
    addUnselectFilterButton(filter, type)
    eraseUserInput(type);
}

/**
 * Handles the deactivation of a filter.
 * It removes the tag of the deactivated filter from the menu of active filters,
 * updates the content of the recipes grid with the matching recipes,
 * updates the menu of activable filters with the remaining filters,
 * removes the button to unselect the deactivated filter, and
 * updates the recipes counter with the number of matching recipes.
 * @param {string} filter - the name of the deactivated filter
 * @param {FilterType} type - the type of the filters
 */
export function handleFilterDeactivation(filter: string, type: FilterType) {
  removeTagOfDeactivatedFilter(filter, type)
  // Filter logic
  const { matchingRecipes, filtersOfType } = Recipe.getMatchingRecipesAndFiltersOfTypeAfterFilterDeactivation(filter, type);

  updateActivableFiltersMenu(type, filtersOfType);
  updateRecipesGridContent(matchingRecipes);
  
  removeUnselectFilterButton(filter);

  updateRecipesCounter(matchingRecipes.length);
}

/**
 * Moves a tag from the menu of activable filters to the menu of active filters.
 * It does this by adding the tag to the menu of active filters, setting its CSS class to 'active',
 * and setting its inner HTML to a paragraph element with the name of the filter and a close button.
 * It also removes the 'hidden' class from all tags in the menu of active filters.
 * @param {HTMLLIElement} tag - the tag to be moved
 * @param {string} filter - the name of the filter
 * @param {FilterType} type - the type of the filters
 */
export function moveTagToActiveFiltersMenu(tag: HTMLLIElement, filter: string, type: FilterType) {
  const activeFiltersMenu = document.querySelector(`#list-of-active-${type}s`) as HTMLUListElement;
  tag.classList.add('active');
  activeFiltersMenu?.appendChild(tag);
  tag.classList.add('relative', 'block', 'text-[14px]', 'h-[39px]', 'text-center', 'bg-white');
  tag.classList.remove('mb-[13px]');
  tag.innerHTML = `
    <p
      class="active-item text-[14px] text-black bg-yellow text-left px-[16px] py-[9px] mb-[3px] h-[37px] hover:font-bold"
      aria-label="filtre ${filter} actif"
    >
      ${filter}
    </p>
    <div
      class="absolute right-[5px] top-[50%] translate-y-[-50%] w-[17px] h-[17px] hover:bg-black hover:text-yellow rounded-[50%] flex justify-center items-center"
      aria-label="close ${filter}"
    >
      <img src="icons/close_yellow.svg" alt"close button"class="h-[5px] p-[12px]" aria-hidden="true"></i>
    </button>
  `;

  tag.addEventListener('mouseover', () => handleMouseOverActiveFilter(tag));
  tag.addEventListener('mouseout', () => handleMouseOutofActiveFilter(tag))

  const activeTags = activeFiltersMenu?.querySelectorAll('.active');
  Array.from(activeTags).forEach((activeTag: any) => {
    activeTag.classList.remove('hidden');
  })
}

function handleMouseOverActiveFilter (tag: HTMLElement): void {
  const closeIcon = tag.querySelector('div');
  closeIcon?.classList.add('bg-black');
}

function handleMouseOutofActiveFilter (tag: HTMLElement): void {
  const closeIcon = tag.querySelector('div');
  closeIcon?.classList.remove('bg-black');
}
