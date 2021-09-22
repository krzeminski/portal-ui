import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit {
  emailForm;

  constructor(private formBuilder: FormBuilder) {
    this.emailForm = this.formBuilder.group({
      email: '',
    });
  }
  ngOnInit(): void {}

  onSubmit(){}
}
