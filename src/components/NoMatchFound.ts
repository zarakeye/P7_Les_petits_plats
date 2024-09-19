export function NoMatchFound(searchTerm: string) {
  const noMatchFound = document.createElement('div');
  noMatchFound.id = 'no-match-found';

  noMatchFound.classList.add(
    'w-full',
    'h-full',
    'flex',
    'flex-col',
    'justify-center',
    'items-center',
  );
  noMatchFound.innerHTML = `
    <p
      class="font-anton text-[21px] pt-[17px]"
    >
      Aucune recette ne contient "${searchTerm}"
    </p>
  `;
  return noMatchFound;
}