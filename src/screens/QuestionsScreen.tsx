import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import { Theme } from "../styles/themes/themes";
import { BackButton } from "../components/Backbutton";
import { Button } from "../components/Button";
import { VideoView, useVideoPlayer } from "expo-video";
import { useRoute, useNavigation } from "@react-navigation/native";

type RawQuestion = {
  questao: string;
  alternativa1: string;
  alternativa2: string;
  alternativa3: string;
  alternativa4: string;
};

type Question = {
  question: string;
  options: string[];
  correctIndex: number;
};

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function QuestionsScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const rawQuestions: RawQuestion[] = route.params?.questoes ?? [];

  const [questions, setQuestions] = useState<Question[]>([]);
  const [mode, setMode] = useState<"normal" | "retry">("normal");
  const [normalIndex, setNormalIndex] = useState(0);
  const [retryQueue, setRetryQueue] = useState<Question[]>([]);
  const [retryIndex, setRetryIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showRetryIntro, setShowRetryIntro] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showFinalModal, setShowFinalModal] = useState(false);

  useEffect(() => {
    const formatted = rawQuestions.map((q) => {
      const opts = [
        q.alternativa1,
        q.alternativa2,
        q.alternativa3,
        q.alternativa4,
      ];
      const shuffled = shuffleArray(opts);
      return {
        question: q.questao,
        options: shuffled,
        correctIndex: shuffled.indexOf(q.alternativa1),
      };
    });
    setQuestions(formatted);
  }, [rawQuestions]);

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <BackButton titleText="Questões" showBackButton />
        <Text style={styles.question}>Nenhuma questão encontrada</Text>
      </View>
    );
  }

  function finishPractice() {
    setShowFinalModal(false);
    navigation.navigate("conjunto");
  }

  const currentQuestion =
    mode === "normal" ? questions[normalIndex] : retryQueue[retryIndex];
  const isCorrect = selected === currentQuestion.correctIndex;
  const progress = correctCount / questions.length;

  function validateAnswer() {
    if (selected === null) return;
    setChecked(true);
    setShowModal(true);

    if (isCorrect) setCorrectCount((prev) => prev + 1);
    else if (mode === "normal")
      setRetryQueue((prev) => [...prev, currentQuestion]);
  }

  function goNext() {
    setShowModal(false);
    setChecked(false);
    setSelected(null);

    if (mode === "normal") {
      if (normalIndex < questions.length - 1) {
        setNormalIndex((prev) => prev + 1);
        return;
      }
      if (retryQueue.length > 0) {
        setShowRetryIntro(true);
        return;
      }
      setShowFinalModal(true);
      return;
    }

    if (mode === "retry") {
      const updatedQueue = [...retryQueue];

      if (isCorrect) {
        updatedQueue.splice(retryIndex, 1);
      }

      if (updatedQueue.length === 0) {
        setRetryQueue([]);
        setShowFinalModal(true);
        return;
      }

      setRetryQueue(updatedQueue);

      if (isCorrect) {
        setRetryIndex((prev) => (prev >= updatedQueue.length ? 0 : prev));
      } else {

        setRetryIndex((prev) =>
          prev + 1 >= updatedQueue.length ? 0 : prev + 1
        );
      }
    }

  }

  function startRetry() {
    setShowRetryIntro(false);
    setMode("retry");
    setRetryIndex(0);
  }

  const player = useVideoPlayer(require("../styles/video/done.mp4"), (player) => {
    player.loop = true;
    player.play();
  });

  function optionStyle(index: number) {
    if (!checked)
      return selected === index ? styles.optionSelected : styles.option;
    if (index === currentQuestion.correctIndex) return styles.correct;
    if (index === selected && !isCorrect) return styles.wrong;
    return styles.option;
  }

  return (
    <View style={styles.container}>
      <BackButton titleText="Questões" showBackButton />

      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View
            style={[styles.progressFill, { width: `${progress * 100}%` }]}
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
        />
      </View>

      <Modal transparent animationType="slide" visible={showModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text
              style={[
                styles.modalCorrectWrongTitle,

              ]}
            >
              {isCorrect ? "Parabéns! Você acertou!" : "Ops! Você errou."}
            </Text>
            <Button onPress={goNext} title="Continuar" />
          </View>
        </View>
      </Modal>

      <Modal transparent animationType="slide" visible={showRetryIntro}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Você errou algumas questões.</Text>
            <Text style={styles.modalSubtitle}>Vamos melhorar!</Text>
            <Button onPress={startRetry} title="Continuar" />
          </View>
        </View>
      </Modal>

      <Modal transparent animationType="slide" visible={showFinalModal}>
        <View style={styles.modalOverlayFinal}>
          <View style={styles.modalContentFinal}>
            <View style={styles.videoPlaceholder}>
              <VideoView
                player={player}
                style={styles.video}
              />
            </View>
            <Text style={styles.finalTitle}>Prática Concluída!</Text>
            <View style={styles.finalMessageContainer}>
              <Text style={styles.finalMessage}>
                {Math.round((correctCount / questions.length) * 100) <= 60
                  ? "MELHORAR"
                  : Math.round((correctCount / questions.length) * 100) <= 80
                    ? "MUITO BOM"
                    : "INCRÍVEL"}
              </Text>
              <View style={styles.finalPercentageContainer}>
                <Image
                  source={require("../styles/icons/porce.png")}
                  style={{ width: 22, height: 22 }}
                />
                <Text style={styles.finalPercentage}>
                  {Math.round((correctCount / questions.length) * 100)}%
                </Text>
              </View>
            </View>
            <View style={styles.finalButtonContainer}>
              <Button
                onPress={finishPractice}
                title="Continuar"
              />
            </View>
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
    padding: 20
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
    height: "100%",
    backgroundColor: Theme.colors.green,
    borderRadius: 10,
  },
  question: {
    color: Theme.colors.primary,
    fontSize: Theme.fontSize.xl,
    marginBottom: 30,
    textAlign: "center",
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
    textAlign: "center",
    padding: 15,
    borderRadius: 16,
    marginBottom: 14,
  },
  wrong: {
    textAlign: "center",
    padding: 15,
    borderRadius: 16,
    marginBottom: 14,
  },
  optionText: {
    color: Theme.colors.primary,
    textAlign: "center",
    fontSize: Theme.fontSize.md,
  },
  bottomButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    textAlign: "center"
  },
  modalContent: {
    backgroundColor: Theme.colors.card,
    padding: 15,
    textAlign: "center",
  },
  modalOverlayFinal: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContentFinal: {
    width: "100%",
    height: "100%",
    backgroundColor: Theme.colors.background,
    borderRadius: 24,
    alignItems: "center",
    padding: 15,
    position: "relative",
  },
  videoPlaceholder: {
    width: "100%",
    height: 450,
    borderWidth: 2,
    borderColor: Theme.colors.border,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  video: {
    width: "100%",
    height: "100%",
    borderRadius: 15
  },
  finalTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: Theme.colors.dourado,
    textAlign: "center",
    marginBottom: 20,
  },
  finalPercentage: {
    fontSize: Theme.fontSize.xl,
    fontWeight: "600",
    color: Theme.colors.green,
  },
  finalPercentageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: 10,
    padding: 15,
    backgroundColor: Theme.colors.background,
    borderRadius: 15,
  },
  finalButtonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    padding: 15,
  },
  finalMessage: {
    fontSize: Theme.fontSize.md,
    fontWeight: "600",
    textAlign: "center",
    color: Theme.colors.background,
    backgroundColor: Theme.colors.green,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    padding: 2,
  },
  finalMessageContainer: {
    borderWidth: 3,
    borderColor: Theme.colors.green,
    borderRadius: 15,
    width: 150,
    height: 95,
    backgroundColor: Theme.colors.green,
  },
  modalTitle: {
    fontSize: Theme.fontSize.md,
    marginBottom: 20,
    fontWeight: "700",
    textAlign: "center",
    color: Theme.colors.primary,
  },
  modalSubtitle: {
    color: Theme.colors.primary
  },
  modalCorrectWrongTitle: {
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "700",
    fontSize: Theme.fontSize.md,
    color: Theme.colors.primary,
  },
  correctText: {
    color: Theme.colors.green
  },
  wrongText: {
    color: Theme.colors.red
  },
});
