import React from 'react';
import { FlashList } from '@shopify/flash-list';
import { ActivityIndicator, RefreshControl, Text, View } from 'react-native';
import { MovieCard } from './components/MovieCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { QueryKeys } from '~/app/services/query-keys';
import getMovies, { IMovieItem } from '~/app/services/movies/getMovies';
import { useSearchStore } from '~/app/store/useSearchStore';
import LoadingOverlay from '~/app/components/LoadingOverlay';

interface Props {}

const HomeScreen = ({}: Props) => {
  const searchText = useSearchStore((s) => s.searchText);
  const year = useSearchStore((s) => s.year);
  const type = useSearchStore((s) => s.type);
  const [refreshing, setRefreshing] = React.useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch, isLoading } =
    useInfiniteQuery({
      queryKey: [QueryKeys.GET_MOVIES, searchText, year, type],
      queryFn: async ({ pageParam = 1 }) => await getMovies(pageParam, searchText, year, type),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const totalResults = parseInt(lastPage?.totalResults, 10);
        const nextPage = allPages.length + 1;

        return nextPage * 10 <= totalResults ? nextPage : undefined;
      },
    });

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const allMovies = data?.pages.flatMap((p) => p?.Search) || [];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  }, [refetch]);

  if (isLoading) return <LoadingOverlay />;

  return (
    <View className={styles.container}>
      <Text className={styles.resultText}>{data?.pages?.[0]?.totalResults ?? 0} results found</Text>
      {data?.pages?.[0]?.Response === 'False' ? (
        <View className={styles.empty}>
          <Text className={styles.emptyText}>
            Please type something else to find new contents...
          </Text>
        </View>
      ) : (
        <FlashList
          renderItem={({ item }: { item: IMovieItem }) => (
            <MovieCard key={item?.imdbID} path="(home)" item={item} />
          )}
          estimatedItemSize={200}
          data={allMovies}
          className={styles.flashList}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.8}
        />
      )}
      {isFetchingNextPage && (
        <View className={styles.loadingContainer}>
          <ActivityIndicator size="small" color="grey" />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = {
  container: `w-full flex-1 px-[12px] bg-red`,
  flashList: `w-full  flex-1`,
  empty: `w-full flex-1 items-center justify-center`,
  loadingContainer: `my-4 align-center`,
  resultText: `text-md text-gray-500 mb-4 ml-2`,
  emptyText: `text-lg text-gray-500 mb-4 ml-2`,
};
