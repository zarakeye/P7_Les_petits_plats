import { SearchBar } from '../components/SearchBar';
import { Recipe, RecipeType } from '../modules/recipe';
import { escapeSearchTerm } from '../helpers';
import { NoMatchFound } from './NoMatchFound';
import { updateRecipesCounter } from './RecipesCounter';
import { RecipeCard } from './RecipeCard';

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
        <img src="Logo.svg" alt="Les Petits Plats Logo" class="h-[25px]">
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

  const searchBar = SearchBar("magnifying_glass-black.svg");
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

  searchInput.addEventListener('input', (e) => handleMainSearchbarEvent(e));

  return header;
}

  /**
   * Handles the input event for the main search bar.
   * @param {any} e - The event triggered by the input.
   * 
   * This function trims the user input and escapes any special characters.
   * It then filters the recipes based on the user input and updates the
   * recipes cards section. If the user input does not match any recipe, it
   * displays a "no match found" message.
   */
export function handleMainSearchbarEvent(e: any) {
  let userInput = e.target.value.trim();
  userInput = escapeSearchTerm(userInput);

  let filteredRecipes = Recipe.filterRecipesWithUserInput(userInput);
  let updatedRecipesCards: HTMLElement[] = [];
  const filtersSection = document.querySelector('#filters-section');
  const recipesSection = document.querySelector('#recipes-section');
  const recipesGrid = document.querySelector('#recipes-grid');
  let noMatchMessage = document.querySelector('#no-match-found');

  if (userInput.length >= 3) {
    if (filteredRecipes.length !== 0) {
      if (noMatchMessage) {
        noMatchMessage?.remove();
      }
      
      filtersSection?.classList.remove('hidden');
      recipesSection?.classList.remove('hidden');
      updatedRecipesCards = filteredRecipes.map((recipe: RecipeType) => RecipeCard(recipe));
      recipesGrid?.replaceChildren(...updatedRecipesCards);
      updateRecipesCounter(filteredRecipes.length);
    } else {
      filtersSection?.classList.add('hidden');
      recipesSection?.classList.add('hidden');

      if (noMatchMessage) {
        noMatchMessage?.remove();
      }
  
      noMatchMessage = NoMatchFound(userInput);
      const main = document.querySelector('main') as HTMLElement;
      main.appendChild(noMatchMessage);
    }
  } else {
    if (noMatchMessage) {
      noMatchMessage?.remove();
    }
    
    filtersSection?.classList.remove('hidden');
      
    recipesSection?.classList.remove('hidden');
    updatedRecipesCards = filteredRecipes.map((recipe: RecipeType) => RecipeCard(recipe));
    recipesGrid?.replaceChildren(...updatedRecipesCards);
    updateRecipesCounter(filteredRecipes.length);
  }
}
