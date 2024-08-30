import { recipes } from '../data/recipes.ts';
import { Recipe } from '../models/recipe.model.ts';
import { Header, SearchbarEvent } from '../components/Header.ts';
import { RecipeCard } from '../components/RecipeCard.ts';
import { FiltersSection } from '../components/FiltersSection.ts';
import { recipeFactory } from '../factory/recipe.factory.ts';
import { FilterRule } from '../components/FilterList.ts';
import { Ingredient } from '../models/ingredient.model.ts';

const recipesArray = recipes

export const HomePage = async () => {
  const recipes: Recipe[] = [];
  for (const recipe of recipesArray) {
    const ingredients: Ingredient[] = [];
    for (const ingredient of recipe.ingredients) {
      let quantity;

      switch (typeof ingredient.quantity) {
        case 'number':
          quantity = ingredient.quantity;
          break;
        case 'string':
          quantity = Number(ingredient.quantity);
          break;
        default:
          quantity = undefined;
      }
      
      ingredients.push({
        ingredient: ingredient.ingredient,
        quantity,
        unit: ingredient.unit
      });
    }
    recipes.push(new Recipe(
      recipe.id,
      recipe.image,
      recipe.name,
      recipe.servings,
      ingredients,
      recipe.time,
      recipe.description,
      recipe.appliance,
      recipe.ustensils
    ));
  }

  const page = document.createElement('div');
  
  const header = Header(recipes);
  page.appendChild(header);

  const main = document.createElement('main')
  page.appendChild(main)

  const recipesSection = document.createElement('section')
  recipesSection.id = 'recipes-section'
  recipesSection.classList.add(
    'grid',
    'grid-cols-4',
    'content-start',
    'justify-items-center',
    'p-[108px]',
    'bg-[#E5E5E5]',
    'gap-x-[48px]',
    'gap-y-[48px]'
  )

  for (const recipe of recipes) {
    recipesSection.appendChild(RecipeCard(recipe));
  }
  const advancedFilters: FilterRule[] = ['ingredients', 'appliance', 'ustensils'];
  let filtersSection = FiltersSection(recipes, advancedFilters);
  main.appendChild(filtersSection);
  
  main.appendChild(recipesSection);

  document.addEventListener(SearchbarEvent, (e: any) => {
    const recipes = e.detail;
    recipesSection.innerHTML = '';

    for (const recipe of recipes) {
      recipesSection.appendChild(RecipeCard(recipe));
    }

    for (const advancedFilter of advancedFilters) {
      const set = recipeFactory.setOf(recipes, advancedFilter);
      console.log(`set of ${advancedFilter}`, set);
      
      const listmenu = document.getElementById(`${advancedFilter}__items`);
      listmenu && (listmenu.innerHTML = '');
      
      for(const item of set.values()) {
        console.log('item', item);
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
  })
  return page
}
