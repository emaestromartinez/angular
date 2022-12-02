# Doctori

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
# doctori

<!-- 
  TODO:
    - Componentizar almenos el formulario o un par de componentes.
    - Marcar el activo en el dropdown.

 -->

<!-- 
  Soy consciente de que el diseño no es 100% fiel al diseño provisto, esto es a proposito y en el ambiente laboral no pasaría sin antes consultarlo con quien fuera responsable.
  De la misma forma, he hecho que los campos sean requeridos para poder mostraros cómo trato un formulario invalido.
 -->

<!-- 
  Qué me ha faltado por hacer, por tiempo, por quedar fuera de scope, etc.

    - Tanto el telefono como el email deberían traer validaciones correctas.
      He usado las propias de ReactiveForms pero lo suyo sería haberlas creado nuevas.
    - Añadir soporte para traducir todos los textos. En otros proyectos he usado Lokalise.
    - Hacer dinámico el label de cada input para que se mostrase cuando hay algo escrito (cuando no hay
      placeholder).
    - Habría que haber reservado el espacio para el mensaje de error de manera que no se movieran los formularios al mostrarse.
    - La authenticacion usando headers, debería hacerse una vez al principio y no en la propia llamada.
      Incluso se podría/debería crear un interceptor de llamadas http para manejar todas estas configuraciones.

 -->
