# Cheap Chef — rebuilt beta

## GitHub Pages edition

The static, browser-saved edition builds with `pnpm build:pages` and is intended for `https://anasajhani.github.io/cheap-chef/`. It uses the current recipe catalog and planner, including Indian and British dishes, weekly rotation, dish swaps, protein changes, pantry quantities, cooking steps, and grocery lists. Preferences and plans are saved in the visitor's browser using local storage. They do not sync across devices, and clearing browser data removes them. The GitHub Pages edition does not have accounts, AI chat, or nearby store search.

To publish, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. The `.github/workflows/pages.yml` workflow builds and publishes the static edition whenever `main` changes. The repository name must remain `cheap-chef` for the configured URL path; update `base` in `apps/web/vite.pages.config.js` if the name changes.

## Meal variety update — September 22, 2026

The hosted Worker and React app now offer Indian and British cuisine filters, savory lunch/dinner slots, named dish families, and protein swaps (chicken, turkey, lean beef, white fish, tofu and legumes). Cuisine adaptations are labeled. New weeks exclude the immediately previous week’s recipe IDs and prefer variety between dish families; unlimited unique weeks are not promised. Uncooked meals can be swapped after shopping; already-recorded purchases remain in pantry and only additional groceries are charged against the remaining estimated budget. Cooked meals cannot be swapped. Protein changes regenerate ingredients, instructions and nutrition estimates. Halal/kosher continue to use the existing plant-based restriction. Prices and nutrition remain estimates.

The older deployment notes below predate the Worker/D1 hosting path and are retained as historical context.

React/Tailwind client and Express API with persistent PostgreSQL accounts, profiles, pantry quantities, weekly plans and chat history. This rebuild starts from the recovered static prototype. It is **not** a recovery of the missing 29 files and is not claimed production-ready.

## Run locally

Node 22+ and pnpm 11.19.0 are required.

```sh
pnpm install --frozen-lockfile --ignore-scripts
cp .env.example .env
pnpm dev
```

Open the Vite address printed by the command (normally http://localhost:5173). The API listens on port 4000. With DATABASE_URL empty, embedded PostgreSQL (PGlite) persists to `.data/`; do not delete that directory unless you intend to erase local accounts. A PostgreSQL server can be supplied via DATABASE_URL instead.

```sh
pnpm check
pnpm build
# Set WEB_ORIGIN=http://localhost:4000 when serving the production build locally.
pnpm start
```

## Container

Set POSTGRES_PASSWORD to a new strong secret in .env, then `docker compose up --build`. Set WEB_ORIGIN=http://localhost:4000 and COOKIE_SECURE=false for local HTTP testing. For production use HTTPS, COOKIE_SECURE=true, an exact WEB_ORIGIN, backups, and secret management. The local Compose port is bound only to loopback. Container execution is subject to verification in CI; Docker is not installed on the rebuilding machine.

## Implemented behavior

- Email/password registration and login; scrypt password hashes, random expiring HTTP-only sessions, origin checks and rate limits.
- Persistent profile, pantry, weekly plan and conversation history; password-confirmed account deletion.
- US/Canada country and location entry, USD/CAD sample package prices.
- Explicit device geolocation or city/postal-code search through OpenStreetMap Nominatim and Overpass. Results are actual mapped branches with coordinates, available addresses, straight-line distance and selection. Coverage is incomplete; map entries are not guaranteed current.
- Save preferred branches and warehouse memberships. Branch selections appear in plans and AI context.
- Package-rounded grocery costs after pantry deductions; reject plans over the estimated budget rather than quietly exceeding it.
- Strict recipe-level equipment, cooking time, diet and declared-allergen filters; no recipe IDs repeated within or from the immediately previous generated week. Recipe variants share base ingredients and preparation methods.
- Scaled meal portions with approximate calories/macros; sequential cooking mode; meal swaps recompute shopping costs.
- Explicitly recording purchases adds pack quantities to pantry; marking a meal cooked deducts its quantities. Duplicate purchase/cooking updates are rejected. Pantry and plan updates commit transactionally.
- Server-side OpenAI Responses integration with structured actions, confirmation before changes, and server revalidation. No fake AI responses when disconnected.

## AI setup and cost

Set OPENAI_API_KEY and OPENAI_MODEL in server environment variables to enable chat. Choose a model supporting Responses structured outputs. Never put keys in VITE variables or client files. Chat sends meal preferences, recipe context, pantry and recent conversation to OpenAI; it omits email and precise store addresses from supplied context. User-written messages may themselves contain personal information. Requests use store:false. Provider retention policies still apply. AI_DAILY_LIMIT defaults to 20 requests per account, and a short-term rate limit also applies. Set provider-level spend controls before enabling public access. No AI provider account was purchased or live paid AI call made during this rebuild. Live AI behavior requires configuration and verification.

## Location service operation

Public OpenStreetMap services are intended for modest use. Geocoding is serialized at no more than one request per 1.1 seconds per process; results are cached and only fetched on explicit search. Attribution is displayed. No autocomplete or background tracking. Nominatim/Overpass endpoints and User-Agent are configurable in .env. For a public service at scale, arrange suitable hosted/self-hosted map infrastructure. Run only one API process with these in-memory queues/caches and per-account mutation locks; multi-instance coordination is not implemented.

## Important limitations

- No live grocery prices, inventory, branch-specific pricing, or warehouse bulk-price optimization. Sample USD and CAD prices are illustrative and exclude taxes/deposits/membership fees. No real checkout-price guarantee.
- All cards reuse the recovered illustrative meal-prep image, clearly labeled. Dedicated photography of each recipe is outstanding.
- Recipe catalog uses structured variations, not professionally reviewed recipes. Restrictive cuisine/equipment choices may not have enough recipes for two different weeks. The planner then reports that limitation rather than ignoring constraints.
- Halal/kosher use plant-based filtering, not certification. Product labels/cross-contact/certification still require checking. Soy/wheat/mustard are explicitly modeled; catalog metadata needs expert review before commercial use.
- Nutrition is approximate, with a generic adult baseline, not a medical prescription. No age, sex or activity-specific estimation. Professional nutrition and allergy review is outstanding.
- Email verification, password reset, subscriptions, admin tools, production security review, automated backups, multi-instance locking and load testing are not implemented.
- Current rebuilt UI is English. The older static prototype retains its original languages.
- The old live Sites website is unchanged. `.openai/hosting.json` continues to point at `dist/`, the original static site. The rebuilt server application requires a Node/PostgreSQL host; publishing the static folder does not deploy these new features.

## Verification

Run `pnpm check` for the API integration and planner tests plus production frontend build. Tests cover authentication, account isolation, persistence, purchase/cooking lifecycle, package rounding, pantry deductions, week rotation, constraint rejection, swaps, and disconnected AI behavior. Further results and outstanding checks are recorded in VERIFICATION.md.

## References

- https://developers.openai.com/api/docs/guides/structured-outputs
- https://operations.osmfoundation.org/policies/nominatim/
- https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_QL
- https://www.openstreetmap.org/copyright

All rights reserved. No open-source reuse license is granted.
