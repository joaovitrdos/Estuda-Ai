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

type Questao = {
  questao: string
  alternativa1: string
  alternativa2: string
  alternativa3: string
  alternativa4: string
}

interface Conjunto {
  id: number
  questoes: Questao[]
  conclusao: number
}

export default function ConjuntoScreen() {
  const route = useRoute<any>()
  const navigation = useNavigation<any>()
  const temaId: number | undefined = route.params?.temaId
  const { listaConjuntos, setTemaAtual } = useContext(AuthContext)

  const [conjuntos, setConjuntos] = useState<Conjunto[]>([])
  const [loading, setLoading] = useState(true)

  const getStatus = (conjunto: Conjunto) => ({
    text: conjunto.conclusao === 0 ? 'Conjunto Pendente' : 'Concluído',
  })

  useEffect(() => {
    if (!temaId) {
      setLoading(false)
      return
    }

    setTemaAtual(temaId)

    async function carregarConjuntos() {
      try {
        setLoading(true)
        const data = await listaConjuntos(temaId!)
        const conjuntosFormatados = data.map((conjunto: any) => ({
          ...conjunto,
          conclusao: conjunto.conclusao ?? 0,
        }))
        setConjuntos(conjuntosFormatados)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    carregarConjuntos()
  }, [temaId])

  const canAccess = (index: number) => {
    if (index === 0) return true
    return conjuntos[index - 1]?.conclusao === 1
  }

  const handlePressConjunto = (conjunto: Conjunto, index: number) => {
    if (!canAccess(index)) return
    navigation.navigate('questions', {
      conjuntoId: conjunto.id,
      questoes: conjunto.questoes,
    })
  }

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
        <Text style={styles.infoText}>Nenhum conjunto encontrado</Text>
      )}

      {!loading && (
        <ScrollView showsVerticalScrollIndicator={false}>
          {conjuntos.map((conjunto, index) => {
            const status = getStatus(conjunto)
            const disabled = !canAccess(index)
            return (
              <TouchableOpacity
                key={conjunto.id}
                style={[
                  styles.card,
                  disabled && { backgroundColor: Theme.colors.border },
                ]}
                activeOpacity={disabled ? 1 : 0.85}
                onPress={() => handlePressConjunto(conjunto, index)}
              >
                <View style={styles.icon}>
                  <Feather name="layers" size={22} color="#fff" />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>Conjunto {index + 1}</Text>
                  <Text style={{ ...styles.cardSubtitle}}>
                    {status.text}
                  </Text>
                </View>

                <Feather name="chevron-right" size={22} color="#fff" />
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      )}
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
    marginTop: 2,
    color: '#f1f1f1',
  },
})
