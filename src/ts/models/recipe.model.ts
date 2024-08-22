import { Ingredient } from "./ingredient.model";

// export interface Recipe {
//   id: number;
//   image: string;
//   name: string;
//   servings: number;
//   ingredients: Ingredient[];
//   time: number;
//   description: string;
//   appliance: string;
//   ustensils: string[];
// }

export class Recipe {
  id: number;
  image: string;
  name: string;
  servings: number;
  ingredients: Ingredient[];
  time: number;
  description: string;
  appliance: string;
  ustensils: string[];

  constructor(id: number, image: string, name: string, servings: number, ingredients: any[], time: number, description: string, appliance: string, ustensils: string[]) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.servings = servings;
    this.ingredients = this.setIngredients(ingredients);
    this.time = time;
    this.description = description;
    this.appliance = appliance;
    this.ustensils = this.setUstensils(ustensils);
  }

  setIngredients(ingredients: any[]): Ingredient[] {
    const ingredientsObjectsArray: Ingredient[] = [];

    ingredients.forEach((ingredient) => {
      const ingredientObject = new Ingredient(ingredient.ingredient, ingredient.quantity, ingredient.unit);
      ingredientsObjectsArray.push(ingredientObject);
    });
    return ingredientsObjectsArray;
  }

  setUstensils(ustensils: string[]): string[] {
    return Array.from(ustensils);
  }
}