import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Este servicio es singleton y accesible en toda la app
})
export class ModalService {
  private modalSubject = new BehaviorSubject<boolean>(false); // Estado de visibilidad del modal
  modalState$ = this.modalSubject.asObservable(); // Observar el estado del modal

  // Método para abrir el modal
  openModal() {
    this.modalSubject.next(true);
  }

  // Método para cerrar el modal
  closeModal() {
    this.modalSubject.next(false);
  }
}
