import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useState } from 'react';
import { Theme } from '../styles/themes/themes';
import { BackButton } from '../components/Backbutton';
import { Button } from '../components/Button';

type Question = {
  question: string;
  options: string[];
  correctIndex: number;
};

const questions: Question[] = [
  {
    question: 'O que é React Native?',
    options: [
      'Uma linguagem de programação',
      'Um framework para apps mobile',
      'Um banco de dados',
      'Um sistema operacional',
    ],
    correctIndex: 1,
  },
  {
    question: 'Qual linguagem o React Native usa?',
    options: ['Java', 'Kotlin', 'JavaScript', 'Swift'],
    correctIndex: 2,
  },
  {
    question: 'Quem mantém o React Native?',
    options: ['Google', 'Apple', 'Microsoft', 'Meta'],
    correctIndex: 3,
  },
  {
    question: 'Qual componente cria uma área clicável?',
    options: [
      'Button',
      'TouchableOpacity',
      'Pressable',
      'Todas as alternativas',
    ],
    correctIndex: 3,
  },
  {
    question: 'Qual hook é usado para estados?',
    options: ['useEffect', 'useContext', 'useState', 'useMemo'],
    correctIndex: 2,
  },
];

export function QuestionsScreen() {
  const [mode, setMode] = useState<'normal' | 'retry'>('normal');
  const [normalIndex, setNormalIndex] = useState(0);
  const [retryQueue, setRetryQueue] = useState<Question[]>([]);
  const [retryIndex, setRetryIndex] = useState(0);

  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showRetryIntro, setShowRetryIntro] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const currentQuestion =
    mode === 'normal'
      ? questions[normalIndex]
      : retryQueue[retryIndex];

  const isCorrect = selected === currentQuestion.correctIndex;
  const progress = correctCount / questions.length;

  function validateAnswer() {
    if (selected === null) return;

    setChecked(true);
    setShowModal(true);

    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    } else {
      setRetryQueue(prev => [...prev, currentQuestion]);
    }
  }

  function goNext() {
    setShowModal(false);
    setChecked(false);
    setSelected(null);

    if (mode === 'normal') {
      if (normalIndex < questions.length - 1) {
        setNormalIndex(prev => prev + 1);
        return;
      }

      if (retryQueue.length > 0 || !isCorrect) {
        setShowRetryIntro(true);
        return;
      }
    }

    if (mode === 'retry') {
      if (isCorrect) {
        const updated = [...retryQueue];
        updated.splice(retryIndex, 1);
        setRetryQueue(updated);
        setRetryIndex(0);
      } else {
        setRetryIndex(prev =>
          prev < retryQueue.length - 1 ? prev + 1 : 0
        );
      }
    }
  }

  function startRetry() {
    setShowRetryIntro(false);
    setMode('retry');
    setRetryIndex(0);
  }

  function optionStyle(index: number) {
    if (!checked) {
      return selected === index
        ? styles.optionSelected
        : styles.option;
    }

    if (index === currentQuestion.correctIndex) {
      return styles.correct;
    }

    if (index === selected && !isCorrect) {
      return styles.wrong;
    }

    return styles.option;
  }

  return (
    <View style={styles.container}>
      <BackButton titleText="Questões" showBackButton />
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              { width: `${progress * 100}%` },
            ]}
          />
        </View>
      </View>
      <Text style={styles.question}>{currentQuestion.question}</Text>
      {currentQuestion.options.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={optionStyle(index)}
          onPress={() => !checked && setSelected(index)}
        >
          <Text style={styles.optionText}>{item}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.bottomButton}>
        <Button
          onPress={validateAnswer}
          title="Próximo"
          disabled={selected === null}
          style={{ width: '100%' }}
        />
      </View>

      <Modal transparent animationType="slide" visible={showModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text
              style={[
                styles.modalCorrectWrongTitle,
                isCorrect ? styles.correctText : styles.wrongText,
              ]}
            >
              {isCorrect ? 'Parabens! você acertou!' : 'Ops! você errou.'}
            </Text>

            <Button
              onPress={goNext}
              title="Continuar"
              style={{ width: '100%' }}
            />
          </View>
        </View>
      </Modal>

      <Modal transparent animationType="fade" visible={showRetryIntro}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Você errou algumas questões.
            </Text>

            <Text style={styles.modalSubtitle}>
              Vamos melhorar !.
            </Text>

            <Button
              onPress={startRetry}
              title="Continuar"
              style={{ width: '100%' }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    padding: 20,
  },
  progressContainer: {
    marginBottom: 24
  },
  progressBackground: {
    height: 10,
    backgroundColor: Theme.colors.border,
    borderRadius: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Theme.colors.green,
    borderRadius: 10,
  },
  question: {
    color: Theme.colors.primary,
    fontSize: Theme.fontSize.xl,
    marginBottom: 30,
    textAlign: 'center',
  },
  option: {
    backgroundColor: Theme.colors.card,
    padding: 15,
    borderRadius: 16,
    marginBottom: 14,
  },
  optionSelected: {
    backgroundColor: Theme.colors.border,
    padding: 15,
    borderRadius: 16,
    marginBottom: 14,
  },
  correct: {
    backgroundColor: Theme.colors.green,
    padding: 15,
    borderRadius: 16,
    marginBottom: 14,
  },
  wrong: {
    backgroundColor: Theme.colors.red,
    padding: 15,
    borderRadius: 16,
    marginBottom: 14,
  },
  optionText: {
    color: Theme.colors.primary,
    textAlign: 'center',
    fontSize: Theme.fontSize.md,
  },
  nextButton: {
    width: '100%',
    backgroundColor: Theme.colors.primary,
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  disabled: {
    opacity: 0.5
  },
  nextText: {
    color: Theme.colors.background,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Theme.colors.card,
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: Theme.fontSize.md,
    marginBottom: 20,
    fontWeight: '700',
    color: Theme.colors.primary,
  },
  modalSubtitle: {
    color: Theme.colors.primary,
  },
  modalCorrectWrongTitle:{
    fontSize: Theme.fontSize.md,
    marginBottom: 20,
    color: Theme.colors.primary,
  },
  correctText: {
    color: Theme.colors.green
  },
  wrongText: {
    color: Theme.colors.red
  },
});
