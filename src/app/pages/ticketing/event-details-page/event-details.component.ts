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
import { Subject, takeUntil } from 'rxjs';
import { TRASH_IMAGE } from '../ticketing-page.constants';
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

  unsubscribe$: Subject<void> = new Subject<void>();

  trashImage = TRASH_IMAGE;
  form: FormGroup;

  shoppingCart: [string, CartEvent[]][];

  isLoading = false;

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

    const cartSub = this._ticketingPageService.cart$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((cart) => {
        this.shoppingCart = [...cart.entries()].map((event) => {
          let filteredSessions;
          if (event[0] !== this.selectedEventInfo.event.title) {
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

    this._ticketingPageService.updateEventCart(
      this.selectedEventInfo.event.title
    );
  }

  removeEvent(eventName: string, eventDate: string) {
    this._ticketingPageService.removeEvent(eventName, eventDate);
    this._ticketingPageService.updateCart();
  }

  openDetails(detailsID: string) {
    if (!this.isLoading) {
      this._router.navigate([detailsID], { relativeTo: this._route });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
