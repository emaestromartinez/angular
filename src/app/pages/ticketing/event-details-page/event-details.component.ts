import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartEvent, IEventInfo } from '../ticketing-page.interface';
import { TicketingPageService } from '../ticketing-page.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _ticketingPageService: TicketingPageService
  ) {}

  @Input() selectedEventInfo: IEventInfo;

  form: FormGroup;

  shoppingCart: Map<string, CartEvent[]> = new Map<string, CartEvent[]>();

  isLoading = false;
  subscriptions: Subscription[] = [];

  get sessionsArray() {
    return this.form?.get('sessions') as FormArray;
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      sessions: this._fb.array([]),
    });
    this.selectedEventInfo.sessions.forEach((session) => {
      this.sessionsArray.push(
        this._fb.control(0, [
          Validators.min(0),
          Validators.max(+session.availability),
        ])
      );
    });

    this._ticketingPageService.cart$.subscribe((cart) => {
      console.log('cart', cart);
      console.log('shoppingCart', this.shoppingCart);
      this.shoppingCart = cart;
    });
  }

  subtract(index: number) {
    const sessionFormControl = this.sessionsArray.at(index);
    if (sessionFormControl.value - 1 >= 0) {
      sessionFormControl.setValue(sessionFormControl.value - 1);
    }
  }

  add(index: number) {
    const maxValue = this.selectedEventInfo.sessions[index].availability;
    const sessionFormControl = this.sessionsArray.at(index);
    if (sessionFormControl.value < maxValue) {
      sessionFormControl.setValue(sessionFormControl.value + 1);
    }
  }

  addToCart() {
    this.sessionsArray.controls.forEach((sessionFormControl, index) => {
      const ticketAmount = sessionFormControl.value;
      console.log('ticket amount: ', ticketAmount);
      if (sessionFormControl.value) {
        this._ticketingPageService.addEvent(
          this.selectedEventInfo.event.title,
          this.selectedEventInfo.sessions[index].date,
          ticketAmount
        );
        // eventName: string, date: string, tickets: number
      }
    });
  }

  openDetails(detailsID: string) {
    if (!this.isLoading) {
      this._router.navigate([detailsID], { relativeTo: this._route });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
