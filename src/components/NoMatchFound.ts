export function NoMatchFound(searchTerm: string) {
  const noMatchFound = document.createElement('div');
  noMatchFound.id = 'no-match-found';
  noMatchFound.innerHTML = `
    <p
      class="font-anton text-[21px] pt-[17px]"
    >
      Aucune recette ne contient "${searchTerm}"
    </p>
  `;
  return noMatchFound;
}