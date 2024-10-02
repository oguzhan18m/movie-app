import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { ScreenContent } from './components/ScreenContent';
import FilterModalScreen from './screens/filter/FilterModalScreen';

export default function Modal() {
  return (
    <>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <ScreenContent path="app/filter-modal.tsx" title="Filter">
        <FilterModalScreen />
      </ScreenContent>
    </>
  );
}
