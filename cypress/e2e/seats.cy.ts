/// <reference types="Cypress"/>
import data from "../fixtures/data.json";

describe("buy ticket tests", () => {
  let alerted = "";
  it("should show list of available maps and a button to select a map randomly", () => {
    cy.visit("/");
    cy.get("[data-cy='pageMessage']").should("contain", "list of available maps");
    cy.contains("list is empty");
    cy.intercept("GET", "http://localhost:8082/api/map", {
      statusCode: 200,
      body: data.maps
    });
    cy.visit("/");
    cy.get("[data-cy='mapButton']").should("have.length", 4);
    cy.get("[data-cy='selectRandomly']").click();
    cy.location("pathname").should("contain", "/seats/");
  });
  it("should show waiting message before loading map seats", function () {
    cy.visit(`/seats/${data.maps[0]}`);
    cy.contains("loading map seats");
  });
  it("should show tons of seats smoothly", () => {
    //generating 100K seat array
    const rnd = () => Math.floor(Math.random());
    const seats = Array((100 * 1000) / 4)
      .fill(0)
      .map(() => [rnd(), rnd(), rnd(), rnd()]);
    cy.intercept("GET", `http://localhost:8082/api/map/${data.maps[0]}`, {
      statusCode: 200,
      body: seats
    }).as("seatsApi");
    cy.visit(`/seats/${data.maps[0]}`);
    cy.wait("@seatsApi");
  });
  context("select seat tests", () => {
    beforeEach(() => {
      cy.on("window:alert", (msg: string) => (alerted = msg));
      cy.intercept("GET", `http://localhost:8082/api/map/${data.maps[0]}`, {
        statusCode: 200,
        body: data.map_seats
      }).as("seatsApi");
      cy.visit(`/seats/${data.maps[0]}`);
      cy.wait("@seatsApi");
    });
    it("should show the selected map's seats with true state", () => {
      cy.get("[data-cy='seat']").as("seats");
      cy.get("@seats").should("have.length", 4 * data.map_seats.length);
      cy.get("@seats").each((item, index) => {
        cy.wrap(item).as("seatIndex");
        cy.get("@seatIndex").should(
          "contain",
          "#" + Math.floor(index / 4 + 1) + "." + ((index % 4) + 1)
        );
        const value = data.map_seats[Math.floor(index / 4)][index % 4];
        if (value === 0) {
          cy.get("@seatIndex").should("not.have.class", "selected");
        } else {
          cy.get("@seatIndex").should("have.class", "selected");
        }
      });
    });
    it("should show error if ticket api return error", function () {
      cy.intercept("POST", `http://localhost:8082/api/map/${data.maps[0]}/ticket`, {
        statusCode: 400,
        body: { message: "SERVER ERROR" }
      }).as("failedTicket");

      cy.contains(`${data.freeSeat}`)
        .click()
        .then(() => {
          cy.wait("@failedTicket");
          expect(alerted).to.match(/ERROR/);
          cy.contains(`${data.freeSeat}`).should("not.have.class", "selected");
        });
    });
    it("should show error while click on reserved seat", function () {
      cy.contains(`${data.reservedSeat}`).should("have.class", "selected");
      cy.contains(`${data.reservedSeat}`)
        .click()
        .then(() => expect(alerted).to.match(/reserved/));
    });
    it("should be able to register a free seat", () => {
      cy.intercept("POST", `http://localhost:8082/api/map/${data.maps[0]}/ticket`, {
        statusCode: 200,
        body: { result: "OK" }
      }).as("successTicket");
      cy.contains(`${data.freeSeat}`).should("not.have.class", "selected");
      cy.contains(`${data.freeSeat}`)
        .click()
        .then(() => {
          cy.wait("@successTicket");
          expect(alerted).to.match(/successfully/);
          cy.contains(`${data.freeSeat}`).should("have.class", "selected");
        });
    });
  });
});
