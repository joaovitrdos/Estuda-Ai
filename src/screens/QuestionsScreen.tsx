import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { Theme } from '../styles/themes/themes'
import { BackButton } from '../components/Backbutton'
import { useRoute } from '@react-navigation/native'

/* ===== Tipos ===== */
type RawQuestao = {
  questao: string
  alternativa1: string
  alternativa2: string
  alternativa3: string
  alternativa4: string
}

type Question = {
  question: string
  options: string[]
  correctIndex: number
}

export default function QuestionsScreen() {
  const route = useRoute<any>()

  const rawQuestoes: RawQuestao[] = route.params?.questoes ?? []
  const conjuntoId = route.params?.conjuntoId

  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    if (rawQuestoes.length > 0) {
      const formatted = rawQuestoes.map(q => ({
        question: q.questao,
        options: [
          q.alternativa1,
          q.alternativa2,
          q.alternativa3,
          q.alternativa4,
        ],
        correctIndex: -1,
      }))

      setQuestions(formatted)
      
    }
  }, [])

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <BackButton showTitle titleText="Questões" />
        <Text style={styles.infoText}>
          Nenhuma questão encontrada
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <BackButton showTitle titleText={`Conjunto ${conjuntoId}`} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {questions.map((q, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.question}>
              {index + 1}. {q.question}
            </Text>

            {q.options.map((opt, i) => (
              <TouchableOpacity key={i} style={styles.option}>
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

/* ===== Styles ===== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    padding: 15,
  },
  infoText: {
    textAlign: 'center',
    marginTop: 40,
    color: Theme.colors.text,
    fontSize: 16,
  },
  card: {
    backgroundColor: Theme.colors.card,
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: Theme.colors.text,
  },
  option: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: Theme.colors.blue,
    marginBottom: 10,
  },
  optionText: {
    color: '#fff',
    fontSize: 15,
  },
})
