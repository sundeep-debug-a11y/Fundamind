# 🔥 Firebase Authentication Setup Guide

## 📋 **Prerequisites**
- Google account
- Node.js installed
- React project (FundaMind)

## 🚀 **Step 1: Create Firebase Project**

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Click "Create a project"**
3. **Enter project name**: `fundamind-app`
4. **Enable Google Analytics** (optional)
5. **Click "Create project"**

## ⚙️ **Step 2: Enable Authentication**

1. **In Firebase Console**, go to **Authentication**
2. **Click "Get started"**
3. **Go to "Sign-in method" tab**
4. **Enable these providers**:
   - ✅ **Email/Password** (for login/signup)
   - ✅ **Phone** (for OTP verification)
   - ✅ **Google** (optional social login)

## 🔑 **Step 3: Get Firebase Config**

1. **Go to Project Settings** (gear icon)
2. **Scroll down to "Your apps"**
3. **Click "Web" icon** (`</>`)
4. **Register app**: `FundaMind Web`
5. **Copy the config object**

## 📦 **Step 4: Install Firebase SDK**

```bash
npm install firebase
```

## 🛠️ **Step 5: Create Firebase Config File**

Create `src/firebase/config.ts`:

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

## 🔧 **Step 6: Update AuthContext.tsx**

Replace the TODO comments in `src/contexts/AuthContext.tsx`:

```typescript
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

// In checkAuthState function:
onAuthStateChanged(auth, async (firebaseUser) => {
  if (firebaseUser) {
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    if (userDoc.exists()) {
      setUser({
        id: firebaseUser.uid,
        name: firebaseUser.displayName || '',
        email: firebaseUser.email || '',
        ...userDoc.data()
      });
    }
  }
  setIsLoading(false);
});

// In login function:
const userCredential = await signInWithEmailAndPassword(auth, email, password);
const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));

// In signup function:
const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
await updateProfile(userCredential.user, { displayName: userData.name });
await setDoc(doc(db, 'users', userCredential.user.uid), {
  name: userData.name,
  phone: userData.phone,
  age: userData.age,
  designation: userData.designation,
  createdAt: new Date()
});

// In logout function:
await signOut(auth);
```

## 🛡️ **Step 7: Set up Firestore Security Rules**

In Firebase Console > Firestore Database > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Public read access for app content
    match /courses/{document=**} {
      allow read: if true;
    }
  }
}
```

## 📱 **Step 8: Phone Authentication Setup**

1. **In Firebase Console** > Authentication > Sign-in method
2. **Enable Phone authentication**
3. **Add your domain** to authorized domains
4. **For development**: Add `localhost` to authorized domains

## 🔐 **Step 9: Environment Variables**

Create `.env` file in project root:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
```

Update config file:
```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

## ✅ **Step 10: Test Authentication**

1. **Start your app**: `npm run dev`
2. **Try signing up** with a new account
3. **Check Firebase Console** > Authentication > Users
4. **Verify user data** in Firestore > users collection

## 🎯 **Alternative: Supabase Setup**

If you prefer Supabase:

1. **Go to**: https://supabase.com/
2. **Create new project**
3. **Install**: `npm install @supabase/supabase-js`
4. **Get API keys** from Settings > API
5. **Use similar pattern** as Firebase in AuthContext

## 🚨 **Security Best Practices**

1. **Never commit** `.env` file to git
2. **Use environment variables** for all config
3. **Set up proper Firestore rules**
4. **Enable App Check** for production
5. **Use HTTPS** in production

## 📞 **Support**

- **Firebase Docs**: https://firebase.google.com/docs/auth
- **React Firebase**: https://github.com/CSFrequency/react-firebase-hooks
- **Supabase Docs**: https://supabase.com/docs/guides/auth

---

**Your authentication system is now ready! 🎉**
