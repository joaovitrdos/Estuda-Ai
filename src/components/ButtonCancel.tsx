import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Theme } from '../styles/themes/themes';

interface ButtonCancelProps {
  label?: string;
  textColor?: string;
  borderColor?: string;
  onPress: () => void;
}

export function ButtonCancel({
  label = 'Cancelar',
  textColor = Theme.colors.red,
  borderColor = Theme.colors.red,
  onPress,
}: ButtonCancelProps) {
  return (
    <TouchableOpacity
      style={[styles.button, { borderColor }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { color: textColor }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: Theme.fontSize.sm,
  },
});
