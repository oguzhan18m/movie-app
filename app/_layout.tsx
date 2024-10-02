import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../global.css';
import { Stack, useRouter } from 'expo-router';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

const queryClient = new QueryClient();

export default function RootLayout() {
  const router = useRouter();
  useReactQueryDevTools(queryClient);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        router.push({ pathname: '/no-connection' });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ title: 'Home', headerShown: false }} />
          <Stack.Screen
            name="filter-modal"
            options={{
              presentation: 'modal',
              title: 'Filters',
              headerTitleAlign: 'center',
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                  <Text className={styles.goBackTitle}>Close</Text>
                </TouchableOpacity>
              ),
            }}
          />
        </Stack>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

const styles = {
  goBackTitle: `w-full text-lg font-bold text-blue-500`,
};
