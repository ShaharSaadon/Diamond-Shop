import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Diamond } from 'src/app/models/diamond.model';

@Component({
  selector: 'diamond-list',
  templateUrl: './diamond-list.component.html',
  styleUrls: ['./diamond-list.component.scss']
})
export class DiamondListComponent {
  @Input() diamonds!: Diamond[] | null
  @Output() remove = new EventEmitter<string>()
}
