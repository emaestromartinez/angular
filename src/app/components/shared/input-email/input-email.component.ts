import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-email',
  templateUrl: './input-email.component.html',
})
export class InputEmailComponent implements OnInit {
  @Input() inputFormControl: FormControl;
  @Input() title: string;
  constructor() {}

  ngOnInit() {}
}
