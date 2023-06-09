
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, filter, map, switchMap } from 'rxjs';
import { Diamond } from 'src/app/models/diamond.model';
import { DiamondService } from 'src/app/services/diamond.service';
import { LoaderService } from 'src/app/services/loader.service';
import { nameTaken, startWithNumber } from 'src/app/validators/name-takem';

@Component({
  selector: 'app-diamond-edit',
  templateUrl: './diamond-edit.component.html',
  styleUrls: ['./diamond-edit.component.scss']
})
export class DiamondEditComponent implements OnInit {

  form!: FormGroup
  diamond : Diamond | null=null

  constructor(
    private diamondService:  DiamondService,
    private router: Router,
    private route: ActivatedRoute,
    private fb:FormBuilder,
    private loaderService:LoaderService
  ) {
    this.form = this.fb.group({
        name: ['',[Validators.required,startWithNumber],[nameTaken]],
        price: 0,
        collection: '',
        imgUrl: ''
    })
   }

  subscription!: Subscription

  ngOnInit(): void {
    this.loaderService.setIsLoading(false)
    this.subscription = this.route.data
    .pipe(map(data => data['diamond']))
    .subscribe(diamond => {
      this.diamond = diamond
      this.diamond && this.form.patchValue(this.diamond)
      })
  }

  onSaveDiamond() {
    const diamond = {...this.diamond, ...this.form.value} as Diamond
    this.diamondService.save(diamond)
        .subscribe({
            next: () => this.router.navigateByUrl('/'),
            error: err => console.log('err:', err)
        })
}

ngOnDestroy(): void {
  this.subscription?.unsubscribe()
}


}
