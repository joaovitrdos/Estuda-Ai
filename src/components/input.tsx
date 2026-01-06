import { View, TextInput, StyleSheet } from 'react-native';
import { Theme } from '../styles/themes/themes';

type InputProps = {
  disabled?: boolean;
} & React.ComponentProps<typeof TextInput>;

export function Input({ disabled = false, style, ...props }: InputProps) {
  return (
    <View
      style={[
        styles.container,
        disabled && styles.containerDisabled,
      ]}
    >
      <TextInput
        placeholderTextColor={Theme.colors.text}
        style={[
          styles.input,
          disabled && styles.input,
          style,
        ]}
        editable={!disabled}
        selectTextOnFocus={!disabled}
        {...props}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 14,
    borderColor: Theme.colors.text,
  },
  input: {
    padding: 14,
    fontSize: 16,
    borderColor: Theme.colors.primary,
    color: Theme.colors.text,
  },
  containerDisabled: {
    opacity: 0.6,
  },

});
