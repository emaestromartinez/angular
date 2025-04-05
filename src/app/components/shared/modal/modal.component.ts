import { Component, OnInit, HostListener } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  isModalOpen = false;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    // Subscribe to the modal state from the service
    this.modalService.modalState$.subscribe((state) => {
      this.isModalOpen = state;
      if (this.isModalOpen) {
        this.setFocusOnModal(); // When the modal is open, we focus on it
      }
    });
  }

  // Close the modal programmatically (via the service)
  closeModal(): void {
    this.modalService.closeModal();
  }

  // Set focus on the modal when it opens
  private setFocusOnModal() {
    const modalElement = document.getElementById('modal');
    if (modalElement) {
      modalElement.focus();
    }
  }

  // Listen for the Escape key to close the modal
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    if (this.isModalOpen) {
      this.closeModal(); // Close modal when Escape is pressed
    }
  }
}
