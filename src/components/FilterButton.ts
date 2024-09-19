import { createEventAndDispatch } from "../helpers";
import { FilterType } from "../modules/recipe";
import { updateCardsAndFiltersTagsWhenAFilterIsRemoved } from "./FilterTag";

export const UnselectFilterEvent = 'unselect-filter-event';

  /**
   * Creates a button representing a filter that is currently active.
   * It dispatches an event when clicked to remove the filter from the active filters.
   * @param {string} filter - the name of the filter
   * @param {FilterType} type - the type of the filter
   * @returns {HTMLElement} The button element
   */
export function FilterButton(filter: string, type: FilterType): HTMLDivElement {
  const buttonWrapper = document.createElement('div');
  buttonWrapper.classList.add('relative');
  buttonWrapper.innerHTML = `
    <button
      type="button"
      class="current-${type} z-0 active text-[14px] text-left text-black bg-yellow rounded-[10px] pl-[18px] pr-[38px] py-[17px] mr-[5px] mb-[21px]"
    >
      ${ filter }
    </button>
    <div class="absolute w-[17px] h-[17px] right-[18px] top-[17px] text-black">
      <i class="fa fa-times" aria-hidden="true"></i>
    </div>
  `;

  buttonWrapper.addEventListener('click', () => {
    createEventAndDispatch(buttonWrapper, UnselectFilterEvent, {
      filter: filter,
      type: type
    });
  });

  return buttonWrapper;
}

  /**
   * Handles the event of unselecting a filter.
   * When a filter is unselected, it is removed from the active filters list,
   * and the matching recipes are updated.
   * @param {object} event - The event detail object containing the filter and type of the filter.
   * @param {HTMLElement} page - The page element containing the recipe cards and filters.
   */
export function unselectFilter(event: any, page: HTMLElement) {
  const filter: string = event.detail.filter;
  const filterType: FilterType = event.detail.type;
  
  const filtersTypesList = ['ingredient', 'appliance', 'ustensil'] as FilterType[];

  updateCardsAndFiltersTagsWhenAFilterIsRemoved(filter, filterType, filtersTypesList, page);
}
