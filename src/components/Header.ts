import{ SearchBar } from '../components/SearchBar.ts'

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
  `;

  header.appendChild(SearchBar());

  return header;
}
