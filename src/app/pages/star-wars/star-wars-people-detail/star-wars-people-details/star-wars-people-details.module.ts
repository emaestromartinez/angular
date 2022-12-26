import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarWarsPeopleDetailsComponent } from './star-wars-people-details.component';

@NgModule({
  imports: [CommonModule],
  declarations: [StarWarsPeopleDetailsComponent],
  exports: [StarWarsPeopleDetailsComponent],
})
export class StarWarsPeopleDetailsModule {}
