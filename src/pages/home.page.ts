import { recipes } from '../data/recipes.ts';
import { Recipe } from '../models/recipe.model.ts';
import { Header } from '../components/Header.ts';
import { RecipeCard } from '../components/RecipeCard.ts';

const recipesArray = recipes;
console.log('recipesArray :', recipesArray)

export const HomePage = async () => {
  const recipesObjects: Recipe[] = recipesArray.map(
    (recipe: any) => new Recipe(
      recipe.id,
      recipe.image,
      recipe.name,
      recipe.servings,
      recipe.ingredients,
      recipe.time,
      recipe.description,
      recipe.appliance,
      recipe.ustensils
    )
  )

  const page = document.createElement('div');
  
  const header = Header();
  page.appendChild(header);

  const main = document.createElement('main');
  page.appendChild(main);

  const recipesSection = document.createElement('section');
  recipesSection.id = 'recipes-section';
  recipesSection.classList.add(
    'flex',
    'flex-wrap',
    'justify-start',
    'p-[108px]',
    'bg-[#E5E5E5]',
    'gap-x-[66px]',
    'gap-y-[48px]'
  );
  main.appendChild(recipesSection);

  const cards = recipesObjects.map((recipe: any) => RecipeCard(recipe));
  cards.map((card: any) => recipesSection.appendChild(card));
  
  return page;
}
