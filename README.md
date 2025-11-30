# HVAC Flow Pro – Founding Member Edition

First 50 get lifetime Pro for $1495.00/year forever.

## Deploy Steps
1. Fork/clone this repo.
2. `npm install` (installs latest deps).
3. Run Supabase SQL (supabase-sql-setup.sql).
4. Create Stripe$1495.00/year price → copy ID to env.
5. Vercel: Import repo → Add all .env vars → Deploy.
6. Test: Visit root → counter shows 50.

## Best Practices (2025)
- Rate-limit `/api/checkout` (e.g., Upstash) for spam.
- Webhooks: Add idempotency keys for retries.
- Env Validation: Use Zod in production APIs.
- Monitoring: Add Sentry for errors.

Full test flow: Pay with 4242... → Watch counter drop → Get email.
