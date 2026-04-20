# Playwright – GUI Test Automation (DemoBank)

This project demonstrates my approach to building maintainable and scalable UI test automation using Playwright, based on a demo banking application.

---

## 📦 What’s inside?

✔ **End-to-end UI tests**  
Covers key user flows such as login, dashboard operations, quick transfers, and standard payments with more complex input.

✔ **Clean test architecture**  
The project follows the Page Object Model, separating page logic from test logic to keep tests readable and easy to maintain.

✔ **Reusable fixtures**  
Common setup (pages, test data, user credentials) is handled via Playwright fixtures, reducing duplication and keeping tests concise.

✔ **Data-driven tests**  
Test data is defined separately, making it easy to extend test coverage without touching the test logic.

✔ **Strong typing (TypeScript)**  
Enums and types are used to improve clarity and reduce errors.

✔ **Session reuse (storageState)**  
Authentication is performed once and reused across tests, improving speed and stability.  
Login tests intentionally run without a saved session.

✔ **CI integration**  
![Playwright Tests](https://github.com/jakubkwintal/demobank/actions/workflows/playwright.yml/badge.svg)

Latest GitHub Actions run status. Tests execute automatically on every push.


## 📫 Contact

- LinkedIn: [Jakub Kwintal](https://www.linkedin.com/in/jakubkwintal/)
- Email: jakubkwintal@yahoo.com