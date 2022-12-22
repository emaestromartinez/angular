import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  constructor(private _headerService: HeaderService) {}

  input: any;
  searchLog: string[] = [];

  ngOnInit() {
    this.input = document.getElementById('header-input');
  }
  newSearch(searchString: string) {
    if (searchString) {
      if (this.searchLog.length === 4) {
        this.searchLog.shift();
      }
      this.searchLog.push(searchString);
      this._headerService.searchFilter$.next(searchString);
    }
  }
  onSubmit(event: SubmitEvent) {
    this.newSearch(this.input.value);
    event.preventDefault();
  }
}
