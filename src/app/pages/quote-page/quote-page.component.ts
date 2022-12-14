import { Component, OnInit } from '@angular/core';
import { Quote, QuotePageService } from './quote-page.service';

@Component({
  selector: 'app-quote-page',
  templateUrl: './quote-page.component.html',
})
export class QuotePageComponent implements OnInit {
  constructor(private _quotePageService: QuotePageService) {}
  quoteOfTheDay: Quote;

  ngOnInit() {
    this._quotePageService.getQuoteOfTheDay().subscribe({
      next: (quoteOfTheDay) => {
        this.quoteOfTheDay = quoteOfTheDay;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
