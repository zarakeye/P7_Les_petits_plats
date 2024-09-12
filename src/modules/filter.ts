export type FilterType = 'ingredient' | 'appliance' | 'ustensil';

export class Filter {
  constructor(
    public id: number,
    public name: string,
    public type: FilterType,
    public active: boolean,
  ) {}
  
  static filters: any = {
    ingredients: [],
    appliances: [],
    ustensils: []
  };

  static mappingOfActiveFiltersByName: string[] = [];
}