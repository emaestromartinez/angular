import {
  Component,
  AfterViewChecked,
  OnInit,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy, AfterViewChecked {
  isModalOpen = false;
  private previouslyFocusedElement: HTMLElement | null = null;
  private keydownListener: (event: KeyboardEvent) => void;

  constructor(private modalService: ModalService) {
    // Crea el listener que se usará tanto para agregar como para eliminar el evento
    this.keydownListener = (event: KeyboardEvent) => this.handleTabKey(event);
  }

  ngOnInit() {
    // Subscribe to the modal state from the service
    this.modalService.modalState$.subscribe((state) => {
      this.isModalOpen = state;
      // Definir el foco solo cuando el modal esté abierto.
      if (this.isModalOpen) {
        // Deferir el enfoque al modal usando setTimeout
        setTimeout(() => this.setFocusOnModal(), 0);
      }
    });
  }

  ngAfterViewChecked() {
    // Asegurarse de que se ejecute después de que Angular haya terminado de renderizar la vista
    if (this.isModalOpen) {
      this.setFocusOnModal();
    }
  }

  ngOnDestroy() {
    // Cleanup when the modal is destroyed
    this.removeTrapFocus();
  }

  // Close the modal programmatically (via the service)
  closeModal(): void {
    this.modalService.closeModal();
  }

  // Set focus on the modal when it opens
  private setFocusOnModal() {
    const modalElement = document.getElementById('modal');
    if (modalElement) {
      modalElement.focus(); // Focus on the modal
      this.trapFocus(modalElement); // Trap focus inside the modal
    }
  }

  // Trap the focus inside the modal
  private trapFocus(modalElement: HTMLElement) {
    const focusableElements = modalElement.querySelectorAll(
      'button, input, textarea, select, a[href]'
    );
    const firstFocusableElement = focusableElements[0] as HTMLElement;
    const lastFocusableElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    // Save the previously focused element so we can return focus when the modal is closed
    this.previouslyFocusedElement = document.activeElement as HTMLElement;

    // Focus on the first focusable element
    firstFocusableElement.focus();

    // Add event listeners to trap the focus inside the modal
    modalElement.addEventListener('keydown', this.keydownListener);
  }

  // Handle the Tab key to trap focus inside the modal
  private handleTabKey(event: KeyboardEvent) {
    const modalElement = document.getElementById('modal');
    const focusableElements = modalElement?.querySelectorAll(
      'button, input, textarea, select, a[href]'
    );
    const firstFocusableElement = focusableElements?.[0] as HTMLElement;
    const lastFocusableElement = focusableElements?.[
      focusableElements.length - 1
    ] as HTMLElement;

    if (!firstFocusableElement || !lastFocusableElement) return;

    if (event.key === 'Tab') {
      if (event.shiftKey) {
        // Shift + Tab (move backwards)
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus(); // Focus the last element when reaching the first
          event.preventDefault();
        }
      } else {
        // Tab (move forwards)
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus(); // Focus the first element when reaching the last
          event.preventDefault();
        }
      }
    }
  }

  // Remove focus trap when modal is closed
  private removeTrapFocus() {
    const modalElement = document.getElementById('modal');
    if (modalElement) {
      modalElement.removeEventListener('keydown', this.keydownListener); // Remove event listener
    }

    // Return focus to the previously focused element
    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
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
