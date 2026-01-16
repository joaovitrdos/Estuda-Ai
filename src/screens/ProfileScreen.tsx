import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native'
import { Theme } from '../styles/themes/themes'
import { BackButton } from '../components/Backbutton'
import { AuthContext } from '../contexts/AuthContexts'
import { Feather } from '@expo/vector-icons'
import { Button } from '../components/Button'
import { ButtonCancel } from '../components/ButtonCancel'
import { useAlert } from '../hooks/useAlertModal'

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
]

export default function ProfileScreen({ navigation }: any) {
  const { showAlert } = useAlert()
  const { user, avatarId, updateAvatar, signOut } = useContext(AuthContext)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState(avatarId)
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    try {
      await updateAvatar(selectedAvatar)
      showAlert('Sucesso', 'Avatar atualizado com sucesso')
      setModalVisible(false)
    } catch {
      showAlert('Erro', 'Não foi possível atualizar o avatar.')
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
      showAlert('Até logo 👋', 'Você saiu da sua conta')
    } catch {
      showAlert('Erro', 'Não foi possível sair da conta.')
    }
  }

  const handleResetPassword = () => {
    navigation.navigate('resetpassword')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton showTitle 
                titleText="Perfil"
                showBackButton={true}/>
      </View>

      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <Image source={avatars[avatarId]} style={styles.avatar} />
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setModalVisible(true)}
          >
            <Feather name="edit" size={18} color="#000" />
          </TouchableOpacity>
        </View>

        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Escolha seu personagem</Text>
              <View style={styles.avatarList}>
                {avatars.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedAvatar(index)}
                    style={[
                      styles.avatarOption,
                      selectedAvatar === index && styles.selected,
                    ]}
                  >
                    <Image source={item} style={styles.avatarOptionImage} />
                  </TouchableOpacity>
                ))}
              </View>

              <Button onPress={handleConfirm} title="Confirmar" disabled={loading} />
              <ButtonCancel
                onPress={() => setModalVisible(false)}
                textColor={Theme.colors.red}
                borderColor={Theme.colors.red}
                label="Cancelar"
              />
            </View>
          </View>
        </Modal>

        <Button 
        onPress={handleResetPassword} 
        title="Redefinir Senha" 
        disabled={loading} 
        style={{width: '100%'}}
        />
        <ButtonCancel
          onPress={handleLogout}
          textColor={Theme.colors.red}
          borderColor={Theme.colors.red}
          label="Logout"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    padding: 15,
  },
  header: {
    
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 30,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: Theme.colors.blue,
  },
  name: {
    fontSize: Theme.fontSize.lg,
    fontWeight: 'bold',
    color: Theme.colors.primary,
  },
  email: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.text,
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
  },
  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 20,
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.background,
    borderWidth: 1,
    borderRadius: 20,
    padding: 6,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Theme.colors.background,
    padding: 20,
    borderRadius: 12,
    width: '90%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: 'bold',
    marginBottom: 16,
    color: Theme.colors.primary,
  },
  avatarList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  avatarOption: {
    padding: 4,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selected: {
    borderColor: Theme.colors.primary,
  },
  avatarOptionImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
})
