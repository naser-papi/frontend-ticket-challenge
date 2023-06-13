# Javascript Ticket App Document

- I created the project with the vite default template
- removing extra CSS and default codes from the template
- adding SeatList component to manage the layout of all seats and get the list of seats
- adding Seat Component to show the seat info and handle select seat
- adding some bunch of CSS to App.css to display and style a UI for selecting a seat
- adding Prettier to the package.json as dev dependency for formatting code and beautify.
- adding Cypress to E2E testing and starting functionality development.
- Configuring Cypress and add the first spec file (in cypress/e2e folder) for TDD.
- adding react-router-dom for manipulating the app routing:
  - the / = for maps list
  - the /seat/:mapId = for seats list
- adding "test" script to package.json file in order to run Cypress and app in the same time
- writing tests for different APIs by using API Standard document and mockup the Api result.
- developing the needed codes for passing written tests in each component