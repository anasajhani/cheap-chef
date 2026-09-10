# Verification — September 10, 2026

## Passed locally

- Eight automated tests: API registration/authentication, persistent profile/pantry/plan writes, account isolation, duplicate purchase/cooking rejection, deletion, package rounding, pantry deductions, week rotation, constraints, swaps, catalog integrity, disconnected AI mode, coordinate distances.
- Vite production frontend build.
- Live OpenStreetMap search for Columbus, Ohio 43210 returned nearby branches and addresses (including Target on North High Street). Filtering was tightened to exclude non-grocery tenants such as optical stores after this check.

## Not yet verified / configured

- Paid OpenAI calls: no API key or selected model configured. No charges incurred.
- Docker execution: Docker unavailable on the local machine; CI includes a container build.
- Browser interaction/accessibility review and mobile device testing.
- Production deployment of the new Express/PostgreSQL app. The existing live Sites page still uses the recovered static prototype.
- Live store pricing, stock and bulk-price optimization: no retailer data provider configured.

This is a rebuilt beta, not the recovered missing application or a production-ready completion of every original requirement. See README for the complete limitations.
