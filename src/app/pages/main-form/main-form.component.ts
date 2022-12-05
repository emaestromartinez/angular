import { Component, OnInit } from '@angular/core';

import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MainFormService } from './main-form.service';

interface CarBrand {
  value: string;
  name: string;
}
const MOCK_CAR_BRANDS: CarBrand[] = [
  {
    value: 'peugeot',
    name: 'Peugeot',
  },
  {
    value: 'porsche',
    name: 'Porsche',
  },
  {
    value: 'doritos',
    name: 'Doritos',
  },
];

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
})
export class MainFormComponent implements OnInit {
  form: FormGroup;
  showCarBrands = false;
  carBrandOptions: CarBrand[] = MOCK_CAR_BRANDS;

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
  get carBrand() {
    return this.form?.get('carBrand') as FormControl;
  }
  get termsAndConditions() {
    return this.form?.get('termsAndConditions') as FormControl;
  }

  constructor(
    private _fb: FormBuilder,
    private _homeService: MainFormService,
    private _router: Router
  ) {
    this.form = this._fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      carBrand: ['', Validators.required],

      termsAndConditions: [false, Validators.requiredTrue],
    });
  }

  ngOnInit() {
    this._homeService.getCardBrands().subscribe((carBrands) => {});
  }

  selectedCarBrand(carBrand: CarBrand) {
    this.carBrand.setValue(carBrand);
    this.toggleCarBrandSelect();
  }
  toggleCarBrandSelect() {
    this.showCarBrands = !this.showCarBrands;
  }

  submit() {
    this.submitted = true;
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this._router.navigate(['/second-page']);
    }
  }
}
