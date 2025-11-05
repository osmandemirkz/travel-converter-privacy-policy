import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import 'react-native-url-polyfill/auto';
import 'react-native-reanimated';

export default function RootLayout() {
  useFrameworkReady();

  useEffect(() => {
    if (Platform.OS !== 'web') {
      import('react-native-google-mobile-ads').then((mobileAdsModule) => {
        mobileAdsModule.default()
          .initialize()
          .then((adapterStatuses) => {
            console.log('AdMob initialized', adapterStatuses);
          })
          .catch((error) => {
            console.error('AdMob initialization error:', error);
          });
      }).catch((error) => {
        console.error('Failed to load AdMob module:', error);
      });
    }
  }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
