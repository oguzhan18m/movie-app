import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useSearchStore } from '~/app/store/useSearchStore';
import FilterCard from './components/FilterCard';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Button } from '~/app/components/Button';
import { useRouter } from 'expo-router';
import { MovieType } from '~/app/services/movies/getMovies';

interface Props {}

const FilterModalScreen = ({}: Props) => {
  const router = useRouter();
  const { height } = useWindowDimensions();

  const [type, setType] = useState('');
  const [year, setYear] = useState('');

  const storeType = useSearchStore((s) => s.type);
  const storeYear = useSearchStore((s) => s.year);
  const setStoreType = useSearchStore((s) => s.setType);
  const setStoreYear = useSearchStore((s) => s.setYear);
  const resetStore = useSearchStore((s) => s.resetStore);

  useEffect(() => {
    if (storeType) {
      setType(storeType);
    }

    if (storeYear) {
      setYear(storeYear);
    }
  }, [storeType, storeYear]);

  const typeBottomSheetRef = useRef<BottomSheet>(null);
  const yearBottomSheetRef = useRef<BottomSheet>(null);

  const years: string[] = Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) =>
    (1900 + i).toString()
  ).reverse();

  const handleApplyFilters = () => {
    setStoreType(type as MovieType);
    setStoreYear(year);
    router.back();
  };

  const handleResetFilter = () => {
    setType('');
    setYear('');
    resetStore();
  };

  return (
    <View className={styles.container}>
      <FilterCard
        title="Type"
        endText={type}
        onPress={() => typeBottomSheetRef.current?.expand()}
        icon={<Ionicons name="list" size={16} />}
      />
      <FilterCard
        title="Year"
        endText={year}
        onPress={() => yearBottomSheetRef.current?.expand()}
        icon={<FontAwesome name="calendar" size={16} />}
      />

      <Button title="Apply filters" onPress={handleApplyFilters} />

      <Button
        className={`mt-4 bg-[grey]`}
        disabled={!type && !year}
        title="Reset filters"
        onPress={handleResetFilter}
      />

      {/* TYPE BOTTOM SHEET */}
      <BottomSheet
        enablePanDownToClose
        snapPoints={[height * 0.001, height * 0.22]}
        ref={typeBottomSheetRef}
        handleIndicatorStyle={{
          backgroundColor: 'grey',
          width: 54,
          height: 5,
        }}
        backgroundStyle={{
          backgroundColor: '#f3f3f3',
        }}
        handleStyle={{
          borderTopColor: '#f3f3f3',
          borderTopWidth: 1,
          borderRadius: 20,
        }}
        style={{
          borderRadius: 20,
        }}
        containerStyle={{
          borderRadius: 20,
        }}>
        <BottomSheetView style={{ flex: 1, paddingHorizontal: 20 }}>
          <View>
            <TouchableOpacity
              onPress={() => typeBottomSheetRef.current?.close()}
              style={{ alignSelf: 'flex-end' }}>
              <Text className={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
          <Picker
            style={{ flex: 1 }}
            selectedValue={type}
            onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
            <Picker.Item label="Movie" value="movie" />
            <Picker.Item label="Series" value="series" />
            <Picker.Item label="Episode" value="episode" />
            <Picker.Item label="Game" value="game" />
          </Picker>
        </BottomSheetView>
      </BottomSheet>

      {/* YEAR DATE PICKER */}
      <BottomSheet
        enablePanDownToClose
        snapPoints={[height * 0.001, height * 0.22]}
        ref={yearBottomSheetRef}
        handleIndicatorStyle={{
          backgroundColor: 'grey',
          width: 54,
          height: 5,
        }}
        backgroundStyle={{
          backgroundColor: '#f3f3f3',
        }}
        handleStyle={{
          borderTopColor: '#f3f3f3',
          borderTopWidth: 1,
          borderRadius: 20,
        }}
        style={{
          borderRadius: 20,
        }}
        containerStyle={{
          borderRadius: 20,
        }}>
        <BottomSheetView style={{ flex: 1, paddingHorizontal: 20 }}>
          <View>
            <TouchableOpacity
              onPress={() => yearBottomSheetRef.current?.close()}
              style={{ alignSelf: 'flex-end' }}>
              <Text className={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
          <Picker
            style={{ flex: 1 }}
            selectedValue={year}
            onValueChange={(itemValue, itemIndex) => setYear(itemValue)}>
            {years.map((y) => (
              <Picker.Item key={y} label={y} value={y} />
            ))}
          </Picker>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default FilterModalScreen;

const styles = {
  container: `w-full flex-1 p-[12px] bg-white`,
  flashList: `w-full flex-1`,
  loadingContainer: `my-4 align-center`,
  resultText: `text-md text-gray-500 mb-4 ml-2`,
  doneText: `text-lg font-bold text-blue-500`,
};
