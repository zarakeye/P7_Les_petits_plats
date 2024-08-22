export class Ingredient {
  ingredient: string
  quantity?: number
  unit?: string

  constructor(ingredient: string, quantity?: number, unit?: string) {
    this.ingredient = ingredient
    this.quantity = quantity
    this.unit = unit
  }

  setQuantity(quantity: number): void {
    this.quantity = quantity
  }

  setUnit(unit: string): void {
    this.unit = unit
  }
}
