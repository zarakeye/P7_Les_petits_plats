import { Recipe } from '../modules/recipe';

export function RecipesCounter (recipes: Recipe[]) {
  const recipesCounter = document.createElement('p');
  recipesCounter.id = 'recipes-counter';
  recipesCounter.classList.add('font-anton', 'text-[21px]', 'pt-[17px]');
  recipesCounter.textContent = `${recipes.length} RECETTES`;
  
  return recipesCounter;
}

export function updateRecipesCounter(recipesLength: number, page: HTMLElement) {
  const recipesCounter = page.querySelector('#recipes-counter');
  if (recipesCounter) {
    recipesCounter.textContent = `${recipesLength} RECETTES`;
  }
}