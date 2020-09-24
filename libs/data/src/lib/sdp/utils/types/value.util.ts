/**
 * Check if value (any) is defined
 * @param any The value to be checked for defined
 * @return boolean value is defined
 */
export function isDefined(value: any): boolean {
  return value !== undefined && value !== null;
}

/**
 * Check if value (any) is undefined
 * @param any The value to be checked for undefined
 * @return boolean value is undefined
 */
export function isUndefined(value: any): boolean {
  return !isDefined(value);
}
