export function isAvailableSearchTerm(searchTerm: string): boolean {
  return searchTerm.length >= 3;
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

export function deleteNoneFirstOccurrence(array: string[]): string[] {
  for (let i = 0; i < array.length; i++) {
    for (let j = array.length - 1; j > i; j--) {
      if (array[j] === array[i]) {
        array.splice(j, 1);
      }
    }
  }
  return array;
}

export function capitalizeFirstLetter(str: string) {
  str.trim();
  let charArray = str.split(' ');
  charArray[0] = charArray[0].charAt(0).toUpperCase() + charArray[0].slice(1);
  for (let i = 1; i < charArray.length; i++) {
    charArray[i] = charArray[i].toLowerCase();
  }
  str = charArray.join(' ');
  return str;
}

export function toLowerCase(str: string) {
  str.trim();
  let charArray = str.split(' ');
  for (let i = 0; i < charArray.length; i++) {
    charArray[i] = charArray[i].toLowerCase();
  }
  str = charArray.join(' ');
  return str;
}