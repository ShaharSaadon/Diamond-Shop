import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Diamond } from 'src/app/models/diamond.model';
import { DiamondService } from 'src/app/services/diamond.service';


@Component({
  selector: 'diamond-index',
  templateUrl: './diamond-index.component.html',
  styleUrls: ['./diamond-index.component.scss']
})
export class DiamondIndexComponent {
  constructor(private diamondService: DiamondService) { }
  subscription!: Subscription
  diamonds: Diamond[] | null = null
  diamonds$!: Observable<Diamond[]>

  ngOnInit() {
    this.diamonds$ = this.diamondService.diamonds$
    // this.subscription = this.diamondService.diamonds$.subscribe(diamonds => {
    //     this.diamonds = diamonds
    // })
  }

  onRemoveDiamond(diamondId: string) {
    this.diamondService.remove(diamondId)
        .subscribe({
            error: err => console.log('err:', err)
        })
}

ngOnDestroy(): void {
  this.subscription?.unsubscribe()
}

}
