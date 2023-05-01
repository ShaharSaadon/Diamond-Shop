import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiamondEditComponent } from './diamond-edit.component';

describe('DiamondEditComponent', () => {
  let component: DiamondEditComponent;
  let fixture: ComponentFixture<DiamondEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiamondEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiamondEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
