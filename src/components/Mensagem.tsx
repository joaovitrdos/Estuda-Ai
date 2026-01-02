import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { Theme } from '../styles/themes/themes';
import { Input } from './input';
import { ButtonCancel } from './ButtonCancel';
import { AuthContext } from '../contexts/AuthContexts';

// lista de avatares
const avatars = [
  require('../styles/avatar/1.jpg'),
  require('../styles/avatar/2.jpg'),
  require('../styles/avatar/3.jpg'),
  require('../styles/avatar/4.jpg'),
  require('../styles/avatar/5.jpg'),
  require('../styles/avatar/6.jpg'),
  require('../styles/avatar/7.jpg'),
  require('../styles/avatar/8.jpg'),
  require('../styles/avatar/9.jpg'),
  require('../styles/avatar/10.jpg'),
  require('../styles/avatar/11.jpg'),
  require('../styles/avatar/12.jpg'),
];

export default function Mensagem() {
  const { user, avatarIndex } = useContext(AuthContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [tema, setTema] = useState('');

  const handleGenerate = () => {
    console.log('Tema adicionado:', tema);
    setTema('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.userInfo}>
          <Image
            source={avatars[avatarIndex]} 
            style={styles.avatar}
          />
          <View style={styles.userDetails}>
            <Text style={styles.welcome}>Bem-vindo,</Text>
            <Text style={styles.userName}>{user?.name || 'Usuário'}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Image
            source={require('../styles/icons/plus.png')}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar o Tema</Text>

            <Input
              placeholder="O que você quer estudar?"
              value={tema}
              onChangeText={setTema}
              multiline
              numberOfLines={3}
            />

            <ButtonCancel
              onPress={handleGenerate}
              textColor={Theme.colors.text}
              borderColor={Theme.colors.border}
              label="Adicionar aos Estudos"
            />

            <ButtonCancel
              onPress={() => setModalVisible(false)}
              textColor={Theme.colors.red}
              borderColor={Theme.colors.red}
              label="Cancelar"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    paddingHorizontal: 15,
    borderBottomColor: Theme.colors.border,
    borderBottomWidth: 1,
    backgroundColor: Theme.colors.background,
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 22.5,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Theme.colors.primary,
  },
  welcome: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.text,
  },
  userName: {
    fontSize: Theme.fontSize.md,
    fontWeight: 'bold',
    color: Theme.colors.primary,
  },
  userDetails: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.primary,
    padding: 10,
    borderRadius: 15,
  },
  icon: {
    width: 16,
    height: 16,
  },
  buttonText: {
    color: Theme.colors.background,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: Theme.colors.background,
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Theme.colors.primary,
    textAlign: 'center',
    padding: 15,
  },
});
