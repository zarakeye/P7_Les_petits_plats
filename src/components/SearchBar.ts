import { Recipe } from '../models/recipe.model';
import { toLowerCase } from '../helpers';

export function SearchBar(recipes: Recipe[]) {
  const searchComponent = document.createElement('div');
  searchComponent.id = 'search';
  searchComponent.classList.add(
    'relative',
    'w-full',
    'flex',
    'flex-col',
    'justify-center',
    'items-center',
    'text-center',
  );

  searchComponent.innerHTML = `
    <p
      id='hero'
      aria-label="hero"
      class="font-anton text-[44px] text-[#FFD15B] w-[80%] text-center">
      CHERCHER PARMI PLUS DE 1500 RECETTES DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES
    </p>
    <input
      id="search__input"
      type="text"
      aria-label="Champ de recherche d'une recette, d'un ingrédient, etcetera"
      placeholder="Rechercher une recette, un ingédient, ..."
      class="w-full h-[72px] rounded-xl pl-[35px] m-0"
    >
    <button
      id="clear__button"
      type="reset"
      class="absolute hidden w-[13px] h-[13px] text-[#7A7A7A] rounded-[10px] right-[90px] bottom-[35px]"
    >
      <span class='sr-only'>Effacer la recherche</span>
      <i class="fa fa-times inline-block w-[28px] h-[28px] text-[22px]"></i>
    </button>
    <button
      id="search__button"
      type="submit"
      class="absolute w-[52px] h-[52px] bg-black text-white rounded-[10px] right-[10px] bottom-[10px]"
    >
      <span class='sr-only'>Rechercher</span>
      <span class="inline-block w-[28px] h-[28px] text-[22px] text-white">
        <i class="fa fa-search "></i>
      </span>
    </button>
  `;

  const searchInput = searchComponent.querySelector('#search__input') as HTMLInputElement;
  searchInput.addEventListener('input', (e) => {
    let matchingRecipes: Recipe[] = [];
    
    const searchTerm = toLowerCase((e.target as HTMLInputElement).value);

    if (searchTerm.length >= 3) {
      for (const recipe of recipes) {
        const recipeName = toLowerCase(recipe.Name);

        if ((recipeName.includes(searchTerm) && !matchingRecipes.includes(recipe)) ||
          (recipe.Ingredients.some((ingredient: any) => toLowerCase(ingredient.ingredient).includes(searchTerm)) && !matchingRecipes.includes(recipe)) ||
          (recipe.Description.includes(searchTerm) && !matchingRecipes.includes(recipe))) {
          matchingRecipes.push(recipe);
        }
      }
    }

    console.log('matchingRecipes', matchingRecipes);

    const fiterEvent = new CustomEvent('filter', {
      bubbles: true,
      detail: {
        recipes: matchingRecipes,
      },
    });
    document.dispatchEvent(fiterEvent);
  })
  
  return searchComponent;
}