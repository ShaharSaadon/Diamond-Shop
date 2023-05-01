import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'signup-template',
  templateUrl: './signup.template.driven.component.html',
  styleUrls: ['./signup.template.driven.component.scss']
})
export class SignupComponent {

  first = ''
  onSubmit(form: NgForm) {
    console.log('form.value:', form.value)
    form.reset()
  }
}
