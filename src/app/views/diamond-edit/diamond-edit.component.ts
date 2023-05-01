import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, filter, map, switchMap } from 'rxjs';
import { Diamond } from 'src/app/models/diamond.model';
import { DiamondService } from 'src/app/services/diamond.service';

@Component({
  selector: 'app-diamond-edit',
  templateUrl: './diamond-edit.component.html',
  styleUrls: ['./diamond-edit.component.scss']
})
export class DiamondEditComponent implements OnInit {

  constructor(
    private diamondService:  DiamondService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  diamond = this.diamondService.getEmptyDiamond() as Diamond
  subscription!: Subscription

  ngOnInit(): void {

    this.subscription = this.route.data
    .pipe(
        map(data => data['diamond']),
        filter(diamond => diamond)
    )
    .subscribe(diamond => this.diamond = diamond)

  //   this.subscription = this.route.params
  //     .pipe(
  //       map(params => params['id']),
  //       filter(id => id),
  //       switchMap(id => this.diamondService.getById(id))
  //     )
  //     .subscribe(diamond => this.diamond = diamond)
  }

  onSaveDiamond() {
    this.diamondService.save(this.diamond)
        .subscribe({
            next: () => this.router.navigateByUrl('/'),
            error: err => console.log('err:', err)
        })
}

ngOnDestroy(): void {
  this.subscription?.unsubscribe()
}


}
