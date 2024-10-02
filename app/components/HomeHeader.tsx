import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, View } from 'react-native';
import { useSearchStore } from '../store/useSearchStore';
import { useRouter } from 'expo-router';

interface Props {}

const HomeHeader = ({}: Props) => {
  const router = useRouter();
  const searchText = useSearchStore((s) => s.searchText);
  const type = useSearchStore((s) => s.type);
  const year = useSearchStore((s) => s.year);
  const setSearchText = useSearchStore((s) => s.setSearchText);

  const handleOpenFilterModal = () => {
    router.push({ pathname: '/filter-modal' });
  };

  return (
    <SafeAreaView className={styles.container}>
      <View className={styles.inputContainer}>
        <FontAwesome name="search" size={18} color="#a8a8a8" className={styles.icon} />
        <TextInput
          placeholder="Search..."
          value={searchText}
          onChangeText={(text: string) => setSearchText(text)}
          className={styles.textInput}
          returnKeyLabel="Search"
          returnKeyType="search"
        />
      </View>
      <TouchableOpacity
        onPress={handleOpenFilterModal}
        className={`${styles.filterBtn} ${type || year ? 'bg-[#151515]' : 'bg-[#f3f3f3]'}`}>
        <FontAwesome
          name="sliders"
          size={18}
          color={type || year ? 'white' : '#a8a8a8'}
          className={styles.filterIcon}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeHeader;

const styles = {
  container: `w-full mt-6 flex-row items-center justify-between bg-white`,
  inputContainer: `flex-row w-[82%]  my-6 px-4 py-4 items-center  border border-gray-300 bg-[#F3F3F3] rounded-[300]`,
  textInput: `w-full`,
  icon: `mr-2`,
  filterBtn: `w-[15%] py-4 my-6 items-center justify-center border border-gray-300 rounded-[300]`,
  filterIcon: ``,
};
