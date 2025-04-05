import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessibilityPageComponent } from './accessibility-page.component';
import { AccessibilityPageRoutingModule } from './accessibility-page-routing.module';
import { RouterModule } from '@angular/router';
import { AccessibilityPageService } from './accessibility-page.service';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

@NgModule({
  declarations: [AccessibilityPageComponent],
  imports: [CommonModule, RouterModule, AccessibilityPageRoutingModule],
  providers: [
    AccessibilityPageService,
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AccessibilityPageModule {}
