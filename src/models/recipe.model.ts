import { Ingredient } from '../models/ingredient.model'

export class Recipe {
  constructor(
    public id: number,
    public image: string,
    public name: string,
    public servings: number,
    public ingredients: Ingredient[],
    public time: number,
    public description: string,
    public appliance: string,
    public ustensils: string[]
  ) {}
}
