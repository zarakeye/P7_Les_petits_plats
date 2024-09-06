import { SearchBar } from '../components/SearchBar';
import { Recipe } from '../modules/recipe';
import { createEventAndDispatch } from '../helpers';

export const SearchbarEvent = 'searchbar-event';

  /**
   * Creates the header of the page, which includes a search bar.
   * @param recipes - The array of recipes on which the input will base its search.
   * @returns The header element.
   */
export function Header(recipes: Recipe[]) {
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
    let matchingRecipes: Recipe[] = [];
    
    const searchTerm = (e.target as HTMLInputElement).value.trim().toLowerCase();

    if (searchTerm.length < 3) {
      createEventAndDispatch(header, SearchbarEvent, {matchingRecipes: recipes});
      return;
    } else {
      const matchingRecipesIds: number[] = [];
      for (const recipe of recipes) {
        if (!matchingRecipesIds.includes(recipe.id)) {
          if ((recipe.name.trim().toLowerCase().includes(searchTerm) || recipe.description.trim().toLowerCase().includes(searchTerm))) {
            matchingRecipes.push(recipe);
          } else {
            for (const ingredient of recipe.ingredients) {
              if (ingredient.ingredient.trim().toLowerCase().includes(searchTerm)) {
                matchingRecipes.push(recipe);
              }
            }
          }
      }
      console.log('matchingRecipes', matchingRecipes);
      createEventAndDispatch(header, SearchbarEvent, {searchTerm: searchTerm, matchingRecipes: matchingRecipes});
    }
  }});

  return header;
}
