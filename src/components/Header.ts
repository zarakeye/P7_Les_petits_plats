export function Header() {
  const header = document.createElement('header')
  header.id = 'header'
  header.classList.add(
    'relative',
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
    'align-middle',
    'w-[100%]',
    'h-[667px]',
    'bg-[url("/les_petis_plats_Banner.png")]',
    'bg-center',
    'bg-cover',
    'bg-no-repeat',
    'm-0',
    'px-[200px]',
  )
  
  header.innerHTML = `
    <div id="header__top" class="absolute flex justify-normal items-baseline w-[100%] h-[25px] top-[51px] left-[69px]">
      <h1
        id="header__title"
        aria-label="title"
        class="text-2xl font-anton text-white top-[51px] left-[69px] mr-[3px]">Les Petits Plats</h1>
      <div class="flex justify-center items-center w-[18px] h-[18px] bg-white rounded-full border-solid border-2 border-black mb-[10px]">
        <div class="w-[11px] h-[11px] bg-white rounded-full border-solid border-2 border-black"></div>
      </div>
    </div>
    <div id="search" class="relative w-full flex flex-col justify-center items-center" text-center">
      <p
        id='hero'
        aria-label="hero"
        class="font-anton text-[44px] text-[#FFD15B] w-[80%] text-center">
        CHERCHER PARMI PLUS DE 1500 RECETTES DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES
      </p>
      <!-- A REMPLACER PAR LE COMPOSANT SEARCHBAR QUE JE DOIS IMPLEMENTER
      <input
        id="search__input"
        type="text"
        aria-label="Champ de recherche d'une recette, d'un ingrédient, etcetera"
        placeholder="Rechercher une recette, un ingédient, ..."
        class="w-full h-[72px] rounded-xl pl-[35px] m-0"> -->
      <button
        id="search__button"
        type="submit"
        class="absolute w-[52px] h-[52px] bg-[#FFD15B] text-white rounded-[10px] right-[10px] bottom-[10px]">
        <span class='sr-only'>Rechercher</span>
        <i class="fas fa-search text-[22px] text-white"></i>
      </button>
    </div>
  `



  return header;
}
