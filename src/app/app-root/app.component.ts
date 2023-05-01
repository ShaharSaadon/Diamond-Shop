import { Component,OnInit } from '@angular/core';
import { DiamondService } from '../services/diamond.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(private diamondService: DiamondService) { }

  ngOnInit(): void {
    this.diamondService.query().subscribe({
      error: (err) => console.log('err:', err)
    })
  }
}
