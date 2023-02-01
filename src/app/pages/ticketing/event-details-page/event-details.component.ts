import { TmplAstRecursiveVisitor } from '@angular/compiler';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, iif, Subscription } from 'rxjs';
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

  shoppingCart: [string, CartEvent[]][];

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
      this.shoppingCart = [...cart.entries()].map((event) => {
        let filteredSessions;
        if (event[0] !== this.selectedEventInfo.event.title) {
          const anyTicketCarted: number = event[1].findIndex((session) => {
            if (session.tickets > 0) return true;
            return false;
          });
          filteredSessions = event[1];
        } else {
          filteredSessions = event[1].filter((session, index) => {
            if (session.tickets > 0) {
              this.sessionsArray.at(index).setValue(session.tickets);
              return session;
            }
            return false;
          });
        }
        return [event[0], filteredSessions];
      });
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
      this._ticketingPageService.addEvent(
        this.selectedEventInfo.event.title,
        this.selectedEventInfo.sessions[index].date,
        ticketAmount
      );
    });

    this._ticketingPageService.updateCart(this.selectedEventInfo.event.title);
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
