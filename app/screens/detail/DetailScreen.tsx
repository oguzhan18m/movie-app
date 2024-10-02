import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '~/app/services/query-keys';
import getDetail from '~/app/services/movies/getDetail';
import { useFocusEffect, useLocalSearchParams, useNavigation } from 'expo-router';
import DetailItem from './components/DetailItem';
import LoadingOverlay from '~/app/components/LoadingOverlay';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlashList } from '@shopify/flash-list';
import RatingCard from './components/RatingCard';

const height = Dimensions.get('screen').height;

interface Props {}

const DetailScreen = ({}: Props) => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const navigation = useNavigation();
  const local = useLocalSearchParams();
  const imdbID = local.imdbID as string;

  const fetchFavorites = async () => {
    const favs = await AsyncStorage.getItem('favorites');
    const favoritesList = favs ? JSON.parse(favs) : [];
    setFavorites(favoritesList);
  };

  useFocusEffect(() => {
    fetchFavorites();
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleAddToFavorites}>
          <Ionicons
            color={favorites.some((fav) => fav.imdbID === imdbID) ? 'red' : 'grey'}
            name="heart"
            size={32}
          />
        </TouchableOpacity>
      ),
    });
  });

  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.GET_DETAIL, imdbID],
    queryFn: async () => await getDetail(imdbID),
  });

  const handleAddToFavorites = async () => {
    if (favorites.some((fav) => fav.imdbID === imdbID)) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((fav) => fav.imdbID !== imdbID);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      fetchFavorites();
    } else {
      // Add to favorites
      favorites.push(data);
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      fetchFavorites();
    }
  };

  if (isLoading) return <LoadingOverlay />;

  return (
    <ScrollView className={styles.container} showsVerticalScrollIndicator={false}>
      <Image
        source={{
          uri:
            data?.Poster === 'N/A'
              ? 'https://cringemdb.com/img/movie-poster-placeholder.png'
              : data?.Poster,
        }}
        style={{ height: height * 0.4, backgroundColor: '#f3f3f3' }}
        resizeMode="contain"
        className={styles.img}
      />

      <View className="w-full px-[12px]">
        <Text className={styles.title}>{data?.Title}</Text>
        <Text className={styles.year}>
          {data?.Year} | {data?.Rated}
        </Text>
        <Text className={styles.plot}>{data?.Plot}</Text>
        <View className={styles.detailsContainer}>
          <DetailItem title="Director" value={data?.Director} />
          <DetailItem title="Writer" value={data?.Writer} />
          <DetailItem title="Actors" value={data?.Actors} />
          <DetailItem title="Genre" value={data?.Genre} />
          <DetailItem title="Released" value={data?.Released} />
          <DetailItem title="Runtime" value={data?.Runtime} />
          <DetailItem title="Language" value={data?.Language} />
          <DetailItem title="Country" value={data?.Country} />
          <DetailItem title="Awards" value={data?.Awards} />
          <DetailItem title="Box Office" value={data?.BoxOffice} />
          <DetailItem
            title="IMDb Rating"
            value={`${data?.imdbRating} (${data?.imdbVotes} votes)`}
          />
        </View>
        <Text className={styles.ratingsTitle}>Ratings:</Text>
        <FlashList
          horizontal
          estimatedItemSize={100}
          data={data?.Ratings}
          renderItem={({ item }) => <RatingCard source={item.Source} value={item.Value} />}
          keyExtractor={(item) => item.Source}
          showsHorizontalScrollIndicator={false}
          className={styles.ratingsList}
        />
      </View>
    </ScrollView>
  );
};

export default DetailScreen;

const styles = {
  container: `flex-1 bg-white`,
  img: `w-full  mb-4`,
  title: `text-2xl font-bold text-gray-800 mb-1`,
  year: `text-lg text-gray-600 mb-2`,
  plot: `text-lg text-gray-500 mb-4`,
  detailsContainer: `mt-4`,
  ratingsTitle: `text-lg font-semibold text-black`,
  ratingsList: `flex-row mb-6 bg-white`,
};
