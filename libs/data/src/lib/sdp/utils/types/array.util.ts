/**
 * Splices a value from a array. This method is quite a bit faster then the original splice
 * But it does rearange the array
 * @param arr The array that should be spliced
 * @param value The value you want to splice
 * @param preserveOrder Preserve the Array order (slower)
 */
export function spliceArrayOnValue(arr: Array<any>, value: any, preserveOrder: boolean = false): void {
  const index = arr.indexOf(value);
  if (index !== -1) {
    spliceArrayOnIndex(arr, index, preserveOrder);
  }
}

/**
 * Splices a value from a array with the given index.
 * @param arr The array that should be spliced
 * @param index The value you want to splice
 * @param preserveOrder Preserve the Array order (slower)
 */
export function spliceArrayOnIndex(arr: Array<any>, index: any, preserveOrder: boolean = false): void {
  if (preserveOrder) {
    arr.splice(index, 1);
  } else {
    const l = arr.length - 1;
    arr[index] = arr[l];
    arr.pop();
  }
}

/**
 * Filter all duplicates from a array
 * @param arr The array you want to filter
 */
export function filterArrayDuplicates(arr: Array<any>): Array<any> {
  const seen = {};
  const out = [];
  const len = arr.length;
  let j = 0;
  for (let i = 0; i < len; i++) {
    const item = arr[i];
    if (seen[item] !== 1) {
      seen[item] = 1;
      out[j++] = item;
    }
  }
  return out;
}

export function filterObjectArrayByQueries(arr: Array<any>, ...props: Array<IFilterParam>): Array<any> {
  let data: Array<any> = arr;
  for (const prop of props) {
    data = filterObjectArrayByQuery(data, prop);
  }
  return data;
}

function filterObjectArrayByQuery(arr: Array<any>, filterParam: IFilterParam): Array<any> {
  return filterObjectArrayOtherQuery(arr, filterParam);
}

function filterObjectArrayOtherQuery(arr: Array<any>, filterParam: IFilterParam): Array<any> {
  const out = [];
  const len = arr.length;
  const j = 0;

  if (filterParam.query === undefined) {
    return arr;
  }
  const lowerCaseQuery = filterParam.query.toString().toLocaleLowerCase();

  for (let i = 0; i < len; i++) {
    const item = arr[i];
    if (item[filterParam.propertyName].toString().toLocaleLowerCase().indexOf(lowerCaseQuery) !== -1) {
      out.push(item);
    }
  }

  return out;
}

export function filterArrayByQuery(arr: Array<any>, query: any): Array<any> {
  return filterStringArrayByQuery(arr, query);
}

function filterStringArrayByQuery(arr: Array<string>, query: string): Array<any> {
  const out = [];
  const len = arr.length;
  const j = 0;

  query = query.toString().toLocaleLowerCase();

  for (let i = 0; i < len; i++) {
    const item = arr[i];
    if (item.toString().toLocaleLowerCase().indexOf(query) !== -1) {
      out.push(item);
    }
  }

  return out;
}

/**
 * Force coercion to Array (unless value is already type Array)
 * @param data data (any or array)
 */
export function coerceArray(data: any | Array<any>): Array<any> {
  return Array.isArray(data) ? data : [data];
}

export interface IFilterParam {
  propertyName: string;
  query: any;
}
