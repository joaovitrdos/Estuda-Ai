import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import React from 'react';
import { Theme } from '../styles/themes/themes';

type ButtonProps = {
  title: string;
  onPress: () => void;
  icon?: any;
  style?: any;
  disabled?: boolean;
};

export function Button({
  title,
  onPress,
  icon,
  style,
  disabled = false,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {icon && <Image source={icon} style={styles.icon} />}

      <Text style={[
        styles.text,
        disabled && styles.text,
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
    backgroundColor: Theme.colors.primary,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  disabled: {
    opacity: 0.6,
  },
});
