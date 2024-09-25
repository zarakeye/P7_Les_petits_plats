  /**
   * Creates the search bar component.
   * @returns The search bar element.
   */
export function SearchBar(iconPath: string) {
  const searchComponent = document.createElement('form');
  searchComponent.classList.add(
    'relative',
    'w-full',
  )
  searchComponent.innerHTML = `
    <input
      type="search"
      class="w-full m-0"
    >
    <button
      id="search__button"
      type="submit"
      class="absolute"
    >
      <span class='sr-only'>Rechercher</span>
      <span class="inline-block">
        <img src="icons/${iconPath}">
      </span>
    </button>
  `

  return searchComponent;
}
