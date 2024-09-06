import { recipes as recipesArray } from '../data/recipes.ts';
import { Recipe, Ingredient } from '../modules/recipe.ts';
import { RecipesSection } from '../components/RecipesSection';
import { RecipesGrid } from '../components/RecipesGrid';
import { NoMatchFound } from '../components/NoMatchFound';
import { Header, SearchbarEvent } from '../components/Header.ts';
import { RecipeCard } from '../components/RecipeCard.ts';
import { FiltersSection } from '../components/FiltersSection.ts';
import { FilterRule, FilterEvent, CancelFilterEvent } from '../components/FilterList.ts';

  /**
   * Creates the home page, which includes a header with a search bar, a
   * section for the recipes and, before it, a section for the filters to apply on the recipes.
   * @returns The home page element.
   */
export const HomePage = async () => {
  const recipes: Recipe[] = [];

  // Create recipes
  for (const recipe of recipesArray) {
    const ingredients: Ingredient[] = [];
    const ustensils: string[] = [];
    // Parse ingredients and ustensils
    for (const ingredient of recipe.ingredients) {
      let quantity;

      switch (typeof ingredient.quantity) {
        case 'number':
          quantity = ingredient.quantity;
          break;
        case 'string':
          quantity = Number(ingredient.quantity); // Convert string to number when given in string
          break;
        default:
          quantity = undefined;
      }
      
      ingredients.push({
        ingredient: ingredient.ingredient.trim(),
        quantity,
        unit: ingredient.unit
      });
    }

    for (const ustensil of recipe.ustensils) {
      ustensils.push(ustensil.trim());
    }

    recipes.push(new Recipe(
      recipe.id,
      recipe.image.trim(),
      recipe.name.trim(),
      recipe.servings,
      ingredients,
      recipe.time,
      recipe.description.trim(),
      recipe.appliance.trim(),
      ustensils
    ));
  }

  const page = document.createElement('div');
  
  const header = Header(recipes);
  page.appendChild(header);

  const main = document.createElement('main')
  page.appendChild(main);

  // const recipesSection = document.createElement('section');
  // recipesSection.id = 'recipes-section';
  // let recipesFound = document.createElement('div');
  // recipesFound.classList.add(
  //   'grid',
  //   'grid-cols-3',
  //   'content-start',
  //   'justify-items-center',
  //   'p-[108px]',
  //   'bg-light-gray',
  //   'gap-x-[48px]',
  //   'gap-y-[48px]'
  // )

  // for (const recipe of recipes) {
  //   recipesFound.appendChild(RecipeCard(recipe));
  // }

  // recipesSection.appendChild(recipesFound);
  // const noMatchingRecipes = document.createElement('div');
  // noMatchingRecipes.classList.add(
  //   'flex',
  //   'justify-center',
  //   'items-center',
  //   'text-center',
  //   'h-full',
  //   'text-[21px]',
  //   'bg-light-gray'
  // );

  const recipesSection: HTMLElement = RecipesSection();

  let recipesGrid: HTMLDivElement = RecipesGrid(recipes);
  recipesSection.appendChild(recipesGrid);

  const advancedFilters: FilterRule[] = ['ingredients', 'appliance', 'ustensils'];
  let filtersSection = FiltersSection(recipes, advancedFilters);
  main.appendChild(filtersSection);
  
  main.appendChild(recipesSection);

  // document.addEventListener(SearchbarEvent, (e: any) => {
  //   recipesSection.innerHTML = '';
  //   const matchingRecipes: Recipe[] = e.detail.matchingRecipes;
  //   const searchTerm = e.detail.searchTerm;

  //   if (matchingRecipes?.length === 0) {
  //     filtersSection?.remove();
  //     const recipesCards = recipesGrid.querySelectorAll('.recipe');
  //     for (const card of recipesCards) {
  //       card.remove();
  //     }
  //     recipesGrid.remove();
  //     const noMatchFound = NoMatchFound(searchTerm);
  //     recipesSection.appendChild(noMatchFound);
  //   } else {
  //     const filterLists = filtersSection.querySelectorAll('.filter-list');
  //     for (const filterList of filterLists) {
  //       filterList.remove();
  //     }
  //     filtersSection.remove();

  //     const recipesCards = recipesGrid.querySelectorAll('.recipe');
  //     for (const card of recipesCards) {
  //       card.remove();
  //     }

  //     filtersSection = FiltersSection(matchingRecipes, advancedFilters);
  //     recipesSection.insertAdjacentElement('beforebegin', filtersSection);
  //     recipesSection.innerHTML = '';
  //     recipesGrid = RecipesGrid(matchingRecipes);
  //     recipesSection.appendChild(recipesGrid);
  //   }
  // });

  page.addEventListener(SearchbarEvent, (e: any) => Recipe.handleSearchbarEvent(e, advancedFilters));

  let recipesBasedOn: Recipe[] = [];
  document.addEventListener(FilterEvent, (e: any) =>  Recipe.handleFilterEvent(e, recipesBasedOn, recipesSection, recipesGrid));

  document.addEventListener(CancelFilterEvent, (e: any) => Recipe.handleCancelFilterEvent(e, recipesBasedOn, recipesSection, recipesGrid));

  return page;
}
