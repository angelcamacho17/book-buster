import { ShoppingItem } from './shopping,model';

export interface AppState {
  shopping: ShoppingItem[],
  editedItem: ShoppingItem
}
