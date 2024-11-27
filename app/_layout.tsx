import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Image } from 'react-native';
import { store } from '../common/store/store';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../common/locales/i18n';
import Colors from '@/common/constants/Colors';


export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}> 
        <RootLayoutNav />
      </I18nextProvider>
    </Provider>
  );
}

function RootLayoutNav() {

  const { t } = useTranslation();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.black,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitle: () => (
          <Image
            source={require('@/assets/images/LogoBivouApp.png')}
            style={{ width: 200, height: 40 }}
            resizeMode="contain"
          />
        ),
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="index" options={{ headerBackVisible: false }} />
      <Stack.Screen name="(tabs)" options={{ headerBackVisible: false }}/>
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      <Stack.Screen name="users/screens/login" options={{headerBackVisible: false }} />
      <Stack.Screen name="users/screens/signup" options={{headerBackVisible: false }} />
      <Stack.Screen name="users/screens/testScreen" options={{ headerBackTitle: t("common:navigation_back") }} />
      <Stack.Screen name="searchBivouacs/screens/searchBivouacList" options={{headerBackTitle: t("common:navigation_back") }} />
      <Stack.Screen name="searchBivouacs/screens/searchBivouacMap" options={{ headerBackTitle: t("common:navigation_back") }} />
      <Stack.Screen name="reservationBivouacs/screens/detailBivouac" options={{ headerBackTitle: t("common:navigation_back") }} />
      <Stack.Screen name="reservationBivouacs/screens/detailReservation" options={{ headerBackTitle: t("common:navigation_back") }} />
      <Stack.Screen name="profilePage/screens/changeLanguage" options={{ headerBackTitle: t("common:navigation_back") }} />
      <Stack.Screen name="profilePage/screens/privacyPolicy" options={{ headerBackTitle: t("common:navigation_back") }} />
      <Stack.Screen name="profilePage/screens/reservationHistory" options={{ headerBackTitle: t("common:navigation_back") }} />
      <Stack.Screen name="profilePage/screens/personalInformation" options={{ headerBackTitle: t("common:navigation_back") }} />
    </Stack>
  );
}