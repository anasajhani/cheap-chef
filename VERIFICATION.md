# Verification — September 10, 2026

## Passed locally

- Nine automated tests (including a mocked AI-provider contract check): API registration/authentication, persistent profile/pantry/plan writes, account isolation, duplicate purchase/cooking rejection, deletion, package rounding, pantry deductions, week rotation, constraints, swaps, catalog integrity, disconnected AI mode, coordinate distances.
- Vite production frontend build.
- Live OpenStreetMap searches in Columbus, Ohio and Toronto, Ontario returned nearby branches. The Columbus search for 43210 returned nearby branches and addresses (including Target on North High Street). A follow-up search confirmed that optical stores are excluded.

- GitHub Actions run 34494734094 passed dependency installation, the test suite, production frontend build and Docker image build for commit 5e7fc6ce01b495cd1506ba793ecd76f12d1ec3e7.

## Not yet verified / configured

- Paid OpenAI calls: no API key or selected model configured. No charges incurred.
- Docker container runtime has not been exercised against a production PostgreSQL server. The container image build passed in GitHub Actions.
- Browser interaction/accessibility review and mobile device testing.
- Production deployment of the new Express/PostgreSQL app. The existing live Sites page still uses the recovered static prototype.
- Live store pricing, stock and bulk-price optimization: no retailer data provider configured.

This is a rebuilt beta, not the recovered missing application or a production-ready completion of every original requirement. See README for the complete limitations.
