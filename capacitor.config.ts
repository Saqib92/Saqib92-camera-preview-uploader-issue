import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.wizdiary.app',
  appName: 'campeview-uploader',
  webDir: 'www',
  plugins: {
    GoogleAuth: {
      scopes: ["profile", "email"],
      serverClientId: "1077151725207-ji53c56mjpo4pet9kacqknkboc8t2g4i.apps.googleusercontent.com",
      forceCodeForRefreshToken: true
    }
  }
};

export default config;
