import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
  endText?: string;
}

const FilterCard = ({ onPress, title, icon, endText }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} className={styles.root}>
      <View className={styles.container}>
        {icon}
        <Text className={styles.title}>{title}</Text>
      </View>
      <View className={styles.container}>
        {endText && <Text className={styles.endText}>{endText}</Text>}
        <Ionicons name="chevron-forward" size={16} />
      </View>
    </TouchableOpacity>
  );
};

export default FilterCard;

const styles = {
  root: `w-full p-4 mb-4 flex-row items-center justify-between border border-gray-300 bg-[#F3F3F3] rounded-lg`,
  container: `flex-row items-center`,
  title: `text-md text-black-400 ml-2`,
  endText: `text-md text-blue-500 capitalize ml-2`,
};
