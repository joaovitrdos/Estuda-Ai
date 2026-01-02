import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import React from 'react';
import { Theme } from '../styles/themes/themes';

type ButtonProps = {
  title: string;
  onPress: () => void;
  icon?: any;
  style?: any;
};

export function Button({ title, onPress, icon, style }: ButtonProps) {

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      {icon && <Image source={icon} style={styles.icon} />}
      <Text style={styles.text}>
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
});
