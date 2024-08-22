export class Recipe {
  constructor(
    private id: number,
    private image: string,
    private name: string,
    private servings: number,
    private ingredients: any[],
    private time: number,
    private description: string,
    private appliance: string,
    private ustensils: string[]
  ) {}
}
