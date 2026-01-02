import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '../styles/themes/themes';
import Mensagem from '../components/Mensagem';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Mensagem />
      <View style={styles.header}>
        <Text style={styles.title}>Acompanhe abaixo seus temas de estudo e continue evoluindo</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 15,
    backgroundColor: Theme.colors.background,
  },
  header: {  
    marginTop: 10,
  },
  title: {
    fontSize: Theme.fontSize.lg,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Theme.colors.primary,
  },
});
