import { SearchBar } from '../components/SearchBar.ts';
import { Recipe } from '../models/recipe.model';
import { toLowerCase } from '../helpers';

export function Header(recipes: any[]) {
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
    'px-[200px]',
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
        Les Petits Plats
      </h1>
      <div class="flex justify-center items-center w-[18px] h-[18px] bg-white rounded-full border-solid border-2 border-black mb-[10px]">
        <div class="w-[11px] h-[11px] bg-white rounded-full border-solid border-2 border-black"></div>
      </div>
    </div>
    <div
      id="header__middle"
      class="relative w-full flex flex-col justify-center items-center text"
    >
      <p
        id="hero"
        aria-label="hero"
        class="font-anton text-[44px] text-[#FFD15B] w-[80%] text-center"
      >
        CHERCHER PARMI PLUS DE 1500 RECETTES DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES
      </p>
    </div>
  `;

  const searchBar = SearchBar(recipes);
  const headerMiddle = header.querySelector('#header__middle') as HTMLDivElement;
  headerMiddle.appendChild(searchBar);
  
  const searchInput = searchBar.querySelector('input') as HTMLInputElement;
  searchInput.classList.add('h-[72px]', 'rounded-xl', 'pl-[35px]', 'pr-[70px]');
  searchInput.setAttribute('placeholder', 'Rechercher une recette, un ingrédient, ...');
  searchInput.setAttribute('aria-label', "Champ de recherche d'une recette, d'un ingrédient, etcetera");

  const searchButton = header.querySelector('[type="submit"]') as HTMLButtonElement;
  searchButton.classList.add('w-[52px]', 'h-[52px]', 'bg-black', 'text-white', 'rounded-[10px]', 'right-[10px]', 'bottom-[10px]');

  searchInput.addEventListener('input', (e) => {
    let matchingRecipes: Recipe[] = [];
    
    const searchTerm = toLowerCase((e.target as HTMLInputElement).value);

    if (searchTerm.length < 3) {
      const fiterEvent = new CustomEvent('MainFilter', {
        bubbles: true,
        detail: {
          recipes: recipes,
        },
      });
      header.dispatchEvent(fiterEvent);
    } else {
      for (const recipe of recipes) {
        const recipeName = toLowerCase(recipe.Name);

        if ((recipeName.includes(searchTerm) && !matchingRecipes.includes(recipe)) ||
          (recipe.Ingredients.some((ingredient: any) => toLowerCase(ingredient.ingredient).includes(searchTerm)) && !matchingRecipes.includes(recipe)) ||
          (recipe.Description.includes(searchTerm) && !matchingRecipes.includes(recipe))) {
          matchingRecipes.push(recipe);
        }
      }

      const fiterEvent = new CustomEvent('MainFilter', {
        bubbles: true,
        detail: {
          recipes: matchingRecipes,
        },
      });
      header.dispatchEvent(fiterEvent);
    }

    
  })

  return header;
}
