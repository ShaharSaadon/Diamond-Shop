import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupModelDrivelComponent } from './signup-model-driven.component';

describe('SignupModelDrivelComponent', () => {
  let component: SignupModelDrivelComponent;
  let fixture: ComponentFixture<SignupModelDrivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupModelDrivelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupModelDrivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
