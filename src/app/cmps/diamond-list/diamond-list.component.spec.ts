import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiamondListComponent } from './diamond-list.component';

describe('DiamondListComponent', () => {
  let component: DiamondListComponent;
  let fixture: ComponentFixture<DiamondListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiamondListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiamondListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
