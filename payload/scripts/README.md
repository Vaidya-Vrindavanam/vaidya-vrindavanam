# Migration Scripts

## migrate:content

One-time script to seed Payload from existing Markdown content files.

**Prerequisites:**
1. Payload database must be migrated first: `npm run payload migrate`
2. A Payload admin user must exist (create one at `/admin` or via `npm run payload create-first-user`)
3. `DATABASE_URI` must be set in `payload/.env`

**Run:**
```bash
cd payload
npm run migrate:content
```

**What it does:**
- Reads all `.md` files from `../src/content/treatments/`, `../src/content/conditions/`, and `../src/content/blog/`
- Creates each document in Payload's PostgreSQL database
- Converts Markdown body to minimal Lexical JSON (editors can enhance in Payload admin later)

**After successful migration:**
- Verify all documents appear in Payload admin
- Delete `../src/content/` directory (Astro now fetches from Payload)
- Delete `../src/content/config.ts`
