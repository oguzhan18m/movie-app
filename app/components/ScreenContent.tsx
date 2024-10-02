import { SafeAreaView, View } from 'react-native';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ children }: ScreenContentProps) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View className={styles.container}>{children}</View>
    </SafeAreaView>
  );
};
const styles = {
  container: `flex-1 w-full items-center justify-center `,
};
