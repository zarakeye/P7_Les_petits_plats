import { recipes } from '../data/recipes.ts';
import { Recipe } from '../models/recipe.model.ts';
import { Header, SearchbarEvent } from '../components/Header.ts';
import { RecipeCard } from '../components/RecipeCard.ts';
import { FiltersSection } from '../components/FiltersSection.ts';
import { FilterRule, FilterEvent, CancelFilterEvent } from '../components/FilterList.ts';
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
  page.appendChild(main);

  const recipesSection = document.createElement('section');
  recipesSection.id = 'recipes-section';
  let recipesFound = document.createElement('div');
  recipesFound.classList.add(
    'grid',
    'grid-cols-4',
    'content-start',
    'justify-items-center',
    'p-[108px]',
    'bg-light-gray',
    'gap-x-[48px]',
    'gap-y-[48px]'
  )

  // for (const recipe of recipes) {
  //   recipesFound.appendChild(RecipeCard(recipe));
  // }
  recipes.forEach(recipe => recipesFound.appendChild(RecipeCard(recipe)));

  recipesSection.appendChild(recipesFound);
  const noMatchingRecipes = document.createElement('div');
  noMatchingRecipes.classList.add(
    'flex',
    'justify-center',
    'items-center',
    'text-center',
    'h-full',
    'text-[21px]',
    'bg-light-gray'
  );

  const advancedFilters: FilterRule[] = ['ingredients', 'appliance', 'ustensils'];
  let filtersSection = FiltersSection(recipes, advancedFilters);
  main.appendChild(filtersSection);
  
  main.appendChild(recipesSection);

  document.addEventListener(SearchbarEvent, (e: any) => {
    const matchingRecipes: Recipe[] = e.detail.matchingRecipes;
    const searchTerm = e.detail.searchTerm;

    if (matchingRecipes?.length === 0) {
      filtersSection?.remove();
      const recipesCards = recipesFound.querySelectorAll('.recipe');
      // for (const card of recipesCards) {
      //   card.remove();
      // }
      recipesCards.forEach(card => card.remove());
      recipesFound.remove();
      recipesSection.appendChild(noMatchingRecipes);
      noMatchingRecipes.innerHTML = `<p class="text-[21px] pt-[30px]">Aucune recette ne contient "${searchTerm}"</p>`;
    } else {
      const filterLists = filtersSection.querySelectorAll('.filter-list');
      // for (const filterList of filterLists) {
      //   filterList.remove();
      // }
      filterLists.forEach(filterList => filterList.remove());
      filtersSection.remove();

      const recipesCards = recipesFound.querySelectorAll('.recipe');
      // for (const card of recipesCards) {
      //   card.remove();
      // }
      recipesCards.forEach(card => card.remove());

      filtersSection = FiltersSection(matchingRecipes, advancedFilters);
      recipesSection.insertAdjacentElement('beforebegin', filtersSection);
      noMatchingRecipes?.remove();
      // for (const recipe of matchingRecipes) {
      //   recipesFound.appendChild(RecipeCard(recipe));
      // }
      matchingRecipes.forEach(recipe => recipesFound.appendChild(RecipeCard(recipe)));
      recipesSection.appendChild(recipesFound);
    }
  });

  let recipesBasedOn: Recipe[] = [];
  document.addEventListener(FilterEvent, (e: any) => {
    recipesBasedOn = e.detail.recipesBasedOn;
    const matchingRecipes: Recipe[] = e.detail.matchingRecipes;
    const filter = e.detail.filter;

    const recipesCards = recipesFound.querySelectorAll('.recipe');
    // for (const card of recipesCards) {
    //   card.remove();
    // }
    recipesCards.forEach(card => card.remove());
    // for (const recipe of matchingRecipes) {
    //   recipesFound.appendChild(RecipeCard(recipe));
    // }
    matchingRecipes.forEach(recipe => recipesFound.appendChild(RecipeCard(recipe)));

    recipesSection.appendChild(recipesFound);
  });

  document.addEventListener(CancelFilterEvent, (e: any) => {
    let activeFiltersRemaining: string[] = e.detail.activeFiltersRemaining;
    // for (let filter of activeFiltersRemaining) {
    //   filter = filter.trim();
    // }
    activeFiltersRemaining = activeFiltersRemaining.map(filter => filter.trim());

    // const matchingRecipes: Recipe[] = [];
    // for (const recipe of recipesBasedOn) {
    //   for (const ingredient of recipe.ingredients) {
    //     if (activeFiltersRemaining.includes(ingredient.ingredient.trim()) && !matchingRecipes.includes(recipe)) {
    //       matchingRecipes.push(recipe);
    //     }
    //   }
    //   for (const ustensil of recipe.ustensils) {
    //     if (activeFiltersRemaining.includes(ustensil) && !matchingRecipes.includes(recipe)) {
    //       matchingRecipes.push(recipe);
    //     }
    //   }
    //   if (activeFiltersRemaining.includes(recipe.appliance) && !matchingRecipes.includes(recipe)) {
    //     matchingRecipes.push(recipe);
    //   }
    // }
    let matchingRecipes: Recipe[] = []; 
    recipesBasedOn.filter(recipe => {
      recipe.ingredients.filter(ingredient => activeFiltersRemaining.includes(ingredient.ingredient.trim())) ||
      recipe.ustensils.filter(ustensil => activeFiltersRemaining.includes(ustensil)) ||
      activeFiltersRemaining.includes(recipe.appliance)
    }).forEach(recipe => {
      if (!matchingRecipes.includes(recipe)) {
        matchingRecipes.push(recipe);
      }
    });
    console.log('typeof matchingRecipes', typeof matchingRecipes);

    const recipesCards = recipesFound.querySelectorAll('.recipe');
    // for (const card of recipesCards) {
    //   card.remove();
    // }
    recipesCards.forEach(card => card.remove());
    if (matchingRecipes.length !== 0) {  
      // for (const recipe of matchingRecipes) {
      //   recipesFound.appendChild(RecipeCard(recipe));
      // }
      matchingRecipes.forEach(recipe => recipesFound.appendChild(RecipeCard(recipe)));
    } else {
      for (const recipe of recipesBasedOn) {
        recipesFound.appendChild(RecipeCard(recipe));
      }
    }
    recipesSection.appendChild(recipesFound);
  });

  return page;
}
