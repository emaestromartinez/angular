import { Component, OnInit } from '@angular/core';
import { SWHeaderService } from './sw-header.service';

@Component({
  selector: 'app-sw-header',
  templateUrl: './sw-header.component.html',
})
export class SWHeaderComponent implements OnInit {
  constructor(private _SWHeaderService: SWHeaderService) {}

  input: any;
  searchLog: string[] = [];

  ngOnInit() {
    this.input = document.getElementById('SWHeader-input');
  }

  newSearch(searchString: string) {
    if (searchString.length < 16) {
      if (
        searchString &&
        !this.searchLog.includes(searchString.toUpperCase())
      ) {
        if (this.searchLog.length === 4) {
          this.searchLog.shift();
        }
        this.searchLog.push(searchString.toUpperCase());
      }
      this._SWHeaderService.searchFilter$.next(searchString.toUpperCase());
    }
  }

  pastSearchClick(search: string) {
    this._SWHeaderService.searchFilter$.next(search.toUpperCase());
  }

  onSubmit(event: SubmitEvent) {
    this.newSearch(this.input.value);
    event.preventDefault();
  }
}
