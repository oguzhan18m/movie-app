import { Tabs } from 'expo-router';
import { TabBarIcon } from '../components/TabBarIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(favorites)"
        options={{
          title: 'Favorites',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        }}
      />
    </Tabs>
  );
}
