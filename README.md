# Cheap Chef

Cheap Chef is a full-stack, budget-first meal planning application for students, families, and anyone who wants a practical week of food without overspending. It turns a user's location, preferred stores, budget, pantry, equipment, diet, allergies, cuisine preferences, and nutrition goal into a saved seven-day plan and optimized grocery list.

The original static prototype remains in `dist/`. The production application lives in `apps/web` and `apps/api` and is the version used by Docker.

## Product features

- Email-and-password registration with secure, HTTP-only sessions
- United States and Canada location profiles
- Regional retailer choices, including Costco and Sam's Club
- Weight, height, and lose/maintain/gain targets
- Strict weekly budget validation in USD or CAD
- Equipment- and time-aware recipe selection
- Vegan, vegetarian, halal, kosher, and allergen filters
- Cuisine preferences and English/French interface settings
- Persistent PostgreSQL pantry and staple quantities
- Automatic removal of pantry stock from the grocery list
- No meal repeats from the immediately previous week
- Balanced meal cards with calories, macros, pricing, plate imagery, and cooking steps
- Bulk-purchase guidance for wholesale clubs
- Responsive desktop and mobile interface

> Prices and nutrition values are planning estimates. A retail data provider is required before making real-time price or availability claims. Nutrition and allergy outputs must receive professional review before a broad public launch.

## Architecture

```text
cheap-chef/
├── apps/
│   ├── web/                 React + Vite + Tailwind UI
│   └── api/                 Express API and planning engine
│       ├── sql/             PostgreSQL schema
│       └── src/             Auth, persistence, recipes, and planner
├── dist/                    Existing hosted static prototype
├── Dockerfile               Multi-stage production container
├── docker-compose.yml       App + PostgreSQL local stack
└── .github/workflows/ci.yml Build and test automation
```

## Run with Docker

Requirements: Docker Desktop or Docker Engine with Compose.

1. Copy the environment template and replace the JWT secret:

   ```bash
   cp .env.example .env
   ```

2. Start the app and database:

   ```bash
   docker compose up --build
   ```

3. Open `http://localhost:4000`.

PostgreSQL data is retained in the `cheap-chef-data` volume.

## Run without Docker

Requirements: Node.js 20+ and PostgreSQL 15+.

```bash
npm install
cp .env.example .env
npm run dev
```

The web client runs at `http://localhost:5173` and proxies API requests to `http://localhost:4000`.

## Verify

```bash
npm run check
```

This builds the React application and runs the meal planner's automated tests, including budget enforcement, pantry exclusions, nutrition-goal adjustments, and week-to-week recipe rotation.

## Environment variables

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Random secret of at least 32 characters |
| `PORT` | API and production web port; defaults to `4000` |
| `WEB_ORIGIN` | Allowed browser origin for credentialed API requests |
| `COOKIE_SECURE` | Set to `true` when the production site uses HTTPS |
| `VITE_API_URL` | Optional API origin for separate frontend hosting |

## Production launch checklist

- Replace the sample price factors with licensed retailer or commerce API data.
- Add verified transactional email for account verification and password recovery.
- Set `COOKIE_SECURE=true`, rotate all secrets, and use managed PostgreSQL with backups.
- Put the container behind HTTPS and add centralized logs and uptime monitoring.
- Complete privacy, terms, subscription, tax, nutrition, allergy, and food-safety reviews.
- Run accessibility, load, penetration, and mobile device testing.
- Use a CDN or owned media storage for a larger recipe image library.

## GitHub setup

The repository is already initialized and committed locally. If you are connecting it manually:

```bash
git remote add origin https://github.com/YOUR-USERNAME/cheap-chef.git
git branch -M main
git push -u origin main
```

Keep `.env` private. It is ignored by Git and must never be committed.

## License

All rights reserved. Add an open-source license only if you intentionally want other people to reuse the source code.
