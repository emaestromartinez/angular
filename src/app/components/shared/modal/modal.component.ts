import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  isModalOpen = false;
  @ViewChild('modalContainer') modalContainer!: ElementRef;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    // Subscribe to the modal state from the service
    this.modalService.modalState$.subscribe((state) => {
      this.isModalOpen = state;
    });
  }

  // Close the modal programmatically (via the service)
  closeModal(): void {
    this.modalService.closeModal();
  }

  /** Capturar evento de tabulación */
  @HostListener('keydown', ['$event'])
  handleTab(event: KeyboardEvent) {
    if (event.key === 'Tab' && this.isModalOpen) {
      this.trapFocus(event);
    }
  }

  /** Asegurar que el foco no escape del modal */
  private setFocusTrap() {
    if (this.modalContainer) {
      const focusableElements =
        this.modalContainer.nativeElement.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus(); // Foco en el primer elemento
      }
    }
  }

  /** Evitar que Tab escape del modal */
  private trapFocus(event: KeyboardEvent) {
    const focusableElements =
      this.modalContainer.nativeElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    if (event.shiftKey && document.activeElement === firstElement) {
      lastElement.focus();
      event.preventDefault();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      firstElement.focus();
      event.preventDefault();
    }
  }
}
