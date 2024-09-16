import { SearchBar } from '../components/SearchBar';
import { Recipe, FilterType } from '../modules/recipe';
import { createEventAndDispatch, escapeSearchTerm } from '../helpers';
import { FilterTag } from './FilterTag';
import { NoMatchFound } from './NoMatchFound';
import { updateRecipesCounter } from './RecipesCounter';

export const MainSearchbarEvent = 'main-searchbar-event';

  /**
   * Creates the header of the page, which includes a search bar.
   * @param recipes - The array of recipes on which the input will base its search.
   * @returns The header element.
   */
export function Header() {
  const header = document.createElement('header')
  header.id = 'header'
  header.classList.add(
    'relative',
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
    'align-middle',
    'h-[667px]',
    'bg-[url("/les_petis_plats_Banner.png")]',
    'bg-center',
    'bg-cover',
    'bg-no-repeat',
    'px-[200px]'
  )

  header.innerHTML = `
    <div
      id="header__top"
      class="absolute flex justify-normal items-baseline h-[25px] top-[51px] left-[69px]">
      <h1
        id="header__title"
        aria-label="title"
        class="text-2xl font-anton text-white top-[51px] left-[69px] mr-[3px]"
      >
        <span class='sr-only'>Les Petits Plats</span>
        <img src="Logo.png" alt="Les Petits Plats Logo" class="h-[25px]">
      </h1>
    </div>
    <div
      id="header__middle"
      class="relative w-full flex flex-col justify-center items-center text"
    >
      <p
        id="hero"
        aria-label="hero"
        class="font-anton text-[44px] text-yellow w-[80%] text-center"
      >
        CHERCHER PARMI PLUS DE 1500 RECETTES DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES
      </p>
    </div>
  `

  const searchBar = SearchBar()
  const headerMiddle = header.querySelector('#header__middle') as HTMLDivElement
  headerMiddle.appendChild(searchBar)

  const searchInput = searchBar.querySelector('input') as HTMLInputElement
  searchInput.classList.add('h-[72px]', 'rounded-xl', 'pl-[35px]', 'pr-[70px]')
  searchInput.setAttribute('placeholder', 'Rechercher une recette, un ingrédient, ...')
  searchInput.setAttribute(
    'aria-label',
    "Champ de recherche d'une recette, d'un ingrédient, etcetera"
  )

  const searchButton = header.querySelector('[type="submit"]') as HTMLButtonElement
  searchButton.classList.add(
    'w-[52px]',
    'h-[52px]',
    'bg-black',
    'text-white',
    'rounded-[10px]',
    'right-[10px]',
    'bottom-[10px]'
  )

  searchInput.addEventListener('input', (e) => {
    const userInput = escapeSearchTerm((e.target as HTMLInputElement).value);

    console.log('searchTerm', userInput);

    if (userInput.length >= 3) {
      if (Recipe.matchingRecipes.length !== 0) {
        Recipe.filterRecipeswithUserInput(Recipe.matchingRecipes, userInput);
        createEventAndDispatch(header, MainSearchbarEvent, {searchTerm: userInput});
      } else {
        Recipe.filterRecipeswithUserInput(Recipe.originalRecipes, userInput);
        createEventAndDispatch(header, MainSearchbarEvent, {searchTerm: userInput});
      }
    }
  });

  return header;
}

export function handleMainSearchbarEvent(e: any, page: HTMLElement) {
  if (Recipe.matchingRecipes.length !== 0) {
    const filtersTypes = ['ingredient', 'appliance', 'ustensil'] as FilterType[];
    const newFilters: any = Recipe.extractFilters(Recipe.matchingRecipes, filtersTypes);
 
    for (const type of filtersTypes) {
      const filtersMenu = page.querySelector(`#list-of-selectable-${type}s`) as HTMLUListElement;
      filtersMenu.innerHTML = '';

      for (const newFilter of newFilters[`${type}s`]) {
        filtersMenu.appendChild(FilterTag(newFilter, type));
      }
    }
    
    const recipesGrid = page.querySelector('#recipes-grid') as HTMLDivElement;
    const newRecipesCards = Recipe.createRecipesCards(Recipe.matchingRecipes);
    recipesGrid.replaceChildren(...newRecipesCards);

    updateRecipesCounter(Recipe.matchingRecipes.length, page);
  } else {
    const main = page.querySelector('main') as HTMLElement;
    main.innerHTML = '';
    main.appendChild(NoMatchFound(e.detail.searchTerm));
  }
}
