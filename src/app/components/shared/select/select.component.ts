import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface SelectOption {
  value: string;
  name: string;
}
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
})
export class SelectComponent implements OnInit {
  @Input() selectFormControl: FormControl;
  @Input() title: string;
  @Input() options: SelectOption[];

  showOptions: boolean = false;

  constructor() {}
  ngOnInit() {}

  selectedCarBrand(option: SelectOption) {
    this.selectFormControl.setValue(option);
    this.toggleShowOptions();
  }
  toggleShowOptions() {
    this.showOptions = !this.showOptions;
  }
}
