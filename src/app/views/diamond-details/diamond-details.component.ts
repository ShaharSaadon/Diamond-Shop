import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable,map, switchMap, } from 'rxjs';
import { Diamond } from 'src/app/models/diamond.model';
import { DiamondService } from 'src/app/services/diamond.service';

@Component({
  selector: 'diamond-details',
  templateUrl: './diamond-details.component.html',
  styleUrls: ['./diamond-details.component.scss']
})
export class DiamondDetailsComponent {
  constructor(
    private diamondService: DiamondService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  // location =  inject(Location)
  diamond: Diamond | null = null
  diamond$!: Observable<Diamond>

  ngOnInit(): void {

    this.diamond$ = this.route.data.pipe(map(data => data['diamond']))
    
    // this.diamond$ = this.route.params.pipe(
    //         switchMap(params => this.diamondService.getById(params['id']))
    //     )
  }

  onBack() {
    this.router.navigateByUrl('/')
}

}
