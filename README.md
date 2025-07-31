#  Cypress Response Time Measurement POC

## Overview

This project is a **proof of concept (POC)** showing how to use **Cypress** to measure **UI response times** for dynamic elements in a web application.

The POC demonstrates:

* A minimal **Leaflet.js** map centered on Switzerland
* A **"Show Plane"** button that triggers a plane icon after a **simulated delay** (1500ms)
* A **"Remove Plane"** button to reset the state
* Cypress tests that **measure the time between click and plane appearance** and generate **performance statistics**

---

## Features

* ✅ Lightweight web app using **Leaflet.js**
* ✅ Plane icon rendering with simulated delay
* ✅ Cypress automation to:

  * Measure response time over multiple runs
  * Log per-run timings
  * Compute statistical metrics (**Min**, **Average**, **Median**, **90th percentile**, **Max**)

---

## Project Structure

```
cypress-map-poc/
│── index.html                # Map application with show/remove plane logic
│── plane.png                 # Plane icon asset
│── cypress/                  
│   └── e2e/
│       ├── measure_flight_icon.cy.js           # Minified test (5 runs, logs per-run times)
│       └── measure_flight_icon_100_iteration.cy.js  # Extended test (100 runs, logs stats with percentiles)
│── package.json
```

---

##  Setup & Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd cypress-map-poc
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Serve the App Locally

Start a local server:

```bash
npx http-server -p 3000
```

Open [http://localhost:3000](http://localhost:3000) to verify the app is running.

---

## Cypress Tests Included

### **1. `measure_flight_icon.cy.js`**

* Runs **5 iterations** by default.
* Logs the measured response time for each run.
* Simple and fast to execute.

### **2. `measure_flight_icon_100_iteration.cy.js`**

* Runs **100 iterations** by default (iterations count is configurable inside the test).
* Collects all measurements and calculates:

  * **Min**
  * **Average**
  * **Median (50th percentile)**
  * **90th percentile**
  * **Max**
* Provides a **detailed statistical summary** at the end of the test.

---

## Running the Cypress Tests

### Open Cypress in GUI Mode:

```bash
npx cypress open
```

Select one of the test files and run it.

### Run in Headless Mode:

```bash
npx cypress run --spec "cypress/e2e/measure_flight_icon.cy.js"
```

or

```bash
npx cypress run --spec "cypress/e2e/measure_flight_icon_100_iteration.cy.js"
```

---

## Test Output

* **Per-run measurements** are logged directly in the Cypress output.
* The **100-iteration test** also logs **aggregated statistics** for easier analysis.

---

## How It Works

1. Cypress triggers the **Show Plane** button and records a timestamp.
2. Waits for the plane icon to become visible in the DOM.
3. Calculates and logs the elapsed time.
4. Removes the plane and waits for the DOM to reset.
5. (For the 100-iteration test) Computes **percentiles and summary stats** after all runs.

---

## Tech Stack

* **Leaflet.js** – Map rendering
* **Cypress** – E2E testing and timing measurement
* **Node.js** – Local server and test environment

---

## Author

Developed by **\[ouni.hani.fcb@gmail.com]**
For questions, suggestions, or contributions, feel free to open an issue or pull request.

