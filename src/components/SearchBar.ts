export function SearchBar() {
  const searchComponent = document.createElement('div');
  searchComponent.id = 'search';
  searchComponent.classList.add(
    'relative',
    'w-full',
    'flex',
    'flex-col',
    'justify-center',
    'items-center',
    'text-center',
  );

  searchComponent.innerHTML = `
    <p
      id='hero'
      aria-label="hero"
      class="font-anton text-[44px] text-[#FFD15B] w-[80%] text-center">
      CHERCHER PARMI PLUS DE 1500 RECETTES DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES
    </p>
    <input
      id="search__input"
      type="text"
      aria-label="Champ de recherche d'une recette, d'un ingrédient, etcetera"
      placeholder="Rechercher une recette, un ingédient, ..."
      class="w-full h-[72px] rounded-xl pl-[35px] m-0"
    >
    <button
      id="search__button"
      type="submit"
      class="absolute w-[52px] h-[52px] bg-black text-white rounded-[10px] right-[10px] bottom-[10px]"
    >
      <span class='sr-only'>Rechercher</span>
      <i class="fas fa-search inline-block w-[28px] h-[28px] text-[22px]"></i>
    </button>
  `;
  
  return searchComponent;
}