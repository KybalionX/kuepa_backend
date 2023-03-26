# Kuepa Backend

<img src="http://plataforma.kuepa.com/img/kuepastrap/kuepa-ID-RGB-v04.png" width="50%">

Guía de instalación para el backend de nuestro proyecto

## Requisitos ✔
- Node.js >= 16
- MySQL
- MongoDB

## Table of Contents 📦

- [Instalación](#instalación)
- [Uso](#uso)

## Bases de datos 🔑
El proyecto requiere dos bases de datos, una base de datos relacional MySQL, y otra base de datos NO relacional Mongo. 

##  MySQL
Los parametros de conexión a la base de datos MySQL se encuentran en el archivo .env con el prefijo *DB_*.

Además, se debe crear una base de datos con nombre *kuepa_classroom*. Se puede ejecutar la siguiente consulta MySQL

`CREATE DATABASE kuepa_classroom;`

También necesitaremos dos tablas:

1. Tabla de Usuarios
2. Tabla de Roles

Para crear las tablas, podemos ejecutar las siguientes consultas:

~~~~
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roleId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`username`) USING BTREE,
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`)
);
~~~~

Podemos insertar los siguientes registros en la tabla de Roles para tener datos por defecto:
~~~~
INSERT INTO `roles` (`id`, `label`) VALUES (1, 'Estudiante'), (2, 'Moderador');
~~~~

También podemos insertar los siguientes registros en la tabla de usuarios para tener un Usuario por defecto

~~~~
INSERT INTO `users` (`id`, `username`, `name`, `password`, `roleId`) VALUES (1, 'Kuepa_Teacher', 'Profesor Kuepa', '$2b$10$KE.XaBZncSOU5dBp1zo8c.7ytAjVm7O3t0oq5GKlgpT2XUHmK7cE2', 2);
~~~~

Ahora tenemos un usuario `Kuepa_Teacher` con contraseña `123`

## MongoDB

También necesitaremos una base de datos MongoDB de nombre `kuepa_chat`, con una colleción de datos de nombre `chat`

Para mayor facilidad, usaré MongoDB Compass en este ejemplo.

Abrimos MongoDB Compass
<a href="https://imgur.com/yOx6kPw"><img src="https://i.imgur.com/yOx6kPw.png" title="source: imgur.com" /></a>

Creamos una nueva base de datos

![Kuepa Logo](https://imgur.com/X1HWalx.png)

Y le asignamos estos nombres
![Kuepa Logo](https://i.imgur.com/oySVcKb.png)

Luego de esto, ya deberíamos tener nuestra base de datos NO relacional lista!
![Kuepa Logo](https://i.imgur.com/Y5CKC1a.png)

## Instalación 👨‍💻

1. Clona el repositorio: `git clone https://github.com/KybalionX/kuepa_backend`
2. Instala las dependencias: `npm install`

## Uso 🏁

**RECUERDA TENER LAS VARIABLES DE ENTORNO (.env) DECLARADAS DE ACUERDO A TU BASE DE DATOS LOCAL!**

Para iniciar la aplicación, ejecuta el siguiente comando:

```node
npm run dev
```
