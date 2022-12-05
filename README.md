# Doctori

Proyecto generado con [Angular CLI](https://github.com/angular/angular-cli) versión 15.0.2.
Prueba técnica de nivel de Eduard Maestro para Frontend, con Doctori.

## Development server

Ejecuta `ng serve` para lanzar el servidor de desarrollo. Navega a `http://localhost:4200/`.
La aplicación se recarga automaticamente si cambias algún archivo fuente.
Lanza `ng serve --open` para que se abra el localhost en el navegador automaticamente.

## No he acabado la prueba

  Primero de todo, me gustaría explicar por qué no he terminado la prueba.
  La prueba queda a medias por dos motivos principales: he empleado todo el tiempo que yo mismo tenía reservado para la misma, y me he atascado al hacer la llamada HTTP a vuestro servidor, ya que me rechaza el cross origin request.

      Access to XMLHttpRequest at 'https://www.doctori.com/coche/brands' from origin 'http://localhost:4200' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.

  He estado indagando sobre este error, y por lo que parece, es trabajo del servidor configurar los permisos de acceso de las peticiones.
  He hecho un par de pruebas de configuraciones del frontend para ver si encontraba algún workaround, pero parece claro que este tipo de configuraciones de seguridad pertenecen al backend.

  Así que a falta de tiempo, decido dejar de lado las peticiones y por ende la segunda página.

## Filosofía al programar y tareas hechas

  Por otro lado, considero que en la prueba que os envío demuestro gran parte de la filosofía que tengo al programar. Este proyecto incluye:

- Proyecto angular última version.
- Configurado y usando tailwind css.
- La pagina principal conteniendo el formulario.
- Validaciones.
- Modularizado, con buena separación de comportamientos/componentes, el servicio también aparte.
    (He hecho solo los inputs de ejemplo, pero la idea sería modularizarlo todo).
- Responsive usando flex y grid.
- El texto de los terminos y condiciones es enriquecido y contiene enlaces web.
- Las llamadas a APIs publicas funcionan bien, aún así no conseguí acceder a la vuestra.
- He añadido una segunda pagina que es donde iría la tabla, para tener un ejemplo de rutas
    cargadas con lazy loading.
- Control de versiones en github, con commits cortos y explicados.
- Y mucho más que seguramente me he olvidado de incluír en esta lista.

## Diseño del formulario

  Soy consciente de que el formulario no es 100% fiel al diseño provisto, esto es a propósito y en el ambiente laboral no pasaría sin antes consultarlo con quien fuera responsable.
  De la misma forma, he hecho que los campos sean requeridos para poder mostraros cómo trato un formulario invalido.

## Qué me ha faltado por hacer por tiempo, por quedar fuera de scope, etc

- Mapear interfaces con el contrato/respuesta de los endpoints.
- Configurar sistema de mock para poder probar el codigo en local. (Mock service worker mswjs).
- Tanto el telefono como el email deberían traer validaciones correctas.
    He usado las propias de html y/o ReactiveForms pero lo suyo sería haberlas creado nuevas.
- Añadir soporte para traducir todos los textos. En otros proyectos he usado Lokalise.
- Hacer dinámico el label de cada input para que se mostrase cuando hay algo escrito (cuando no hay
    placeholder).
- Habría que haber reservado el espacio para el mensaje de error de manera que no se movieran los formularios al mostrarse.
- La authenticacion usando headers, debería hacerse una vez al principio y no en la propia llamada. Incluso se podría/debería crear un interceptor de llamadas http para manejar todas estas configuraciones.
- Añadir componente para notificar visualmente al usuario que hay procesos en marcha, por ejemplo mientras esperamos la respuesta de las llamadas HTTP.
