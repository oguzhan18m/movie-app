import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { IMovieItem } from '~/app/services/movies/getMovies';

type Props = {
  item: IMovieItem | undefined;
  path: '(home)' | '(favorites)';
};

export const MovieCard = ({ item, path }: Props) => {
  const router = useRouter();

  const handleNavigateToDetail = () => {
    router.push({
      pathname: `/(tabs)/${path}/details`,
      params: {
        imdbID: item?.imdbID,
      },
    });
  };

  return (
    <TouchableOpacity onPress={handleNavigateToDetail} className={styles.root} activeOpacity={0.8}>
      <Image
        source={{
          uri:
            item?.Poster === 'N/A'
              ? 'https://cringemdb.com/img/movie-poster-placeholder.png'
              : item?.Poster,
        }}
        className={styles.image}
        resizeMode="cover"
      />
      <View className={styles.detailsContainer}>
        <Text className={styles.title}>{item?.Title}</Text>
        <Text className={styles.year}>{item?.Year}</Text>
        <Text className={styles.type}>{item?.Type}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  root: 'flex-row w-full border-b border-[#F3F3F3] my-2 p-2',
  image: 'w-32 h-36 rounded-md',
  detailsContainer: 'flex-1 ml-4 justify-center',
  title: 'text-lg font-bold text-gray-800 mb-1',
  year: 'text-sm text-gray-600 mb-1',
  type: 'text-xs text-gray-500 capitalize',
};
