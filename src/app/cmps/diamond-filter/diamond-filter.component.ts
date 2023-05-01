import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { DiamondFilter } from 'src/app/models/diamond.model';
import { DiamondService } from '../../services/diamond.service';

@Component({
  selector: 'diamond-filter',
  templateUrl: './diamond-filter.component.html',
  styleUrls: ['./diamond-filter.component.scss']
})

export class DiamondFilterComponent implements OnInit, OnDestroy {
  constructor(private diamondService: DiamondService) { }
  destroySubject$ = new Subject<null>()
  filterSubject$ = new Subject()
  diamondFilter = {} as DiamondFilter

  ngOnInit(): void {

    this.diamondService.diamondFilter$
        .pipe(takeUntil(this.destroySubject$))
        .subscribe(diamondFilter => {
            this.diamondFilter = diamondFilter
        })


    this.filterSubject$
        .pipe(
            takeUntil(this.destroySubject$),
            debounceTime(400),
            distinctUntilChanged()
        )
        .subscribe(() => {
            console.log('calling query');
            this.diamondService.setFilter(this.diamondFilter)
        })
}

onSetFilter(val: string) {
    // console.log('val:', val)
    // this.petService.setFilter(this.petFilter)
    this.filterSubject$.next(val)
}

ngOnDestroy(): void {
    this.destroySubject$.next(null)
    this.destroySubject$.complete()

}


}
