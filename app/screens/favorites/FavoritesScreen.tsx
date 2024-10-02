import React, { useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IMovieItem } from '~/app/services/movies/getMovies';
import { MovieCard } from '../home/components/MovieCard';
import { useFocusEffect } from 'expo-router';

interface Props {}

const FavoritesScreen = ({}: Props) => {
  const [favorites, setFavorites] = useState<IMovieItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    const favs = await AsyncStorage.getItem('favorites');
    const favoritesList = favs ? JSON.parse(favs) : [];
    setFavorites(favoritesList);
    setLoading(false);
  };

  useFocusEffect(() => {
    fetchFavorites();
  });

  if (loading) return <ActivityIndicator size="large" color="grey" />;

  return (
    <View className={styles.container}>
      <Text className={styles.title}>Favorites</Text>
      <Text className={styles.resultText}>{favorites.length} favorites found</Text>
      <FlashList
        renderItem={({ item }: { item: IMovieItem }) => (
          <MovieCard key={item?.imdbID} path="(favorites)" item={item} />
        )}
        estimatedItemSize={200}
        data={favorites}
        className={styles.flashList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default FavoritesScreen;

const styles = {
  container: `w-full flex-1 px-[12px] bg-white`,
  flashList: `w-full flex-1`,
  resultText: `text-md text-gray-500 mb-4 ml-2`,
  title: `w-full mt-8 text-[36px] ml-2 font-bold text-gray-800 mb-1`,
};
