import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IEventInfo } from '../ticketing-page.interface';
import { TicketingPageService } from '../ticketing-page.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _fb: FormBuilder
  ) {}

  @Input() selectedEventInfo: IEventInfo;

  form: FormGroup;

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
    console.log('maxValue', maxValue);
    console.log('sessionFormControl', sessionFormControl.value);
    if (sessionFormControl.value < maxValue) {
      sessionFormControl.setValue(sessionFormControl.value + 1);
    }
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
