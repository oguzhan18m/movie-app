import React from 'react';
import { ActivityIndicator, SafeAreaView, Text, View } from 'react-native';

const LoadingOverlay = () => {
  return (
    <SafeAreaView>
      <View className={styles.container}>
        <ActivityIndicator />
        <Text className={styles.text}>Loading</Text>
      </View>
    </SafeAreaView>
  );
};

export default LoadingOverlay;

const styles = {
  container: `flex-1 w-full items-center justify-center`,
  text: 'text-xs text-gray-500 capitalize',
};
