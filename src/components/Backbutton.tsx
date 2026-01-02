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
      {/* Botão de voltar opcional */}
      
      {showBackButton && (
        <View style={{ width: 60}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          <Image
            source={require('../styles/icons/left.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        </View>
      )}

      {/* Título centralizado */}
      {showTitle && <Text style={styles.title}>{titleText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    paddingHorizontal: 15, // padding lateral
    height: 50,
    justifyContent: 'center', // centraliza verticalmente
  },

  button: {
    position: 'absolute',
    top: 0,  // ajusta verticalmente dentro da altura do container
  },
  image: {
    width: 30,
    height: 30,
  },
  title: {
    textAlign: 'center', // centraliza horizontalmente
    fontSize: Theme.fontSize.lg,
    fontWeight: 'bold',
    color: Theme.colors.text,
  },
});
