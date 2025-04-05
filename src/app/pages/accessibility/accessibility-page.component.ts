import { Component, OnInit } from '@angular/core';
import { Quote, AccessibilityPageService } from './accessibility-page.service';
import { ModalService } from 'src/app/components/shared/modal/modal.service';

@Component({
  selector: 'app-accessibility-page',
  templateUrl: './accessibility-page.component.html',
})
export class AccessibilityPageComponent implements OnInit {
  constructor(private modalService: ModalService) {}

  message: string = '';

  ngOnInit() {}

  openModal() {
    this.modalService.openModal(); // Llama al servicio para abrir el modal
  }
}
