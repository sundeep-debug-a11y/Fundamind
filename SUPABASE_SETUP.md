# Supabase Authentication Setup

This project has been migrated from Firebase to Supabase for authentication. Follow these steps to set up Supabase:

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login and create a new project
3. Wait for the project to be ready (usually takes 2-3 minutes)

## 2. Get Your Project Credentials

1. Go to your project dashboard
2. Click on "Settings" → "API"
3. Copy the following:
   - **Project URL** (something like `https://xxxxx.supabase.co`)
   - **Anon/Public Key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## 3. Set Up Environment Variables

1. Create a `.env` file in the root directory (copy from `.env.example`)
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 4. Run Database Migration

1. In your Supabase dashboard, go to "SQL Editor"
2. Create a new query
3. Copy and paste the contents of `supabase-migration.sql`
4. Run the query to create the profiles table and policies

## 5. Install Dependencies

```bash
npm install
```

## 6. Start the Development Server

```bash
npm run dev
```

## Features Enabled

- ✅ Email/Password Authentication
- ✅ User Profiles with custom fields (name, phone, age, designation)
- ✅ Row Level Security (users can only access their own data)
- ✅ Automatic profile creation on signup
- ✅ Real-time auth state management

## Optional: Enable Additional Auth Providers

In your Supabase dashboard, go to "Authentication" → "Providers" to enable:
- Google
- GitHub
- Discord
- And many more...

## Migration Notes

- Removed Firebase dependency
- Replaced localStorage-based auth with Supabase
- All existing auth flows (login, signup, logout, profile update) now use Supabase
- User data is now stored securely in PostgreSQL instead of localStorage
