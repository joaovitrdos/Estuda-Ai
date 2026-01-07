import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Button } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { Theme } from '../styles/themes/themes';
import Mensagem from '../components/Mensagem';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { AuthContext } from '../contexts/AuthContexts';

interface ThemeItem {
  id: number;
  title: string;
  color: string;
  status: 'pendente' | 'concluido';
}

export default function HomeScreen() {
  // const { listarTemas } = useContext(AuthContext);
  const [themes, setThemes] = useState<ThemeItem[]>([]);

  // useEffect(() => {
  //   async function carregarTemas() {
  //     try {
  //       const data = await listarTemas();
  //       setThemes(data);
  //     } catch (error) {
  //       console.error('Erro ao listar temas:', error);
  //     }
  //   }

  //   carregarTemas();
  // }, []);

  return (
    <View style={styles.container}>
      <Mensagem />

      <View style={{ padding: 15 }}>
        <Text style={styles.title}>Escolha um tema</Text>
        <Text style={styles.subtitle}>Vamos aprender hoje 🚀</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 15, paddingBottom: 30 }}
      >
        {themes.map(theme => (
          <TouchableOpacity
            key={theme.id}
            activeOpacity={0.8}
            style={[styles.card, { backgroundColor: theme.color }]}
          >
            <View style={styles.iconContainer}>
              <Feather name="book-open" size={26} color="#fff" />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{theme.title}</Text>
              <Text style={styles.cardSubtitle}>
                {theme.status === 'concluido'
                  ? 'Tema concluído'
                  : 'Tema pendente'}
              </Text>
            </View>

            {theme.status === 'concluido' ? (
              <FontAwesome5 name="check-circle" size={22} color="#A8E6A3" />
            ) : (
              <FontAwesome5 name="clock" size={22} color="#FFE082" />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    padding: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Theme.colors.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Theme.colors.text,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 20,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#f2f2f2',
    marginTop: 2,
  },
});
