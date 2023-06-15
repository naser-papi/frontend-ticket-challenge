# Javascript Ticket App Document

## how to run app:

1. clone this repo with this command:
    - git clone -b mater https://github.com/naser-papi/frontend-ticket-challenge.git
2. go to the root folder of cloned repo
3. run this command to run all packages:
    - yarn install
      <br/>
      <br/>
      ![challenge project structure](/doc/images/1.png "project structure")

4. after installing packages successfully run this command to see the app in Cypress IDE.
    - yarn test
      <br/>
      <br/>
      ![cypress window](/doc/images/2.png "cypress window is configured")
5. As you can see in cypress window E2E testing is configured so click on it.
6. in the next select Chrome browser and then Click on Green Button to start test environment.
   <br/>
   <br/>
   ![cypress window](/doc/images/3.png "select your desired browser")
7. in the next window you should see the all spec files in cypress web app.
   <br/>
   <br/>
   ![cypress app](/doc/images/4.png "select seats spec file")
8. after selecting seats spec file all implemented tests will run automatically.
9. you can see all tests by description in the left panel.
10. by expanding each one you can see all steps and assertions which run for that test
    <br/>
    <br/>
    ![cypress app](/doc/images/5.png "all tests by description")
11. you can pin a specific step then see the result "Before" or "After" that step
    <br/>
    <br/>
    ![cypress app](/doc/images/6.png "pin on specific step to see the results")
12. for select seat page there are many scenarios that you can see all tests will run automatically for those steps.
    <br/>
    <br/>
    ![cypress app](/doc/images/7.png "pin on specific step to see the results")

## source code

- [main.tsx](/src/main.tsx) component is the entry point for the app that here we have not any special configuration (
  like redux or etc.) for this app
- [App.tsx](/src/App.tsx) component for handling app layout and routes of app.
- [SelectMap.tsx](/src/SelectMap.tsx) component is shown in the root page.
    - by calling the /mao api the all exist maps will load
    - user can select a map or just click on select randomly button, then a map will be selected and route will change.
- [SeatList.tsx](/src/SeatList.tsx) component will be shown after a map is selected.
    - first component will load all map seats by using the /map/<map_id> api.
    - According to the response of /map/<map_id> api, for each seat one Seat component will be created
    - the needed layout for showing map seats will be managed by using tow simple css class.
- [Seat.tsx](/src/Seat.tsx) component will show the sea info (include location and availability)
    - by using simple css style reserved seat will be red and unselectable
    - by click on seat an event will rise and the SeatList component will subscribe that.
    - if user select a reserved seat a error message would be alerted.
    - if user select a available seat the /map/<map_id>/ticket api will be called.
    - if the /map/<map_id>/ticket api would return success state the seat would be reserved and unselectable then.

## E2E Cypress tests:

- [seats.cy.ts](/cypress/e2e/seats.cy.ts) is the only spec file that all needed test for this app are coded in that.
    - with the cy.intercept function we are simulating calling backed APIs and probable responses.
    - also with help of the [data.json](/cypress/fixtures/data.json) file we are fake data for tests.
    - there are 6 different test that are implemented by using the "it" function for each scenario.
    - it is important to mention that all these tests are E2E testing, not unit testing, so we are testing a scenario
      not a feature.

## test code coverage (istanbul.js)

with code coverage we can achieve this targets:

- This tool can assist in identifying and removing unnecessary code that is no longer in use.
- It could be advantageous for the QA team to discover any missing or untested test cases.
- This tool has the ability to monitor sections of the source code that are not currently being tracked, ensuring the
  overall health and integrity of the code.

after running the single spec file of the project, the generated reports are stored in the “./e2e-coverage” folder, and
you can access the visual and HTML versions of these reports by browsing this file:

- [code coverage report](/e2e-coverage/lcov-report/index.html)

when you click on above like you can see some awesome reports like these:

- overview:

![test coverage report 1](/doc/images/8.png "overview")

- all components in src folder:

![test coverage report 2](/doc/images/9.png "src folder")

- SeatList Component

![test coverage report 3](/doc/images/10.png "SeatList Component")

## List of tasks that have done for this challenge (in below order)

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
- adding cypress code coverage by utilizing these libraries after one day research:
    - vite-plugin-istanbul
    - @istanbuljs/nyc-config-typescript
    - cypress/code-coverage
    - using this cool article https://dev.to/giannispapadakis/code-coverage-with-react-vite-rtl-cypress-12h0