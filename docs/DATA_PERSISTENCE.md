# RIFQAH — data persistence and account sync

## Where data lives

| Layer | What it holds | Survives |
| --- | --- | --- |
| **IndexedDB** (`rifqah` database, `records` store) | The complete user record as one document: profile, LMP, blood pressure, weight, appointments, visits, fetal-movement sessions, hydration, hospital bag, birth plan | Refresh, tab close, browser restart, logout, offline use |
| **Supabase** (`public.pregnancy_records`, one JSONB row per user) | The same document, so it follows the account to another device | Device loss, reinstall, a second phone or laptop |
| **Supabase Auth** (`auth.users`) | Email + hashed password, session tokens | — |

`localStorage` holds **only** the interface language. It is no longer used for
records; a payload left behind by older versions is migrated into IndexedDB on
first load and is never read again.

## Isolation

Every record is stored under the key `data:user-<uuid>` where `<uuid>` is the
authenticated Supabase user id (`storageScopeFor()`). Signing in as a different
account therefore reads a different record — there is no shared bucket, and no
account can address another account's key from the UI.

On the server, `pregnancy_records` has Row Level Security enabled *and forced*,
with each policy scoped to `auth.uid() = user_id`, so a signed-in browser can
only ever read or write its own row. Guests (signed out) never touch Supabase.

## Write path

1. An edit updates React state and, after a 200 ms debounce, is written to
   IndexedDB. This is the durability point — a refresh can never lose it.
2. When online and signed in, a 1.2 s debounce pushes the document to Supabase.
3. `pagehide` and tab-hide events flush any pending change immediately.

## Restore path

On load, `useIndexedState` hydrates from IndexedDB (showing a boot screen until
it resolves, so no screen ever renders a half-loaded record). Then, for a signed
in user, `syncNow()` pulls the cloud row:

- no cloud row, or the device copy is newer → **push** the device copy
- cloud row is newer → **pull** it and replace the device copy
- cloud unreachable → keep working from IndexedDB, show a "saved on device —
  offline" chip with a retry action

`decideSync()` in `src/lib/sync.ts` implements that comparison and is unit
tested.

## What logout does

Logout ends the Supabase session only. It deletes **no** IndexedDB record, so
signing back in restores everything. Nothing is ever cleared implicitly; a user
who wants a record gone must use the in-app reset action.

## Status feedback

`SyncBadge` in the header reports: `Saving…`, `Saved` (with time), `Saved on
device — offline`, `Sync failed` + Retry, or `Memory only` when the browser
refuses IndexedDB. Every message is bilingual (`ar` / `en`).

## Required Supabase configuration

1. Run [`supabase/schema.sql`](../supabase/schema.sql) in **SQL Editor**.
2. **Authentication → Sign In / Providers → Email**: turn **Confirm email**
   off for this phase. With the built-in mailer and confirmation on, Supabase
   throttles signups (`429 over_email_send_rate_limit`) and registration cannot
   complete. Keep it on only if you configure your own SMTP.
3. **Authentication → URL Configuration**: Site URL
   `https://zog049p2w5.dev.ap-jt.com`.
4. No service-role key anywhere. Only `SUPABASE_URL` and
   `SUPABASE_ANON_KEY` are needed, and they are already reaching the app.
