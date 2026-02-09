import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signInWithCredential } from "firebase/auth";
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { Capacitor } from '@capacitor/core';

// ✅ استخدام المتغيرات البيئية لضمان الأمان والمرونة
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

// منع الانهيار في حالة عدم وجود مفتاح API
let app;
try {
  if (!firebaseConfig.apiKey) {
    console.warn("Firebase API Key is missing. Firebase features will be disabled.");
    app = initializeApp({ ...firebaseConfig, apiKey: "dummy-key" }); 
  } else {
    app = initializeApp(firebaseConfig);
  }
} catch (error) {
  console.error("Firebase initialization failed:", error);
}

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

/**
 * تسجيل الدخول عبر جوجل
 * يدعم كلاً من الويب والتطبيق الأصلي (Android/iOS)
 */
export const signInWithGoogle = async () => {
  try {
    if (Capacitor.isNativePlatform()) {
      // استخدام الإضافة الأصلية للهواتف
      const result = await FirebaseAuthentication.signInWithGoogle();
      const credential = GoogleAuthProvider.credential(result.credential?.idToken);
      const userCredential = await signInWithCredential(auth, credential);
      const idToken = await userCredential.user.getIdToken();
      return { user: userCredential.user, idToken };
    } else {
      // استخدام الويب
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      return { user: result.user, idToken };
    }
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

/**
 * تسجيل الدخول عبر فيسبوك
 * يدعم كلاً من الويب والتطبيق الأصلي (Android/iOS)
 */
export const signInWithFacebook = async () => {
  try {
    if (Capacitor.isNativePlatform()) {
      // استخدام الإضافة الأصلية للهواتف
      const result = await FirebaseAuthentication.signInWithFacebook();
      const credential = FacebookAuthProvider.credential(result.credential?.accessToken);
      const userCredential = await signInWithCredential(auth, credential);
      const idToken = await userCredential.user.getIdToken();
      return { user: userCredential.user, idToken };
    } else {
      // استخدام الويب
      const result = await signInWithPopup(auth, facebookProvider);
      const idToken = await result.user.getIdToken();
      return { user: result.user, idToken };
    }
  } catch (error) {
    console.error("Error signing in with Facebook", error);
    throw error;
  }
};
