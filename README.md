# Angular Portfolio

Proyecto generado con [Angular CLI](https://github.com/angular/angular-cli) versión 15.0.2.
Prueba técnica de nivel de Eduard Maestro para Frontend.

## Development server

Primer paso es ejecutar `npm install` en el path del proyecto para instalar las dependencias.
Una vez instalado, podemos ejecutar `ng serve` para lanzar el servidor de desarrollo.
Navega a `http://localhost:4200/` en el navegador para abrir la página.
La aplicación se recarga automaticamente si cambias algún archivo fuente.

Lanzando `ng serve --open` se abre el localhost en el navegador automaticamente.

## Filosofía al programar

  Por un lado, considero que en este repositorio demuestro gran parte de la filosofía que tengo al programar. Este proyecto incluye:

- Proyecto angular última version.
- Configurado y usando tailwind css.
- La pagina principal conteniendo el formulario.
- Validaciones.
- Modularizado, con buena separación de comportamientos/componentes, el servicio también aparte.
    (He hecho solo los inputs de ejemplo, pero la idea sería modularizarlo todo).
- Layout Responsive usando flex y grid.
- El texto de los terminos y condiciones es enriquecido y contiene enlaces web.
- Las llamadas a APIs publicas funcionan bien, aún así no conseguí acceder a la vuestra.
- Control de versiones en github, con commits cortos y explicados.
- Y mucho más que seguramente me he olvidado de incluír en esta lista.
- Separación de las llamadas a las apis en su propia carpeta.
- Interfaces mapeadas con el contrato/respuesta de los endpoints.
- Aunque en este proyecto no me ha hecho falta por estar trabajando solo, conozco como usar las ramas de git y trabajar correctamente tanto en equipos grandaes como pequeños

## Qué me ha faltado por hacer por tiempo, por quedar fuera de scope, etc

- Configurar sistema de mock para poder probar el codigo en local. (Mock service worker mswjs).
- Tanto el telefono como el email deberían traer validaciones correctas.
    He usado las propias de html y/o ReactiveForms pero lo suyo sería haberlas creado nuevas.
- Añadir soporte para traducir todos los textos. En otros proyectos he usado Lokalise.
- Hacer dinámico el label de cada input para que se mostrase cuando hay algo escrito (cuando no hay
    placeholder).
- Habría que haber reservado el espacio para el mensaje de error de manera que no se movieran los formularios al mostrarse.
- La authenticacion usando headers, debería hacerse una vez al principio y no en la propia llamada. Incluso se podría/debería crear un interceptor de llamadas http para manejar todas estas configuraciones.
- Añadir componente para notificar visualmente al usuario que hay procesos en marcha, por ejemplo mientras esperamos la respuesta de las llamadas HTTP.
