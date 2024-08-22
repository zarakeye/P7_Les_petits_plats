export function Header() {
  const header = document.createElement('header');
  header.id= 'header';
  header.classList.add('flex', 'flex-col', 'items-center', 'justify-center', 'w-full', 'h-96', 'bg-[url("./../../../public/les_petis_plats_Banner.png")]', 'bg-center', 'bg-cover', 'bg-no-repeat');
  header.innerHTML = `
    <h1 id="header__title" aria-label="title" class="text-5xl font-anton" >Les Petis Plats</h1>
    <p id='hero' aria-label="hero">CHERCHER PARMI PLUS DE 1500 RECETTES DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES</p>
    <div id="search">
      <input id="search__input" type="text" aria-label="Champ de recherche d'une recette, d'un ingrédient, etcetera" placeholder="Rechercher une recette, un ingédient, ...">
      <button id="search__button" type="submit">
        <span class='sr-only'>Rechercher</span>
        <i class="fas fa-search"></i>
      </button>
    </div>
  `;

  return header;
}