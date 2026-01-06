import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Theme } from '../styles/themes/themes';

interface BackButtonProps {
  showTitle?: boolean;
  titleText?: string;
  showBackButton?: boolean;
}

export const BackButton: React.FC<BackButtonProps> = ({
  showTitle = true,
  titleText = 'Voltar',
  showBackButton = true,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.side}>
        {showBackButton && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Image
              source={require('../styles/icons/left.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        )}
      </View>/
      <View style={styles.center}>
        {showTitle && <Text style={styles.title}>{titleText}</Text>}
      </View>
      <View style={styles.side} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    paddingHorizontal: 12,
    backgroundColor: Theme.colors.background,
  },

  side: {
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: Theme.fontSize.lg,
    fontWeight: 'bold',
    color: Theme.colors.text,
  },
});
