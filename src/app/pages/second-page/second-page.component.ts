import { Component, OnInit } from '@angular/core';
import { Quote, SecondPageService } from './second-page.service';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
})
export class SecondPageComponent implements OnInit {
  constructor(private _secondPageService: SecondPageService) {}
  quoteOfTheDay: Quote;

  ngOnInit() {
    this._secondPageService.getQuoteOfTheDay().subscribe((quoteOfTheDay) => {
      this.quoteOfTheDay = quoteOfTheDay;
    });
  }
}
