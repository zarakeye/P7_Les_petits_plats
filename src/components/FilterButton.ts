import { capitalizeFirstLetter, createEventAndDispatch } from "../helpers";
import { Filter } from "../modules/filter";

export const UnselectFilterEvent = 'unselect-filter-event';

export function FilterButton(filter: Filter) {
  const button: HTMLButtonElement = document.createElement('button');
  button.id = `${filter.type}-${filter.id}-unselect-button`;
  button.type = 'button';
  button.classList.add(`current-${filter.type}`, 'z-0', 'active', 'text-[14px]', 'text-center', 'bg-yellow', 'text-gray', 'rounded-[10px]', 'px-[18px]', 'py-[17px]', 'mr-[5px]','mb-[21px]', 'first:mt-[79px]');
  button.textContent = `${capitalizeFirstLetter(filter.name)} x`;

  button.addEventListener('click', () => {
    filter.active = false;
    createEventAndDispatch(button, UnselectFilterEvent, { filter: filter });
  })

  return button;
}

export function unselectFilter(event: any, page: HTMLElement) {
  const filter: Filter = event.detail.filter;
  const filterButton = page.querySelector(`#${filter.type}-${filter.id}-unselect-button`);
  filterButton?.remove();

  const domFilter = page.querySelector(`#${filter.type}-${filter.id}`);
  domFilter?.classList.remove('active');
  
  const selectableFiltersMenu = page.querySelector(`#list-of-selectable-${filter.type}s`);
  domFilter && selectableFiltersMenu?.appendChild(domFilter);
  domFilter?.classList.remove('text-left', 'px-[16px]', 'py-[9px]', 'mb-px');
  domFilter?.classList.add('bg-white');
}