import { Diamond } from "./diamond.model";

export interface CartItem {
  product: Diamond;
  price: number;
  quantity: number;
}

export class ShoppingCart {
  items: CartItem[];

  constructor(items: CartItem[]) {
    this.items = items;
  }

  get totalItems(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  get totalPrice(): number {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}