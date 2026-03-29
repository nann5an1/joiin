# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Joiin** is a social sports platform ("Connect Through Sport") where users find events, host games, and build communities. It is a monorepo with two separate applications:

- `back-end/` — Express.js 5 REST API (Node.js, ES Modules, port 3000)
- `front-end/` — Next.js 15 + React 19 web app (TypeScript, port 3001)

## Commands

### Back-End
```bash
cd back-end
node index.js          # Start the server (no dev script configured)
npm install            # Install dependencies
```

### Front-End
```bash
cd front-end
npm run dev            # Development server (port 3001)
npm run build          # Production build
npm run start          # Start production server
npm run lint           # Run ESLint
```

No test suite is configured in either package.

## Architecture

### Communication
The front-end calls the back-end via REST over `http://localhost:3000`. CORS is restricted to `http://localhost:3001` with credentials. Authentication tokens travel as HTTP-only cookies (`token`).

### Authentication Flow
1. `POST /api/v0.1/user/login` — verifies bcrypt password, returns JWT in HTTP-only cookie (1h expiry)
2. `authMiddleware.js` — extracts `req.cookies.token`, verifies with `SECRET` env var, attaches `req.user`
3. MFA (optional TOTP) — `speakeasy` generates secret + QR code; OTP verified on login via `/verifyMFA`

### Back-End Structure
```
back-end/
├── index.js               # Entry: Express setup, CORS, routes mounted
├── routes/
│   ├── userRoute.js        # /api/v0.1/user/*
│   └── eventRoute.js       # /api/v0.1/events/*
├── controllers/            # Request handling logic (one file per endpoint)
├── models/                 # Raw SQL queries via mysql2/promise (no ORM)
├── middleware/
│   ├── authMiddleware.js   # JWT cookie validation (use this one)
│   ├── fileUpload.js       # Multer config, 5MB limit → uploads/
│   └── authorizeRole.js    # Role auth (placeholder)
└── database/db.js          # MySQL connection pool (pool size 10)
```

No ORM — all database access is raw SQL with parameterized queries via `mysql2/promise`.

### Front-End Structure
```
front-end/src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout; renders auth/unauth header based on cookies
│   ├── page.tsx            # Landing page (unauthenticated)
│   ├── home/               # Main feed (authenticated)
│   ├── profile/            # User profile + settings
│   ├── create/             # Create event form
│   ├── event_details/      # Single event view
│   ├── yourevents/         # User's event dashboard
│   ├── created_events/     # Events user created
│   ├── attend_events/      # Events user is attending
│   ├── interested_events/  # Events user marked interested
│   ├── manage_events/      # Event management
│   └── verifyOTP/          # MFA OTP entry
├── app/components/         # Shared feature components (eventCard, ProfilePage, etc.)
└── components/ui/          # Radix UI + Tailwind wrapper primitives
```

### Database Schema (MySQL — `db_joiin`)
Key tables (raw SQL, no migration files):
- `user` — id, name, email, password (bcrypt), mfa_enabled, mfa_secret
- `create_events` — event data including category, tags (JSON), fares, pax, start/end dates, e_status
- `audience_count` — event_id, current_count, remaining_count, bool_featured
- `interested_events` — user_id, event_id
- `attending_events` — user_id, event_id

Event creation uses a DB transaction (`insertFormData.js`) across `create_events` and `audience_count`.

### File Uploads
Multer saves event images to `back-end/uploads/`. The back-end serves this directory as static files with CORS headers so the front-end can display images directly.

## Environment Variables (back-end `.env`)
```
DB_HOST, DB_USER, DB_PASS, DB_DATABASE
SECRET          # JWT signing secret
ENCRYPTION_KEY  # For encrypted fields
GOOGLE_API_KEY  # Google Maps / Places API
```
