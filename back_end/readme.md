# Delilah Restó

_Este proyectyo consta de la construccion de una aplicacion basada en web services para la administracion de contactos_

## Comenzando 🚀

_Lo primero que debes hacer para montar el servidor en tu computadora es abrir el proyecto con **Visual Studio Code** o un editor de codigo culquiera_

### Pre-requisitos 📋

* _Uno de los requisitos para poder levantar el servidor es instalar **NodeJs** y **NPM** en tu computadora, Para eso podes seguir esta pequeña guia_

* _Lo siguiente que tenemos que instalar es **MariaDB** en la computadora para que podamos interpretar las instrucciones de la base de datos,

* _Y por ultimo tenemos que intalar **DBeaver** para ejecutar las intrucciones y datos de la bsae de datos, aunque se pueden instalar otros administradores de bases de datos si lo desean_

### Instalación 🔧

_Ahora si con Node y Npm instalados tenes que abrir el proyecto con Visual Studio Code, y en la terminal que trae integrada el editor de codigo, deberas correr el siguiente comando, para instalar todas las dependencias y librerias que va a utilizar el proyecto_
```
npm i
```

_una vez intaladas las dependencias deberas abrir DBeaver y crear la base de datos_

_La contraseña correspondiente a la base puede ser cualquiera pero por defecto te recomiendo que pongas root_

_para crear la base de datos deberas copiar todo el codigo que esta en el archivo **data_bases.sql** y pegarlo en dbeaver y ejecutarlo_

## Iniciando el servidor 💻

### Si dejaste la configuracion por defecto de la DB puedes saltarte esto

_antes de poner arriba nuestro servidor tenes quie ir al archivo **.env** y corroborar los datos que hay en el si no son los correspondientes a los que tienes en tu base de datos deberas cambiarlos para que funcione_

### Todo listo

_una vez que corremos el script de la base de datos en DBeaver tenemos que ir a nuestro editor de codigo y ejecutar el siguiente comando el la terminal_
```
npm run dev
```
### Y listo nuestro servidor ya esta arriba

## Documentacion📖
_La documentacion e informacion de los endpoints de la base del backend estan en postman_
```
http://localhost:3000/api-docs
```
_Mas Ejemplos de los endpoint en postman_
```
https://www.postman.com/blue-star-799371/workspace/delilha-resto/overview
```
_URL del repositorio en github_
```
https://github.com/MateoGurrea02/Data-WareHouse-MateoGurrea02
```
