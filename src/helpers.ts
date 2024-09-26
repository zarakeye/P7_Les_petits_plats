export function isAvailableSearchTerm(searchTerm: string): boolean {
  return searchTerm.length >= 3
}

/**
 * Recursively extracts JSON data from a given object, returning a new object with the same structure but without nested objects.
 *
 * @param {any} res - The object to extract JSON data from.
 * @return {Promise<any>} A promise resolving to the extracted JSON data.
 */
export function extractJSONData(res: any): Promise<any> {
  const beginIndex = res.indexOf('[');
  const endIndex = res.lastIndexOf(']');
  const json = res.substring(beginIndex, endIndex + 1);
  return json;
}

/**
 * Capitalizes the first letter of the given string, and lowercases the rest of the string.
 *
 * @param {string} str The string to capitalize.
 * @return {string} The capitalized string.
 */
export function capitalizeFirstLetter(str: string): string {
  str.trim();
  let charArray = str.split(' ');
  charArray[0] = charArray[0].charAt(0).toUpperCase() + charArray[0].slice(1);
  for (let i = 1; i < charArray.length; i++) {
    charArray[i] = charArray[i].toLowerCase()
  }
  str = charArray.join(' ');
  
  return str;
}

/**
 * Creates a custom event with the given name and detail, and dispatches it
 * from the given element.
 *
 * @param {HTMLElement} element The element to dispatch the event from.
 * @param {string} event The name of the event.
 * @param {any} detail The detail of the event.
 */
export function createEventAndDispatch(element: HTMLElement, event: string, detail: any) {
  const eventToDispatch = new CustomEvent(event, {
    bubbles: true,
    detail,
  });
  element.dispatchEvent(eventToDispatch);
}


export function escapeSearchTerm(searchTerm: string): string {
  return searchTerm.toLowerCase().trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\//g, '&#47;')
    ;
}

/**
 * Checks if a given string is a substring of another given string, ignoring case.
 *
 * @param {string} a The substring to search for.
 * @param {string} b The string to search in.
 * @return {boolean} true if `a` is a substring of `b`, false otherwise.
 */
export function firstStringInSecondString(a: string, b: string): boolean {
  const aLowerCase = a.trim().toLowerCase();
  const bLowerCase = b.trim().toLowerCase();
  for (let i = 0; i < bLowerCase.length - aLowerCase.length; i++) {
    let j: number;
    for (j = 0; j < aLowerCase.length; j++) {
      if (bLowerCase[i + j] !== aLowerCase[j]) {
        break;
      }
    }
    if (j === aLowerCase.length) {
      return true;
    }
  }

  return false;
}


function insertionSort(array: string[]): string[] {
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    
    while (j >= 0 && array[j].localeCompare(key, undefined, { sensitivity: 'base' }) > 0) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = key;
  }

  return array;
}

/**
 * Sorts a given array of strings in ascending order, using the heapsort algorithm.
 * The time complexity of this algorithm is O(n log n).
 * @param {string[]} array The array of strings to be sorted.
 * @return {string[]} The sorted array of strings.
 */
function heapSort(array: string[]): string[] {
  for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
    heapify(array, i, array.length);
  }

  for (let i = array.length - 1; i > 0; i--) {
    swap(array, 0, i);
    heapify(array, 0, i);
  }

  return array;
}

/**
 * Swaps two elements in a given array of strings.
 * @param {string[]} array The array of strings.
 * @param {number} i The index of the first element to be swapped.
 * @param {number} j The index of the second element to be swapped.
 */
function swap(array: string[], i: number, j: number): void {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}


/**
 * Builds a max heap from a given array of strings, at the given index `i` and heap size `heapSize`.
 * The time complexity of this algorithm is O(log n).
 * @param {string[]} array The array of strings to be turned into a max heap.
 * @param {number} i The index of the root of the subtree to be turned into a max heap.
 * @param {number} heapSize The size of the heap.
 */
function heapify(array: string[], i: number, heapSize: number): void {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < heapSize && String(array[left]).localeCompare(array[largest], undefined, { sensitivity: 'base' }) > 0) {
    largest = left;
  }

  if (right < heapSize && String(array[right]).localeCompare(array[largest], undefined, { sensitivity: 'base' }) > 0) {
    largest = right;
  }

  if (largest !== i) {
    swap(array, i, largest);
    heapify(array, largest, heapSize);
  }
}

/**
 * Finds the median of the first, middle and last elements of a given array of strings.
 * It returns the median of the three elements.
 * The time complexity of this algorithm is O(1).
 * @param {string[]} array The array of strings from which to find the median.
 * @returns {string} The median of the three elements.
 */
function medianOfThree(array: string[]): string {
  const medianIndex = Math.floor(array.length / 2);
  const first = String(array[0]);
  
  const middle = String(array[medianIndex]);
  const last = String(array[array.length - 1]);
  if (first.localeCompare(middle, undefined, { sensitivity: 'base' }) < 0 && middle.localeCompare(last, undefined, { sensitivity: 'base' }) < 0) {
    return middle;
  } else if (first.localeCompare(last, undefined, { sensitivity: 'base' }) < 0 && last.localeCompare(middle, undefined, { sensitivity: 'base' }) < 0) {
    return middle;
  } else {
    return first;
  }
}

/**
 * Sorts a given array of strings in ascending order, using the introsort algorithm.
 * The algorithm is a hybrid sorting algorithm that provides both quicksort and heapsort as fallbacks.
 * It starts with quicksort and switches to heapsort when the recursion depth exceeds a level based on (log N).
 * The time complexity of this algorithm is O(n log n) on average, and O(n^2) in the worst case.
 * @param {string[]} array The array of strings to be sorted.
 * @param {number} depthMax The maximum recursion depth. If not specified, it is set to 2 * Math.log(array.length).
 * @returns {string[]} The sorted array of strings.
 */
export function introSort(array: string[], depthMax: number = 2 * Math.floor(Math.log(array.length))): string[] {
  if (array.length <= 16) {
    return insertionSort(array);
  } else if (depthMax === 0) {
    return heapSort(array);
  } else {
    const pivot = medianOfThree(array); // Choose the median of the array as the pivot
    const left = [];
    const right = []
    
    for (const element of array) {
      if (String(element).localeCompare(pivot, undefined, { sensitivity: 'base' }) < 0) {
        left.push(element);
      } else {
        right.push(element);
      }
    }

    return [...introSort(left, depthMax - 1), pivot, ...introSort(right, depthMax - 1)];
  }
}