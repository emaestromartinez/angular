import { Component, Input, OnInit } from '@angular/core';
import { PeopleDetails } from '../../star-wars-page.interface';

@Component({
  selector: 'app-star-wars-people-details',
  templateUrl: './star-wars-people-details.component.html',
})
export class StarWarsPeopleDetailsComponent implements OnInit {
  @Input() selectedPerson: PeopleDetails;

  constructor() {}

  ngOnInit() {}
}
