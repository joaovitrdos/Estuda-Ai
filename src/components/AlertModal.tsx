import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Theme } from '../styles/themes/themes';

interface Props {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export function AlertModal({ visible, title, message, onClose }: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  box: {
    width: '85%',
    backgroundColor: Theme.colors.background,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    boxShadow: "0px 2px 4px rgba(0,0,0,0.25)",
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Theme.colors.primary,
    marginBottom: 8,
    textAlign: 'center',
  },

  message: {
    fontSize: 15,
    color: Theme.colors.text,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },

  button: {
    backgroundColor: Theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },

  buttonText: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
