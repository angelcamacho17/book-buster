/**
 * Checks if a string contains a value
 * @param value The string you want to check upon
 * @param subString The string it has to contain
 * @return boolean true when string contains needle
 */
export function containsString(value: string, needle: string): boolean {
  return value.toLocaleLowerCase().indexOf(needle.toLocaleLowerCase()) !== -1;
}

/**
 * Checks if a string contains a value without converting to lowercase
 * @param value The string you want to check upon
 * @param needle The string needle it has to contain
 * @return boolean true when string contains needle
 */
export function containsStringLiteral(value: string, needle: string): boolean {
  return value.indexOf(needle) !== -1;
}

/**
 * Check if string is typeOf string
 * @param value The value you want to know is a string
 * @return boolean true string is typeof string
 */
export function isString(value: any): boolean {
  return typeof value === 'string';
}

/**
 * Capitalize the first letter of the given string
 * @param value A string to capatilize the first letter of
 * @return string String with capatilized first letter
 */
export function capitalizeFirstLetter(value: string): string {
  return value.charAt(0).toUpperCase() + value.substring(1);
}

/**
 * Trims all the spaces and splits on a defines character
 * @param value The value to trim and split
 * @return string trimmed string
 */
export function trimAllSpaces(value: string): string {
  return value.replace(/ /g, '');
}
