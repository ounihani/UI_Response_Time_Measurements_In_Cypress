describe('Plane appearance response time', () => {
    const expectedDelay = 1500;
    const durations = [];
    const iterations = 100;

    beforeEach(() => {
        cy.visit('http://localhost:3000/radar');
        cy.wait(2000); // Warm-up to stabilize timings
    });

    it(`measures plane appearance over ${iterations} runs and logs statistics`, () => {
        Cypress._.times(iterations, (i) => {
            const runIndex = i + 1;
            cy.log(`Run ${runIndex}: Measuring plane appearance`);

            let start;

            // Trigger click and record start timestamp
            cy.get('#show-plane').then(($btn) => {
                start = performance.now();
                $btn.trigger('click');
            });

            // Wait for the plane to appear and store duration
            cy.get('img[src*="plane.png"]', { timeout: 5000 })
              .should('be.visible')
              .then(() => {
                  const end = performance.now();
                  const duration = end - start;
                  durations.push(duration);
                  cy.log(`Run ${runIndex}: Plane appeared after ${duration.toFixed(2)}ms`);
              });

            cy.wait(1000); // Observe plane

            // Remove plane and confirm removal
            cy.get('#remove-plane').click();
            cy.get('img[src*="plane.png"]').should('not.exist');
        });

        // After all runs, calculate and log metrics
        cy.then(() => {
            // Sort durations for percentile calculation
            const sorted = [...durations].sort((a, b) => a - b);
            const avg = sorted.reduce((a, b) => a + b, 0) / sorted.length;
            const min = sorted[0];
            const max = sorted[sorted.length - 1];

            const percentile = (arr, p) => {
                const idx = Math.ceil((p / 100) * arr.length) - 1;
                return arr[idx];
            };

            const p50 = percentile(sorted, 50); // Median
            const p90 = percentile(sorted, 90);

            // Log results
            cy.log(`--- Response Time Statistics (${iterations} runs) ---`);
            cy.log(`Min: ${min.toFixed(2)}ms`);
            cy.log(`Average: ${avg.toFixed(2)}ms`);
            cy.log(`50% (Median): ${p50.toFixed(2)}ms`);
            cy.log(`90%: ${p90.toFixed(2)}ms`);
            cy.log(`Max: ${max.toFixed(2)}ms`);
        });
    });
});
