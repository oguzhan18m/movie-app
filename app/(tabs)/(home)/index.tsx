import { Stack } from 'expo-router';
import { ScreenContent } from '~/app/components/ScreenContent';
import HomeScreen from '~/app/screens/home/HomeScreen';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <ScreenContent path="app/(tabs)/(home)/index.tsx" title="Home">
        <HomeScreen />
      </ScreenContent>
    </>
  );
}
