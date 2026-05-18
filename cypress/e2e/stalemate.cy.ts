describe("stalemate tests", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  it("should detect stalemate", () => {
    cy.login();
    cy.visitAndCheck("/game");

    // 1. e3
    cy.findAllByTestId("6-4").click();
    cy.findAllByTestId("5-4").click();
    // 1... a5
    cy.findAllByTestId("1-0").click();
    cy.findAllByTestId("3-0").click();

    // 2. Qh5
    cy.findAllByTestId("7-3").click();
    cy.findAllByTestId("3-7").click();
    // 2... Ra6
    cy.findAllByTestId("0-0").click();
    cy.findAllByTestId("2-0").click();

    // 3. Qxa5
    cy.findAllByTestId("3-7").click();
    cy.findAllByTestId("3-0").click();
    // 3... h5
    cy.findAllByTestId("1-7").click();
    cy.findAllByTestId("3-7").click();

    // 4. h4
    cy.findAllByTestId("6-7").click();
    cy.findAllByTestId("4-7").click();
    // 4... Rah6
    cy.findAllByTestId("2-0").click();
    cy.findAllByTestId("2-7").click();

    // 5. Qxc7
    cy.findAllByTestId("3-0").click();
    cy.findAllByTestId("1-2").click();
    // 5... f6
    cy.findAllByTestId("1-5").click();
    cy.findAllByTestId("2-5").click();

    // 6. Qxd7+
    cy.findAllByTestId("1-2").click();
    cy.findAllByTestId("1-3").click();
    // 6... Kf7
    cy.findAllByTestId("0-4").click();
    cy.findAllByTestId("1-5").click();

    // 7. Qxb7
    cy.findAllByTestId("1-3").click();
    cy.findAllByTestId("1-1").click();
    // 7... Qd3
    cy.findAllByTestId("0-3").click();
    cy.findAllByTestId("5-3").click();

    // 8. Qxb8
    cy.findAllByTestId("1-1").click();
    cy.findAllByTestId("0-1").click();
    // 8... Qh7
    cy.findAllByTestId("5-3").click();
    cy.findAllByTestId("1-7").click();

    // 9. Qxc8
    cy.findAllByTestId("0-1").click();
    cy.findAllByTestId("0-2").click();
    // 9... Kg6
    cy.findAllByTestId("1-5").click();
    cy.findAllByTestId("2-6").click();

    // 10. Qe6 — stalemate
    cy.findAllByTestId("0-2").click();
    cy.findAllByTestId("2-4").click();

    cy.get('[data-testid="popup"]').contains("Draw!");
  });
});
