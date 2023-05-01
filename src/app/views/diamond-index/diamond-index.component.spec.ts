import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiamondIndexComponent } from './diamond-index.component';

describe('UserIndexComponent', () => {
  let component: DiamondIndexComponent;
  let fixture: ComponentFixture<DiamondIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiamondIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiamondIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
