import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Diamond } from 'src/app/models/diamond.model';
import { ShoppingCart } from 'src/app/models/shopping.cart-model';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  cart: ShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) {
    this.cart = this.shoppingCartService.getCart();
  }

  removeItem(diamondId: string): void {
    this.shoppingCartService.removeItem(diamondId);
    this.cart = this.shoppingCartService.getCart();
  }

  updateQuantity(product: Diamond, quantity: number): void {
    this.shoppingCartService.updateQuantity(product, quantity);
    this.cart = this.shoppingCartService.getCart();
  }

  getTotal(): number {
    return this.shoppingCartService.getTotal();
  }
}


