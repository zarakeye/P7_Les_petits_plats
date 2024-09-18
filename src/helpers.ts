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

export function capitalizeFirstLetter(str: string) {
  str.trim();
  let charArray = str.split(' ');
  charArray[0] = charArray[0].charAt(0).toUpperCase() + charArray[0].slice(1);
  for (let i = 1; i < charArray.length; i++) {
    charArray[i] = charArray[i].toLowerCase()
  }
  str = charArray.join(' ');
  
  return str;
}

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

export function firstStringInSecondString(a: string, b: string): boolean {
  for (let i = 0; i < b.length - a.length; i++) {
    let j: number;
    for (j = 0; j < a.length; j++) {
      if (b[i + j] !== a[j]) {
        break;
      }
    }
    if (j === a.length) {
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

function swap(array: string[], i: number, j: number): void {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function heapify(array: string[], i: number, heapSize: number): void {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < heapSize && array[left].localeCompare(array[largest], undefined, { sensitivity: 'base' }) > 0) {
    largest = left;
  }

  if (right < heapSize && array[right].localeCompare(array[largest], undefined, { sensitivity: 'base' }) > 0) {
    largest = right;
  }

  if (largest !== i) {
    swap(array, i, largest);
    heapify(array, largest, heapSize);
  }
}

function medianOfThree(array: string[]): string {
  const medianIndex = Math.floor(array.length / 2);
  const first = array[0];
  
  const middle = array[medianIndex];
  const last = array[array.length - 1];
  if (first.localeCompare(middle, undefined, { sensitivity: 'base' }) < 0 && middle.localeCompare(last, undefined, { sensitivity: 'base' }) < 0) {
    return middle;
  } else if (first.localeCompare(last, undefined, { sensitivity: 'base' }) < 0 && last.localeCompare(middle, undefined, { sensitivity: 'base' }) < 0) {
    return middle;
  } else {
    return first;
  }
}

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
      if (element.localeCompare(pivot, undefined, { sensitivity: 'base' }) < 0) {
        left.push(element);
      } else {
        right.push(element);
      }
    }

    return [...introSort(left, depthMax - 1), pivot, ...introSort(right, depthMax - 1)];
  }
}