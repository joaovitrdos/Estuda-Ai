
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Theme } from '../styles/themes/themes';
import { Input } from './input';
import { ButtonCancel } from './ButtonCancel';
import { AuthContext } from '../contexts/AuthContexts';
import { useAlert } from '../hooks/useAlertModal';
import { Button } from './Button';
import { notifyIfBackground } from '../service/notificationsBackground';

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

const temaSchema = z.object({
  tema: z.string().nonempty('Informe um tema válido'),
});

type TemaForm = z.infer<typeof temaSchema>;

export default function Mensagem() {
  const { showAlert } = useAlert();
  const { user, avatarId, createTema } = useContext(AuthContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TemaForm>({
    resolver: zodResolver(temaSchema),
    defaultValues: { tema: '' },
  });

  const onSubmit = async (data: TemaForm) => {
    try {
      setLoading(true);
      const temaCriado = await createTema(data.tema);
      await notifyIfBackground(
        'Tema gerado!',
        'Suas questões já estão prontas.'
      );

      showAlert(
        'Sucesso',
        'Tema gerado com sucesso! Estamos preparando as questões...'
      );
      reset(); 
      setModalVisible(false);
    } catch (err: any) {
      showAlert('Erro', err.message || 'Não foi possível gerar o tema');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.userInfo}>
          <Image source={avatars[avatarId]} style={styles.avatar} />
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

            <Controller
              control={control}
              name="tema"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="O que você quer estudar?"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  multiline
                  numberOfLines={3}
                  disabled={loading || isSubmitting}
                  showSoftInputOnFocus={!loading && !isSubmitting}
                />
              )}
            />
            {errors.tema && (
              <Text style={styles.error}>{errors.tema.message}</Text>
            )}

            <Button
              onPress={handleSubmit(onSubmit)}
              title={loading || isSubmitting ? 'Adicionando...' : 'Adicionar aos Estudos'}
              disabled={loading || isSubmitting}
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
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 10,
    borderWidth: 3,
    borderColor: Theme.colors.blue,
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
  error: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 5,
  },
});
