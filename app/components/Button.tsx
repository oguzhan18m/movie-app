import { forwardRef } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

type ButtonProps = {
  title: string;
  disabled?: boolean;
} & TouchableOpacityProps;

export const Button = forwardRef<TouchableOpacity, ButtonProps>(
  ({ title, disabled, ...touchableProps }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        {...touchableProps}
        className={`${disabled ? styles.disabled : styles.button} ${touchableProps.className}`}>
        <Text className={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  }
);

const styles = {
  button: 'items-center bg-black rounded-[28px] shadow-xs p-4',
  buttonText: 'text-white text-lg text-center',
  disabled: `items-center bg-[#dedede] rounded-[28px] shadow-xs p-4`,
};
