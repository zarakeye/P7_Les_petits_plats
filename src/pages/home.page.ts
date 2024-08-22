import { Header } from '../components/Header.ts'

export const HomePage = async () => {
  // const recipesSources = await Api.getRecipes()
  // const recipes = Array.from(recipesSources).map(
  //   (recipeSource: any) =>
  //     new Recipe(
  //       recipeSource.id,
  //       recipeSource.image,
  //       recipeSource.name,
  //       recipeSource.servings,
  //       recipeSource.ingredients,
  //       recipeSource.time,
  //       recipeSource.description,
  //       recipeSource.appliance,
  //       recipeSource.ustensils
  //     )
  // )

  const header = Header()
  return header
}
