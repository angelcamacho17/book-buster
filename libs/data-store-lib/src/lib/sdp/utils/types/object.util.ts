/**
 * Checks if an object is Empty or not
 * @param obj the object that needs to be evaluated
 * @return boolean
 */
export function isEmptyObject(obj): boolean {
  if (obj instanceof Object && obj != null) {
    return Object.keys(obj).length === 0;
  }
  return true;
}
