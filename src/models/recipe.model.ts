import { Ingredient } from '../models/ingredient.model'

export class Recipe {
  /**
   * Initializes a new instance of the Recipe class.
   *
   * @param {number} id - Unique identifier of the recipe.
   * @param {string} image - Image URL of the recipe.
   * @param {string} name - Name of the recipe.
   * @param {number} servings - Number of servings the recipe yields.
   * @param {any[]} ingredients - List of ingredients required for the recipe.
   * @param {number} time - Preparation and cooking time of the recipe.
   * @param {string} description - Brief description of the recipe.
   * @param {string} appliance - Appliance required for the recipe.
   * @param {string[]} ustensils - List of utensils required for the recipe.
   */
  constructor(
    private id: number,
    private image: string,
    private name: string,
    private servings: number,
    private ingredients: Ingredient[],
    private time: number,
    private description: string,
    private appliance: string,
    private ustensils: string[]
  ) {}

  /******* Getters */
  /** Gets the ID of the recipe. */
  public get Id(): number {
    return this.id;
  }

  /** Gets the image URL of the recipe. */
  public get Image(): string {
    return this.image;
  }

  /** Gets the name of the recipe. */
  public get Name(): string {
    return this.name;
  }

  /** Gets the number of servings the recipe yields. */
  public get Servings(): number {
    return this.servings;
  }

  /** Gets the list of ingredients required for the recipe. */
  public get Ingredients(): Ingredient[] {
    return this.ingredients;
  }

  /** Gets the average time to cook the recipe. */
  public get Time(): number {
    return this.time;
  }

  /** Gets the description of the recipe. */
  public get Description(): string {
    return this.description;
  }

  /** Gets the appliance required for the recipe. */
  public get Appliance(): string {
    return this.appliance;
  }

  /** Gets the list of utensils required for the recipe. */
  public get Ustensils(): string[] {
    return this.ustensils;
  }


  /******* Setters */
  /** Sets the ID of the recipe. */
  public set Name(name: string) {
    this.name = name;
  }

  /** Sets the image URL of the recipe. */
  public set Image(image: string) {
    this.image = image;
  }

  /** Sets the number of servings the recipe yields. */
  public set Servings(servings: number) {
    this.servings = servings;
  }

  /** Sets the list of ingredients required for the recipe. */
  public set Ingredients(ingredients: Ingredient[]) {
    this.ingredients = ingredients;
  }

  /** Sets the average time to cook the recipe. */
  public set Time(time: number) {
    this.time = time;
  }

  /** Sets the description of the recipe. */
  public set Description(description: string) {
    this.description = description;
  }

  /** Sets the appliance required for the recipe. */
  public set Appliance(appliance: string) {
    this.appliance = appliance;
  }

  /** Sets the list of utensils required for the recipe. */
  public set Ustensils(ustensils: string[]) {
    this.ustensils = ustensils;
  }
}
