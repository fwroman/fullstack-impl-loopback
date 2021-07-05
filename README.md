# Fullstack Web Aplication Test

This project is a fullstack implementation to retrieve github users information from the github API to import it as needed inside a local database through a custom REST API which is consumed by a web application. The REST API have basic HTTP operations to create, retrieve, update and delete data located in the local database.

## Getting started 🚀

This instructions will allow you to get a copy of this project for your local computer for development and testing purposes.

Take a look in the **Deployment** section to know how to let the project get started


### Pre requirements 📋

First thing first, you will need to prepare your local node.js environment which will allow you to deploy both backend and frontend projects. We recommend you to have the version 8.9.x or higher for the correct functioning of the whole application.

### Instalation 🔧

Once you have your local environment ready, you will need to install @loopback/cli and @angular/cli in order to start up both backend and frontend projects.

```
npm install -g @loopback/cli
```

```
npm install -g @angular/cli
```

After you've already cloned this project, you will need to install all the server side and client side dependencies.

_Server side:_
```
cd servidor
npm install
```

_Client side:_
```
cd angular
npm install
```

## Deployment 📦

In order to start the backend server which exposes the REST API, you will have to run npm start. The server will be deployed in the port 3000 by default.

```
cd servidor
npm start
```

Regarding to the frontend client you will have to run ng serve to deploy it over the port 4200 by default.

```
cd angular
ng serve
```

You can specify a different port with the option --port

```
ng serve --port 4500
```

## Third party tools 🛠️

The development tools used in this project are shown above.

* [Loopback 4](https://loopback.io/docs/) - Framework for the REST API development
* [Angular 11](https://angular.io/docs) - Framework for the frontend development
* [Bootstrap 4.5](https://getbootstrap.com/docs/4.0/) - Framework for the css and html design
* [ng bootstrap](https://ng-bootstrap.github.io/#/getting-started) - Library used to handle some bootstrap components with the best practices of Angular
* [ngx formly](https://formly.dev/guide/getting-started) - Library used to automatically create bootstrap styled forms with the best practices of Angular
* [Fontawesome](https://fontawesome.com) - This library provides a bunch of icons for the web application
* [Lottie files](https://lottiefiles.com) - This library helps to include svg animations for the web application
* [three.js](https://threejs.org) - Library used to render images and graphic objects over a 3D image processor engine

## Contributos ✒️

* **Waldon Fredi Román** - *Fullstack development* - [fwroman](https://github.com/fwroman)

## License 📄

This project has been developed over the GNU license.

## Gratefulness 🎁

I would like to thank **_Strategic Corp_** and **_Mushroomsoft_** to give me the opportunity to show my skills throughout the hiring process 🤓.