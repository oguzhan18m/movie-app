import { Text, View } from 'react-native';

interface Props {
  source: string;
  value: string;
}

const RatingCard = ({ source, value }: Props) => (
  <View className={styles.ratingCard}>
    <Text className={styles.ratingSource}>{source}</Text>
    <Text className={styles.ratingValue}>{value}</Text>
  </View>
);

export default RatingCard;

const styles = {
  // ... existing styles ...
  ratingsTitle: `text-lg font-bold text-gray-800 mt-4 mb-2`,
  ratingsList: `flex-row`,
  ratingCard: `bg-gray-200 p-4 rounded-lg mr-4`,
  ratingSource: `text-md font-semibold text-gray-700`,
  ratingValue: `text-md text-gray-600`,
};
