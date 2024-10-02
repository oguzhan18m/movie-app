import { Stack } from 'expo-router';
import { ScreenContent } from '../../components/ScreenContent';
import FavoritesScreen from '../../screens/favorites/FavoritesScreen';

export default function Favorites() {
  return (
    <>
      <Stack.Screen />
      <ScreenContent path="app/(tabs)/(home)/index.tsx" title="Home">
        <FavoritesScreen />
      </ScreenContent>
    </>
  );
}
