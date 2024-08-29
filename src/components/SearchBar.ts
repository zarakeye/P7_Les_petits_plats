export function SearchBar() {
  const searchComponent = document.createElement('div')
  searchComponent.classList.add('relative', 'w-full')
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
        <i class="fa fa-search"></i>
      </span>
    </button>
  `

  return searchComponent
}
