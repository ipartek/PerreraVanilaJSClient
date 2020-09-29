# PerreraVanilaJSClient

Proyecto Web con Vanilla JavaScript para consumir un el servicio rest del proyecto [perreraWebService](https://github.com/ipartek/perreraWebService)

## Tecnología
En este proyecto usamos la siguiente tecnologia:

- HTML
- CSS
- JavaScript Vanilla sin framework
- Ajax - Asynchronous JavaScript And XML, para realizar las llamadas al servicio rest
- Framework de Frontend [materializecss](https://materializecss.com)

## Configuración

La url donde escucha el proyecto se puede cambiar en **js/main.js**, cambiando la siguiente linea:
`const endpoint = 'http://localhost:8080/perreraWS/service/perro?orderBy=asc&campo=nombre';` 

Tambien tienes disponible un fichero con datos en JSON por si no quieres instarlar el proyecto **perreraWebService**, lo puedes encontrar en [api/perros.json](https://github.com/ipartek/PerreraVanilaJSClient/tree/master/api)


