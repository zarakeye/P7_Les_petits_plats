import { Recipe } from '../models/recipe.model';

export function RecipeCard(recipe: Recipe) {
  const card = document.createElement('article')
  card.id = `recipe-${recipe.Id}`
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
        src="/recipesPhotos/${recipe.Image}"
        alt="Les Petits Plats"
        class="w-full h-[253px] rounded-t-[21px] object-cover"
      >
    </figure>
    <div class="bg-white px-[25px] pt-[32px] pb-[61px] text-wrap rounded-b-[21px]">
      <h2
        id="recipe-${recipe.Id}-title"
        aria-label="Titre de la recette: ${recipe.Name}"
        class="font-anton text-[18px] text-black mb-[29px]"
      >
        ${recipe.Name}
      </h2>
      <h3
        class="font-manrope text-[12px] text-[#7A7A7A] mb-[15px]"
      >
        RECETTE
      </h3>
      <p
        id="recipe-${recipe.Id}-description"
        aria-label="Description de la recette: ${recipe.Description}"
        class="font-manrope text-[14px] text-black mb-[32px]"
      >
        ${recipe.Description}
      </p>
      <h3
        class="font-manrope text-[12px] text-[#7A7A7A] mb-[15px]"
      >
        INGRÉDIENTS
      </h3>
      <ul
        id="recipe-${recipe.Id}-ingredients"
        aria-label="Liste d'ingredients de la recette: ${recipe.Name}"
        class="flex flex-wrap"
      >
        ${recipe.Ingredients.map((ingredient: any) => 
          `<li class="w-[50%] mb-[21px]">
            <div>${ingredient.ingredient}</div>
            <div class="text-[#7A7A7A]">${ingredient.quantity ?? '-'} ${ingredient.unit ?? ''}</div>
           </li>`
          ).join('')
        }  
        
      </ul>
      <aside
        id="recipe-${recipe.Id}-time"
        class="absolute bg-[#FFD15B] font-manrope text-[12px] text-black w-[63px] h-[26px] rounded-[14px] px-[15px] py-[5px] right-[37px] top-[26px]">${recipe.Time}min</aside>
    </div>
  `;

  return card;
}