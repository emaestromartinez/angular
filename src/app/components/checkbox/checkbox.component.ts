import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface SelectOption {
  value: string;
  name: string;
}
@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent implements OnInit {
  @Input() checkboxFormControl: FormControl;
  @Input() checkboxText: string;

  constructor() {}
  ngOnInit() {}
}
