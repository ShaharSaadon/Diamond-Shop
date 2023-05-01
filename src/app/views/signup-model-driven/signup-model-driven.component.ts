import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-model-driven',
  templateUrl: './signup-model-driven.component.html',
  styleUrls: ['./signup-model-driven.component.scss']
})
export class SignupModelDrivenComponent {
  form!: FormGroup
  constructor(private fb: FormBuilder) {

      this.form = this.fb.group({
          first: ['', [Validators.required], []],  // [initialVal, validators, asyncValidators]
          last: '',
          username: '',
          addresses: this.fb.array([this.getAddressGroup()]),
          newsletter: ''
      })
    }

    onAddAddress() {
      (this.form.controls as any).addresses.push(this.getAddressGroup())
  }

  getAddressGroup() {
      return this.fb.group({
          street: '',
          city: '',
          state: '',
          zip: '',
      })
  }

  ngOnInit(): void {
  }
}
