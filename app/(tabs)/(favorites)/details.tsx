import { Stack } from 'expo-router';
import { ScreenContent } from '~/app/components/ScreenContent';
import DetailScreen from '~/app/screens/detail/DetailScreen';

export default function Details() {
  return (
    <>
      <Stack.Screen options={{ title: '' }} />
      <ScreenContent path="app/(tabs)/(home)/details.tsx" title="Details">
        <DetailScreen />
      </ScreenContent>
    </>
  );
}
