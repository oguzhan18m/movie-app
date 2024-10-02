import { Stack } from 'expo-router';

export default function FavoritesLayout() {
  return (
    <Stack initialRouteName="favorites">
      <Stack.Screen name="favorites" options={{ title: 'Favorites', headerShown: false }} />
      <Stack.Screen
        name="details"
        options={{
          title: '',
        }}
      />
    </Stack>
  );
}
