# Angular Crud exercise (0.1.0)
##### Made with last version of Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version **18.0.1.**

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you
change any of the source files.


## Screenshots 
- Empty list if you don't run the server 🤡 
`npm run server:start`

![empty.png](public/assets/images/empty_list_big.png)

Dark app theme (I know is terrible huauhahu UI)
![screen_dark.png](public/assets/images/screen_fe_dark.png)

Swagger presente su `api-docs`
![swagger.png](public/assets/images/swagger.png)

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use
`ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## TODO

- [x] Add filter for user articles 
- [x] Add pagination endpoint for paginate the articles
- [x] Add paginator on article-list
- [x] Add a better error handling
- [ ] Add test for the app
- [ ] Improve user session and model management
- [ ] Add admin section for handling users and articles
 

## Author
🥷🏻 alBz


## Docker commands
Run `docker build -t my_angular_app:latest .`

and

`docker run -d -p 4200:80 my_angular_app` 

you can access to the app on `http://localhost:4200`

## License

This project is licensed under the MIT License 

## Hint 
You can use this project as a template for your own Angular projects or for prepare a technical interview.
