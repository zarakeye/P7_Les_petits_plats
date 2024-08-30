import { Recipe } from '../models/recipe.model'

export function RecipeCard(recipe: Recipe) {
  const card = document.createElement('article')
  card.id = `recipe-${recipe.id}`
  card.classList.add(
    'relative',
    'flex',
    'flex-col',
    'w-[380px]',
    'rounded-[21px]',
  );

  card.innerHTML = `
    <figure class="w-full h-[253px]">
      <img
        src="/recipesPhotos/${recipe.image}"
        src="/recipesPhotos/${recipe.image}"
        alt="Les Petits Plats"
        class="w-full h-[253px] rounded-t-[21px] object-cover"
      >
    </figure>
    <div class="bg-white h-[478px] px-[25px] pt-[32px] pb-[61px] text-wrap rounded-b-[21px]">
      <h2
        id="recipe-${recipe.id}-title"
        aria-label="Titre de la recette: ${recipe.name}"
        id="recipe-${recipe.id}-title"
        aria-label="Titre de la recette: ${recipe.name}"
        class="font-anton text-[18px] text-black mb-[29px]"
      >
        ${recipe.name}
        ${recipe.name}
      </h2>
      <h3
        class="font-manrope text-[12px] text-[#7A7A7A] mb-[15px]"
      >
        RECETTE
      </h3>
      <p
        id="recipe-${recipe.id}-description"
        aria-label="Description de la recette: ${recipe.description}"
        id="recipe-${recipe.id}-description"
        aria-label="Description de la recette: ${recipe.description}"
        class="font-manrope text-[14px] text-black mb-[32px] h-[84px] overflow-hidden"
      >
        ${recipe.description}
        ${recipe.description}
      </p>
      <h3
        class="font-manrope text-[12px] text-[#7A7A7A] mb-[15px]"
      >
        INGRÉDIENTS
      </h3>
      <ul
        id="recipe-${recipe.id}-ingredients"
        aria-label="Liste d'ingredients de la recette: ${recipe.name}"
        id="recipe-${recipe.id}-ingredients"
        aria-label="Liste d'ingredients de la recette: ${recipe.name}"
        class="flex flex-wrap justify-between"
      >
      </ul>
      <aside
        id="recipe-${recipe.id}-time"
        class="absolute bg-[#FFD15B] font-manrope text-[12px] text-black w-[63px] h-[26px] rounded-[14px] px-[15px] py-[5px] right-[37px] top-[26px]">${recipe.time}min</aside>
    </div>
  `;

  const ingredientsList = card.querySelector(`#recipe-${recipe.id}-ingredients`) as HTMLUListElement;
  for (const ingredient of recipe.ingredients) {
    ingredientsList.innerHTML += `
      <li class="w-[50%] mb-[21px] text-[14px]">
        <p>${ingredient.ingredient}</p>
        <p class="text-[#7A7A7A]">${ingredient.quantity ?? '-'} ${ingredient.unit ?? ''}</p>
      </li>
    `;
  }

  return card
}
