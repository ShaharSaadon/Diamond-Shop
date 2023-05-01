import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Diamond } from 'src/app/models/diamond.model';

@Component({
  selector: 'diamond-preview',
  templateUrl: './diamond-preview.component.html',
  styleUrls: ['./diamond-preview.component.scss']
})
export class DiamondPreviewComponent {
  @Input() diamond!: Diamond
  @Output() remove = new EventEmitter<string>()


  onRemoveDiamond() {
      this.remove.emit(this.diamond._id)
  }
}
