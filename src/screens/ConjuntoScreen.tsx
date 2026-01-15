import React, { useContext, useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Theme } from '../styles/themes/themes'
import { BackButton } from '../components/Backbutton'
import { AuthContext } from '../contexts/AuthContexts'
import { useRoute, useNavigation } from '@react-navigation/native'

interface Conjunto {
  id: number
  questoes: any[]
}

export default function ConjuntoScreen() {
  const route = useRoute<any>()
  const navigation = useNavigation<any>()
  const temaId = route.params?.temaId

  const { listaConjuntos, setTemaAtual } = useContext(AuthContext)
  const [conjuntos, setConjuntos] = useState<Conjunto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!temaId) {
      setLoading(false)
      return
    }
    setTemaAtual(temaId)

    async function carregarConjuntos() {
      try {
        console.log('🚀 Buscando conjuntos para temaId:', temaId)
        const data = await listaConjuntos(temaId)
        setConjuntos(data)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }

    carregarConjuntos()
  }, [temaId])

  return (
    <View style={styles.container}>
      <BackButton showTitle titleText="Conjuntos" />

      {loading && (
        <ActivityIndicator
          size="large"
          color={Theme.colors.primary}
          style={{ marginTop: 30 }}
        />
      )}

      {!loading && conjuntos.length === 0 && (
        <Text style={styles.infoText}>
          Nenhum conjunto encontrado
        </Text>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        {conjuntos.map((conjunto, index) => (
          <TouchableOpacity
            key={conjunto.id}
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => {
              navigation.navigate('Questions', {
                conjuntoId: conjunto.id,
                questoes: conjunto.questoes, 
              })
            }}
          >
            <View style={styles.icon}>
              <Feather name="layers" size={22} color="#fff" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>
                Conjunto {index + 1}
              </Text>
              <Text style={styles.cardSubtitle}>
              </Text>
            </View>

            <Feather name="chevron-right" size={22} color="#fff" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    padding: 15,
  },
  infoText: {
    textAlign: 'center',
    marginTop: 30,
    color: Theme.colors.text,
    fontSize: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.blue,
    padding: 18,
    borderRadius: 18,
    marginBottom: 14,
    elevation: 4,
  },
  icon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#f1f1f1',
    marginTop: 2,
  },
})
