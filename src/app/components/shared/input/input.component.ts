import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
})
export class InputComponent implements OnInit {
  @Input() inputFormControl: FormControl;
  @Input() title: string;
  @Input() type: string = 'text';
  constructor() {}

  ngOnInit() {}
}
