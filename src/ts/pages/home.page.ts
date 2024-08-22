import { Api } from "../api/index.js";
import { Recipe } from "../models/recipe.model.js";
import { Header } from "../components/Header.js";

export const HomePage = async (): Promise<void> => {
  const recipesSources = await Api.getRecipes();
  const recipes = Array.from(recipesSources).map((recipeSource: any) => new Recipe(recipeSource.id, recipeSource.image, recipeSource.name, recipeSource.servings, recipeSource.ingredients, recipeSource.time, recipeSource.description, recipeSource.appliance, recipeSource.ustensils));

  const header = new Header();
  document.body.appendChild(header);
}