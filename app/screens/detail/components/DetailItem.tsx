import { Text, View } from 'react-native';

interface Props {
  title: string;
  value: string | undefined;
}

const DetailItem = ({ title, value }: Props) => (
  <View className={styles.detailItem}>
    <Text className={styles.detailTitle}>{title}:</Text>
    <Text className={styles.detailValue}>{value?.length ? value : '--'}</Text>
  </View>
);

export default DetailItem;

const styles = {
  detailItem: `mb-2`,
  detailTitle: `text-lg font-semibold text-black`,
  detailValue: `text-lg text-gray-600`,
};
