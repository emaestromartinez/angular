import { Component, OnInit } from '@angular/core';

import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  form: FormGroup;

  submitted = false;
  termsAndConditionsString =
    `Tus datos son tratados por iSalud para prestarte los <u><a href="http://google.es">servicios</a></u> de <b>búsqueda</b> solicitados, ` +
    `<b>consistentes en</b> realizar acciones comerciales <b>en nombre propio</b> y en nombre de las <u><a href="http://google.es">entidades aseguradoras</a></u> ` +
    `y de las entidades de prestación de servicios con las que iSalud colabora, <b>sea de</b> productos propios y/o de ` +
    `terceros y/o paramediar en la oferta y contratación de seguros. ` +
    `Puedes consultar la información ampliada sobre el tratamiento de tus datos y cómo ejercer tus derechos en la <u><a href="http://google.es">Política de Privacidad</a></u>.`;

  get username() {
    return this.form?.get('username') as FormControl;
  }
  get email() {
    return this.form?.get('email') as FormControl;
  }
  get phone() {
    return this.form?.get('phone') as FormControl;
  }
  get conditions() {
    return this.form?.get('conditions') as FormControl;
  }

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      conditios: [false, Validators.required],
    });
  }

  ngOnInit() {}

  submit() {
    this.submitted = true;
  }
}
