import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiamondFilterComponent } from './diamond-filter.component';

describe('DiamondFilterComponent', () => {
  let component: DiamondFilterComponent;
  let fixture: ComponentFixture<DiamondFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiamondFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiamondFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
