import { queryClient } from '@/src/api/client';
import { useColorScheme } from '@/src/hooks/use-color-scheme.web';
import { store } from '@/src/store';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Provider } from "react-redux";
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
     <Provider store={store}>
      <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={config}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="chat/ChatScreen" options={{ headerShown: false }} />
          <Stack.Screen name="chat/ProfileScreen" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </TamaguiProvider>
      </QueryClientProvider>
      </Provider>
  );
}
