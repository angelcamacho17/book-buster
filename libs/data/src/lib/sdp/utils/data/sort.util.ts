import { isString } from '../types/string.util';

/**
 * Sorts a object array on a object properties/property
 * @param arr The object array you want to sort
 * @param props The propertyName and ASC DESC order
 */
export function sortObjectArray(arr: Array<any>, ...props: Array<ISortParam>) {
  const loop = resolveSortOrders(props);
  const l = props.length;
  arr.sort((a, b) => {
    for (let i = 0; i < l; i++) {
      const prop = props[i].propertyName;
      const order: number = loop[i](a[prop], b[prop]);
      if (order !== 0) {
        return order;
      }
    }
    return 0;
  });
}

/**
 * Sort the array flat
 * @param arr The array to be sorted
 * @param order the order in which the array should be sorted
 */
export function sortArray(arr: Array<any>, order: string | number): void {
  const sortOrder: number = resolveSortOrder(order);
  arr.sort(sort(sortOrder));
}

/**
 * The sort order 1 or 2
 * @param sortOrder The order the sort should be executed
 */
export function sort(sortOrder: number) {
  return (a, b) => {
    if (a === undefined || a === null) {
      return -1 * sortOrder;
    }
    if (b === undefined || b === null) {
      return 1 * sortOrder;
    }

    if (isString(a) && isString(b)) {
      if (a.toLocaleLowerCase() > b.toLocaleLowerCase()) {
        return -1 * sortOrder;
      }
      if (a.toLocaleLowerCase() < b.toLocaleLowerCase()) {
        return 1 * sortOrder;
      }
    } else {
      if (a > b) {
        return -1 * sortOrder;
      }
      if (a < b) {
        return 1 * sortOrder;
      }
    }
    return 0;
  };
}

/**
 * Converts all properties sortOrder to 1 | -1
 * @param props The properties
 */
function resolveSortOrders(props: Array<ISortParam>) {
  const res = [];
  for (const i of props) {
    i.sortOrder = resolveSortOrder(i.sortOrder);
    res.push(sort(i.sortOrder));
  }
  return res;
}

/**
 * Converts ASC | DESC to -1 | 1
 * @param sortOrder The sort order could be a number or a string;n
 */
export function resolveSortOrder(order: string | number): number {
  if (order === 'ASC') {
    return -1;
  } else if (order === 'DESC') {
     return 1;
  }
  return order as number;
}


export interface ISortParam {
  propertyName: string;
  sortOrder?: string | number;
}
