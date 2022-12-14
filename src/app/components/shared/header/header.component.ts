import { Component, OnInit } from '@angular/core';
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
      this._headerService.searchFilter$.next(searchString.toUpperCase());
    }
  }

  pastSearchClick(search: string) {
    this._headerService.searchFilter$.next(search.toUpperCase());
  }

  onSubmit(event: SubmitEvent) {
    this.newSearch(this.input.value);
    event.preventDefault();
  }
}
