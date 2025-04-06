import { Component, OnInit } from '@angular/core';
import { Quote, AccessibilityPageService } from './accessibility-page.service';
import { ModalService } from 'src/app/components/shared/modal/modal.service';

@Component({
  selector: 'app-accessibility-page',
  templateUrl: './accessibility-page.component.html',
})
export class AccessibilityPageComponent {
  constructor(private modalService: ModalService) {}

  openModal() {
    this.modalService.openModal();
  }
}
