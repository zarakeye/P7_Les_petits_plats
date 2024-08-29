import { recipes } from '../data/recipes.ts';
import { Recipe } from '../models/recipe.model.ts';
import { Header } from '../components/Header.ts';
import { RecipeCard } from '../components/RecipeCard.ts';
import { FiltersSection } from '../components/FiltersSection.ts';
import { recipeFactory } from '../factory/recipe.factory.ts';

const recipesArray = recipes;

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
  
  const header = Header(recipesObjects);
  page.appendChild(header);

  const main = document.createElement('main');
  page.appendChild(main);

  const recipesSection = document.createElement('section');
  recipesSection.id = 'recipes-section';
  recipesSection.classList.add(
    'grid',
    'grid-cols-4',
    'content-start',
    'justify-items-center',
    'p-[108px]',
    'bg-[#E5E5E5]',
    'gap-x-[48px]',
    'gap-y-[48px]'
  );

  for (const obj of recipesObjects) {
    recipesSection.appendChild(RecipeCard(obj));
  }
  const advancedFilters = ['ingredients', 'appliance', 'ustensils'];
  let filtersSection = FiltersSection(recipesObjects, advancedFilters);
  main.appendChild(filtersSection);
  
  main.appendChild(recipesSection);

  document.addEventListener('MainFilter', (e: any) => {
    const matchingRecipes = e.detail.recipes;
    recipesSection.innerHTML = '';

    if (matchingRecipes != recipesObjects) {
      for (const obj of matchingRecipes) {
        recipesSection.appendChild(RecipeCard(obj));
      }
    }

    for (const filter of advancedFilters) {
      const set = recipeFactory.setOf(matchingRecipes, filter);
      
      const listmenu = document.querySelector(`#${filter}__items`);
      listmenu && (listmenu.innerHTML = '');
      
      if (set) {
        for(const item of set) {
          const li = document.createElement('li');
          li.id = `filter-list__item-${item}`;
          li.classList.add(
            'text-[14px]',
            'bg-white'
          );
          li.textContent = item;
          listmenu?.appendChild(li);
        }
      }
    }
  })
  return page;
}
