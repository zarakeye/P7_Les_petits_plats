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