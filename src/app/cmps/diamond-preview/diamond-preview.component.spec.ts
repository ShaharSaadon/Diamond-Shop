import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiamondPreviewComponent } from './diamond-preview.component';

describe('DiamondPreviewComponent', () => {
  let component: DiamondPreviewComponent;
  let fixture: ComponentFixture<DiamondPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiamondPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiamondPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
