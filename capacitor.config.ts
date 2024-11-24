import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.nasdaq.app',
  appName: 'Nasdaq Stock App',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
