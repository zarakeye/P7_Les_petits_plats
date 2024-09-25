import { FilterType } from "../modules/recipe";
import { handleFilterDeactivation } from "./ActivableFilterTag";

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
      class="unselect-filter-button z-0 active text-[14px] text-left text-black bg-yellow rounded-[10px] pl-[18px] pr-[38px] py-[17px] mr-[5px] mb-[21px]"
    >
      ${ filter }
    </button>
    <div class="absolute w-[17px] h-[17px] right-[18px] top-[17px] text-black">
      <img src="icons/close_black.svg">
    </div>
  `;

  buttonWrapper.addEventListener('click', () => unselectFilter(filter, type));

  return buttonWrapper;
}

/**
 * Unselects a filter from the active filters.
 * It just calls handleFilterDeactivation with the filter name and type.
 * @param {string} filter - the name of the filter
 * @param {FilterType} type - the type of the filter
 */
export function unselectFilter(filter: string, type: FilterType) {
  handleFilterDeactivation(filter, type);
}
