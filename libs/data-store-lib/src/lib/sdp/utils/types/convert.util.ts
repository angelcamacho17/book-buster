/**
 * Converts any to string
 * @param value the value that needs to be converted
 * @return converted string
 */
export function toString(value: any): string {
  if (typeof value === 'object') {
    return value.toString();
  }
  return String(value);
}

/**
 * Convert to boolean
 * @param val the value that needs to be converted
 * @return boolean
 */
export function toBoolean(val: any, typesExceptions?: Array<IBooleanException>): boolean {
  if (typesExceptions !== undefined) {
    const buffer = checkBooleanExceptions(val, typesExceptions);
    if (buffer !== undefined) {
      return buffer;
    }
  }

  if (val === 'true') {
    return true;
  } else if (val === 'false') {
    return false;
  } else {
    return Boolean(val);
  }
}


/**
 * Converts to number return -1 when object is passed
 * @param value value to be converted
 * @return number || -1 when Object
 */
export function toNumber(value: any): number {
  if (typeof value !== 'object') {
    return Number(value);
  }
  return -1;
}


/**
 * Checks for Boolean exceptions and returns the correct value
 * @param val The boolean convert value
 * @param arr The array with exceptions
 * @return boolean || undefined when no expection met
 */
function checkBooleanExceptions(val: any, arr: Array<IBooleanException>): boolean {
  for (const i of arr) {
    if (i.exception === val) {
      return i.value;
    }
  }
  return undefined;
}


export interface IBooleanException {
  exception: string;
  value: boolean;
}
