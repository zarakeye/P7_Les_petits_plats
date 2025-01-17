export function RecipesGrid() {
  const recipesGrid = document.createElement('div');
  recipesGrid.id = 'recipes-grid';
  recipesGrid.classList.add(
    'grid',
    'grid-cols-3',
    'content-start',
    'justify-items-center',
    'p-[108px]',
    'bg-light-gray',
    'gap-x-[48px]',
    'gap-y-[48px]'
  );

  return recipesGrid;
}
