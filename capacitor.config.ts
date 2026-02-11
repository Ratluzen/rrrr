import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  version: '3.3.6',
  appId: 'com.ratnzer.app',
  appName: 'خدمات راتنزر',
  webDir: 'dist',
  server: {
    iosScheme: 'https',
    allowNavigation: [
      'ratnzer-services-bb0a0cce4837.herokuapp.com',
      '*.paytabs.com',
      '*.paytabs.com.sa',
      '*.paytabs.io'
    ]
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      launchFadeOutDuration: 300,
      backgroundColor: "#0f172a",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      androidSpinnerStyle: "large",
      spinnerColor: "#10b981",
      splashFullScreen: true,
      splashImmersive: true
    },
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ["google.com", "facebook.com"]
    }
  }
};

export default config;
