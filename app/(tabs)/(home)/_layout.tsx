import { Stack } from 'expo-router';
import { View } from 'react-native';
import HomeHeader from '~/app/components/HomeHeader';

export default function HomeLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          header: () => (
            <View style={{ paddingHorizontal: 12, backgroundColor: 'white' }}>
              <HomeHeader />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          title: '',
        }}
      />
    </Stack>
  );
}
