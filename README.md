# Pokedex

This project is built using [Angular 15.0.3](https://v15.angular.io/docs) and leverages [Angular Material 15.2.9](https://v15.material.angular.io/) for UI components. End-to-end (E2E) testing is implemented using [Cypress 13.13.0](https://docs.cypress.io/guides/overview/why-cypress). The application uses the [Pokémon TCG API](https://docs.pokemontcg.io/) to retrieve data related to Pokémon Trading Card Game.

## Configuration

### Install Dependencies:

Run `npm install` to install all required dependencies.

### Create config file

Before running the application, you need to create an environment file to store your API key. This file should be named `environment.ts` and placed in the root `/pokedex/src/environments`. An example file named `environment.example.ts` is provided as a template to help you get started.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run cy:open` to execute the end-to-end tests via Cypress.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
