/**
 * Force coercion from value to pixel CSS value
 * @param value value to coerce to CSS pixel value
 *
 * ex : coerceCSSPixelValue(1) ==> '1px'
 * ex : coerceCSSPixelValue('2px') ==> '2px'
 * ex : coerceCSSPixelValue(null) ==> ''
 */
export function coerceCSSPixelValue(value: any): string {
  if (value == null) {
    return '';
  }
  return typeof value === 'string' ? value : `${value}px`;
}
