import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FriendsGroup, Person } from './payments-page.interface';
import { map, Observable } from 'rxjs';
import { ApiTicketingService } from 'src/app/api/ticketing/ticketing.service';
import { ApiPaymentsService } from 'src/app/api/payments/payments.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentsPageService {
  constructor(
    private _httpClient: HttpClient,
    private _apiPaymentsService: ApiPaymentsService
  ) {}

  getFriendsGroup(): Observable<FriendsGroup> {
    return this._apiPaymentsService.getFriendsGroup('mockID').pipe(
      map((result) => {
        const members = result.members.map((member) => {
          const payments = member.payments.map((payment) => {
            return {
              id: payment.id,
              amount: payment.amount,
              description: payment.description,
              date: payment.date,
            };
          });
          return {
            id: member.id,
            name: member.name,
            payments: payments,
          } as Person;
        });
        return { id: result.id, members: members };
      })
    );
  }
}
