# Angular Portfolio

Proyecto generado con [Angular CLI](https://github.com/angular/angular-cli) versión 15.0.2.
Prueba técnica de nivel de Eduard Maestro para Frontend.

## Cómo ejecutar el proyecto

Primer paso es ejecutar `npm install` en el path del proyecto para instalar las dependencias.
Una vez instalado, podemos ejecutar `ng serve` para lanzar el servidor de desarrollo.
Navega a `http://localhost:4200/` en el navegador para abrir la página.
La aplicación se recarga automaticamente si cambias algún archivo fuente.

Lanzando `ng serve --open` se abre el localhost en el navegador automaticamente.

## Filosofía al programar y qué incluye este proyecto

  Por un lado, considero que en este repositorio demuestro gran parte de la filosofía que tengo al programar. Este proyecto incluye:

- Proyecto angular última version.
- Configurado y usando tailwind css.
- La pagina principal conteniendo el formulario.
- Validaciones.
- Modularizado, con buena separación de comportamientos/componentes, el servicio también aparte.
- Layout Responsive usando flex y grid.
- El texto de los terminos y condiciones es enriquecido y contiene enlaces web.
- Las llamadas a APIs publicas funcionan bien.
- Control de versiones en github, con commits cortos y explicados.
- Separación de las llamadas a las apis en su propia carpeta.
- Interfaces mapeadas con el contrato/respuesta de los endpoints.
- Rutas modularizadas y dinámicas, con varios slug para no crear los componentes más veces de las necesarias (y evitar lanzar sus onInit si no es necesario). Ej: StarWarsPage.
- Home screen redirigiendo a las diferentes rutas.
- Añadir componente loader para notificar visualmente al usuario que hay procesos en marcha, por ejemplo mientras esperamos la respuesta de las llamadas HTTP.

- Componentes reutilizables:
  - Header
  - Input
  - Select
  - Checkbox
  - Loading Spinner

- Y mucho más que seguramente me he olvidado de incluír en esta lista.

Form:

- Created custom validator.
- Created custom async validator.
- Test unitarios

## To do list

- Rutas protegidas con login.
- Hacer que el header solo aplique a la de starwars!
- Configurar sistema de mock para poder probar el codigo en local. (Mock service worker mswjs).
- Tanto el telefono como el email deberían traer validaciones correctas. He usado las propias de html y/o ReactiveForms pero lo suyo sería haberlas creado nuevas.
- Añadir soporte para traducir todos los textos. En otros proyectos he usado Lokalise.
- Añadir un http interceptor y estudiar para qué.
- Sonarqube
- Cypress
- Local Storage

## Control de versiones

Aunque en este proyecto no me ha hecho falta por estar trabajando solo, conozco cómo usar las ramas de git y trabajar correctamente tanto en equipos grandes como pequeños.
Sé que debería, y en un entorno profesional todo estaría hecho con ramas, para asegurar que sea fácil mantener el entorno limpio y poder usar correctamente el control de versiones.
