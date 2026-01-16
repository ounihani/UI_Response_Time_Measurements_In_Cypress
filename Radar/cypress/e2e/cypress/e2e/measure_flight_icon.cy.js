describe('Plane appearance response time', () => {
    const expectedDelay = 1500;
    const durations = [];

    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.wait(2000); // Warm-up
    });

    it('measures response time for plane appearance over 5 runs and logs average', () => {
        Cypress._.times(5, (i) => {
            const runIndex = i + 1;
            cy.log(`Run ${runIndex}: Measuring plane appearance`);

            let start;

            // Trigger click and capture timestamp at the moment of click
            cy.get('#show-plane').then(($btn) => {
                start = performance.now();
                $btn.trigger('click');
            });

            // Wait for plane to appear and measure duration
            cy.get('img[src*="plane.png"]', { timeout: 5000 })
              .should('be.visible')
              .then(() => {
                  const end = performance.now();
                  const duration = end - start;
                  durations.push(duration);
                  cy.log(`Run ${runIndex}: Plane appeared after ${duration.toFixed(2)}ms`);
              });

            cy.wait(1000);

            // Remove plane and wait until it's gone
            cy.get('#remove-plane').click();
            cy.get('img[src*="plane.png"]').should('not.exist');
        });

        // After all iterations, calculate average and average difference
        cy.then(() => {
            const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
            const avgDiff = durations.map(d => Math.abs(d - expectedDelay))
                                     .reduce((a, b) => a + b, 0) / durations.length;

            cy.log(`Average Response Time: ${avg.toFixed(2)}ms`);
            cy.log(`Average Difference from Expected (${expectedDelay}ms): ${avgDiff.toFixed(2)}ms`);
        });
    });
});
