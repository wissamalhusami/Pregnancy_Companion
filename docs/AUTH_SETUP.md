# RIFQAH — accounts, authentication and privacy

RIFQAH (رِفْقَة) keeps every pregnancy feature working without an account, and adds
real Supabase authentication for accounts, profiles and per-user data isolation.

## What is implemented

| Capability | Status |
| --- | --- |
| Email + password registration / login | Implemented (`src/pages/Auth.tsx`, `src/state/AuthContext.tsx`) |
| Password reset (email link) + set-new-password screen | Implemented |
| Google OAuth | Implemented — needs your Google/Supabase credentials |
| Facebook OAuth | Implemented — needs your Facebook/Supabase credentials |
| Persistent sessions | Implemented (Supabase session restore on boot) |
| Protected pages + account-scoped local data | Implemented (`src/App.tsx`, `src/lib/auth.ts`) |
| Profile management (name, avatar URL, language) | Implemented (`src/pages/Profile.tsx`) |
| Row Level Security | Implemented (`supabase/schema.sql`) |
| Guest / local mode when Supabase is absent | Implemented |

## 1. Create the Supabase project

1. Sign in at https://supabase.com and create a project (the free tier is enough).
2. Open **Project Settings → API** and copy:
   - **Project URL** (for example `https://abcd1234.supabase.co`)
   - **anon public** key

> Never use the **service_role** key in this app. It bypasses RLS and is not read
> anywhere in the codebase.

## 2. Run the database schema

Open **SQL Editor → New query**, paste the contents of `supabase/schema.sql` and
run it. It creates the `profiles` table with owner-only RLS policies, an
`updated_at` trigger and a signup trigger that provisions a profile row from the
OAuth/email metadata. It is safe to re-run.

## 3. Add the environment variables

Local development — create `.env` from `.env.example`:

```
SUPABASE_URL=https://abcd1234.supabase.co
SUPABASE_ANON_KEY=<anon public key>
VITE_SUPABASE_URL=https://abcd1234.supabase.co
VITE_SUPABASE_ANON_KEY=<anon public key>
```

Deployed app — add the same names in **AppJet → Settings → Environment
variables**. `SUPABASE_URL` / `SUPABASE_ANON_KEY` are read at container start by
`GET /api/config`, so the app picks them up without a rebuild. The `VITE_` pair
is baked in at build time and is used as a fallback.

If no credentials are present the app runs in **local mode**: all pregnancy
features work, data is stored on the device, and the auth screens explain what
to configure.

## 4. Configure redirect URLs (required for OAuth and password reset)

In **Authentication → URL Configuration**:

- **Site URL**: your app URL, e.g. `https://your-app.example.com`
- **Redirect URLs** — add all that apply:
  - `http://localhost:5173/auth/callback`
  - `https://your-app.example.com/auth/callback`

The app sends `emailRedirectTo` / `redirectTo` as `<origin>/auth/callback`
automatically, so no code change is needed per environment.

## 5. Enable Google sign-in

1. In Google Cloud Console → **APIs & Services → Credentials**, create an
   **OAuth client ID → Web application**.
2. Add **Authorized redirect URI**:
   `https://<your-project-ref>.supabase.co/auth/v1/callback`
3. In Supabase go to **Authentication → Providers → Google**, enable it and paste
   the Client ID and Client Secret.

## 6. Enable Facebook sign-in

1. In Meta for Developers, create an app with the **Facebook Login** product.
2. In **Facebook Login → Settings → Valid OAuth Redirect URIs** add:
   `https://<your-project-ref>.supabase.co/auth/v1/callback`
3. In Supabase go to **Authentication → Providers → Facebook**, enable it and
   paste the App ID and App Secret.

If a provider is not enabled, the app shows a clear bilingual message instead of
failing silently.

## 7. Email confirmation

Supabase requires email confirmation by default. Either keep it (the app shows a
"check your inbox" screen and can resend the link) or disable it in
**Authentication → Providers → Email → Confirm email** for a faster classroom
demo.

## Privacy model

- Pregnancy tracking data is stored in the browser, namespaced per account
  (`data:<user-id>`), so two accounts on the same device never see each other's
  records.
- Only the account name, optional avatar URL and language preference are stored
  server-side, in a row that only its owner can read or write (RLS).
- No passwords, medical notes or pregnancy records are sent to the server by
  default. `pregnancy_records` exists in the schema for opt-in cloud backup and
  carries the same owner-only policies.
- The app is educational and never presents itself as diagnosis; emergency
  guidance always routes to real medical care.
