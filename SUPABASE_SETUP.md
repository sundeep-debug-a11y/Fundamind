# 🚀 Supabase Setup Guide for FundaMind

## 📋 **Prerequisites**
- GitHub account (for Supabase login)
- Node.js installed
- React project (FundaMind)

## 🌟 **Step 1: Create Supabase Project**

1. **Go to Supabase**: https://supabase.com/
2. **Sign up/Login** with GitHub
3. **Click "New Project"**
4. **Fill in details**:
   - **Organization**: Create new or select existing
   - **Project Name**: `fundamind-app`
   - **Database Password**: Generate strong password (save it!)
   - **Region**: Choose closest to your users
5. **Click "Create new project"**
6. **Wait 2-3 minutes** for setup to complete

## 🔑 **Step 2: Get Project Credentials**

1. **Go to Project Settings** (gear icon in sidebar)
2. **Click "API" tab**
3. **Copy these values**:
   - **Project URL**: `https://your-project.supabase.co`
   - **anon public key**: `eyJ...` (long string)

## 📦 **Step 3: Configure Environment Variables**

Add to your `.env` file:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Keep your existing Firebase config if you want both options
VITE_FIREBASE_API_KEY=your-firebase-key
# ... other Firebase vars
```

## 🗄️ **Step 4: Set Up Database Schema**

1. **Go to SQL Editor** in Supabase dashboard
2. **Run this SQL** to create user profiles table:

```sql
-- Create user_profiles table
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  age INTEGER,
  designation TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create function to handle updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();
```

## 🔐 **Step 5: Configure Authentication**

1. **Go to Authentication** in Supabase dashboard
2. **Click "Settings" tab**
3. **Configure these settings**:

### **Site URL Configuration:**
```
Site URL: http://localhost:5173
Additional redirect URLs: 
- http://localhost:3000
- https://your-production-domain.com
```

### **Email Templates (Optional):**
- **Customize confirmation email**
- **Customize password reset email**
- **Add your app branding**

### **Auth Providers:**
- ✅ **Email** (enabled by default)
- 🔧 **Google** (optional - add OAuth credentials)
- 🔧 **GitHub** (optional - add OAuth credentials)

## 🔄 **Step 6: Update Your App to Use Supabase**

### **Option A: Replace Firebase (Recommended)**

Update `src/App.tsx`:

```typescript
// Replace Firebase imports
import { SupabaseAuthProvider } from "./contexts/SupabaseAuthContext";

// Update the providers
export default function AppWithProviders() {
  return (
    <SupabaseAuthProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </SupabaseAuthProvider>
  );
}
```

Update components to use Supabase:

```typescript
// Replace in HomeDashboard.tsx and other components
import { useSupabaseAuth } from "../contexts/SupabaseAuthContext";

// Replace useAuth with useSupabaseAuth
const { user } = useSupabaseAuth();
```

### **Option B: Keep Both (For Testing)**

Create a toggle in your app to switch between Firebase and Supabase.

## 🧪 **Step 7: Test Authentication**

1. **Start your app**: `npm run dev`
2. **Try signing up** with a new email
3. **Check your email** for confirmation link
4. **Click confirmation link**
5. **Try logging in** with the same credentials
6. **Verify user data** appears in Supabase dashboard

## 📊 **Step 8: Monitor Your App**

### **Supabase Dashboard Features:**
- **Authentication**: View users, sessions
- **Database**: Browse tables, run queries
- **API**: Test endpoints, view logs
- **Storage**: File uploads (if needed)
- **Edge Functions**: Serverless functions (if needed)

## 🔧 **Step 9: Production Setup**

### **Environment Variables for Production:**
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### **Security Checklist:**
- ✅ **Row Level Security** enabled
- ✅ **Proper policies** created
- ✅ **Environment variables** secured
- ✅ **Site URLs** configured correctly
- ✅ **Email confirmation** enabled

## 🆚 **Supabase vs Firebase Comparison**

| Feature | Supabase | Firebase |
|---------|----------|----------|
| **Database** | PostgreSQL | Firestore (NoSQL) |
| **Auth** | Built-in + OAuth | Built-in + OAuth |
| **Real-time** | PostgreSQL subscriptions | Firestore listeners |
| **Pricing** | More generous free tier | Limited free tier |
| **Open Source** | ✅ Yes | ❌ No |
| **SQL Support** | ✅ Full SQL | ❌ Limited queries |
| **Learning Curve** | Medium | Easy |

## 🎯 **Supabase Advantages**

### **🆓 Generous Free Tier:**
- **500MB database**
- **50,000 monthly active users**
- **2GB bandwidth**
- **1GB file storage**

### **💪 Powerful Features:**
- **Full PostgreSQL** with extensions
- **Real-time subscriptions**
- **Built-in REST API**
- **Auto-generated TypeScript types**
- **Edge Functions** (serverless)
- **File storage** with CDN

### **🔧 Developer Experience:**
- **SQL Editor** with syntax highlighting
- **API documentation** auto-generated
- **Database migrations**
- **Local development** with CLI
- **Open source** - self-hostable

## 🚨 **Troubleshooting**

### **Common Issues:**

1. **"Invalid API key"**
   - Check your `.env` file
   - Ensure `VITE_` prefix is used
   - Restart development server

2. **"Email not confirmed"**
   - Check spam folder
   - Resend confirmation email
   - Check Site URL configuration

3. **"Row Level Security policy violation"**
   - Verify RLS policies are created
   - Check user is authenticated
   - Review policy conditions

4. **Database connection issues**
   - Check project is fully initialized
   - Verify database password
   - Check network connectivity

## 📞 **Support Resources**

- **Documentation**: https://supabase.com/docs
- **Discord Community**: https://discord.supabase.com/
- **GitHub**: https://github.com/supabase/supabase
- **Examples**: https://github.com/supabase/supabase/tree/master/examples

---

## 🎉 **You're Ready!**

Your FundaMind app now has Supabase integration with:
- ✅ **User authentication**
- ✅ **User profiles in PostgreSQL**
- ✅ **Real-time capabilities**
- ✅ **Secure data access**
- ✅ **Production-ready setup**

**Test your authentication flow and enjoy the power of Supabase!** 🚀
