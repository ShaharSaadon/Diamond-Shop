import { Injectable } from '@angular/core';
import { ShoppingCart,CartItem } from '../models/shopping.cart-model'
import { BehaviorSubject, Observable } from 'rxjs';
import { Diamond } from '../models/diamond.model';

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {
  private cartSubject: BehaviorSubject<ShoppingCart>;
  public cart$: Observable<ShoppingCart>;

  constructor() {
    const initialCart = new ShoppingCart([]);
    this.cartSubject = new BehaviorSubject<ShoppingCart>(initialCart);
    this.cart$ = this.cartSubject.asObservable();
  }

  addItem(cartItem: CartItem): void {
    const currentCart = this.cartSubject.getValue();
    const existingItem = currentCart.items.find(item => item.product.name === cartItem.product.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentCart.items.push({ product: cartItem.product, price: cartItem.price, quantity: cartItem.quantity });
    }
    this.cartSubject.next(currentCart);
  }

  removeItem(productId: string): void {
    const currentCart = this.cartSubject.getValue();
    const itemIndex = currentCart.items.findIndex(item => item.product._id === productId);
    if (itemIndex !== -1) {
      currentCart.items.splice(itemIndex, 1);
    }
    this.cartSubject.next(currentCart);
  }

  updateQuantity(product: Diamond, quantity: number): void {
    const currentCart = this.cartSubject.getValue();
    const existingItem = currentCart.items.find(item => item.product === product);
    if (existingItem) {
      existingItem.quantity = quantity;
      if (existingItem.quantity <= 0) {
        if(product._id) this.removeItem(product._id);
      }
    }
    this.cartSubject.next(currentCart);
  }

  getCart(): ShoppingCart {
    return this.cartSubject.getValue();
  }

  clearCart(): void {
    const initialCart = new ShoppingCart([]);
    this.cartSubject.next(initialCart);
  }

  getTotal(): number {
    const currentCart = this.cartSubject.getValue();
    let total = 0;
    for (let item of currentCart.items) {
      total += (item.price * item.quantity);
    }
    return total;
  }
}