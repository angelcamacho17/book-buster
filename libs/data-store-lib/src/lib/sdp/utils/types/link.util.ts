import { containsString } from './string.util';

/**
 * Checks if a certain link is external or not
 * @param link The link you want to check upon -> Return strightforward
 * @return boolean
 */
export function isExternalLink(link: string): boolean {
  return (containsString(link, 'http://') || containsString(link, 'https://'));
}
