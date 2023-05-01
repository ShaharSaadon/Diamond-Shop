import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, switchMap, } from 'rxjs';
import { Diamond } from 'src/app/models/diamond.model';
import { DiamondService } from 'src/app/services/diamond.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'diamond-details',
  templateUrl: './diamond-details.component.html',
  styleUrls: ['./diamond-details.component.scss']
})
export class DiamondDetailsComponent {
  constructor(
    private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService
  ) { }

  // location =  inject(Location)
  diamond: Diamond | null = null
  diamond$!: Observable<Diamond>

  ngOnInit(): void {
    this.loaderService.setIsLoading(false)
    this.diamond$ = this.route.data.pipe(map(data => data['diamond']))

    // this.diamond$ = this.route.params.pipe(
    //         switchMap(params => this.diamondService.getById(params['id']))
    //     )
  }
  addCart(): void {
    if (!this.diamond) {
      return;
    }
    const cartItem = {
      product: this.diamond,
      price: 100,
      quantity: 1
    };
    this.shoppingCartService.addItem(cartItem);
  }

  onBack() {
    this.router.navigateByUrl('/')
  }

}
