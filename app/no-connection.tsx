import { useFocusEffect, useNavigation, useRouter } from 'expo-router';
import {
  Alert,
  BackHandler,
  Linking,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEffect } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';

export default function NoConnectionScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const netInfo = useNetInfo();

  useFocusEffect(() => {
    navigation.setOptions({
      headerShown: false,
      gestureEnabled: false,
    });

    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });

    return unsubscribe;
  });

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  const handleNavigateToSettings = () => {
    if (Platform.OS === 'android') {
      Linking.openSettings();
    } else {
      Linking.openURL('App-prefs:WIFI');
    }
  };

  const handleGoHome = () => {
    if (netInfo.isConnected) {
      router.push({ pathname: '/(tabs)/(home)/' });
    } else {
      Alert.alert('Still no internet connection');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className={styles.container}>
        <Text className={styles.title}>No internet connection</Text>
        <TouchableOpacity onPress={handleNavigateToSettings} className={styles.link}>
          <Text className={styles.linkText}>Go to settings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGoHome} className={styles.link}>
          <Text className={styles.linkText}>Go home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = {
  container: `items-center flex-1 justify-center p-5`,
  title: `text-2xl font-bold`,
  link: `mt-3 pt-4`,
  linkText: `text-base text-[#2e78b7]`,
};
