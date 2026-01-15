import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Theme } from '../../styles/themes/themes';
import { Input } from '../../components/input';
import { Button } from '../../components/Button';
import { BackButton } from '../../components/Backbutton';
import { AuthContext } from '../../contexts/AuthContexts';
import { useAlert } from '../../hooks/useAlertModal';

const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .nonempty('Senha atual é obrigatória'),
    newPassword: z
      .string()
      .min(8, 'A nova senha deve ter no mínimo 8 caracteres'),
    confirmNewPassword: z.string().nonempty('Confirme a nova senha'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "As senhas não coincidem",
    path: ["confirmNewPassword"],
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export default function ResetUserPasswordScreen({ navigation }: any) {
  const { changePassword } = React.useContext(AuthContext); // deve existir no AuthContext
  const { showAlert } = useAlert();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      await changePassword(data.currentPassword, data.newPassword);
      showAlert('Sucesso', 'Senha alterada com sucesso!');
      navigation.goBack();
    } catch (error: any) {
      showAlert('Erro', error.message || 'Falha ao alterar senha');
    }
  };

  return (
    <View style={styles.safe}>
      <BackButton showTitle={false} showBackButton />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={[styles.container, { flexGrow: 1 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Image
              source={require('../../styles/icons/logo_sub.png')}
              style={styles.logo}
            />
            <Text style={styles.title}>Alterar Senha</Text>
            <Text style={styles.subtitle}>
              Insira sua senha atual e escolha uma nova senha segura.
            </Text>
          </View>

          <Controller
            control={control}
            name="currentPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Senha Atual"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                disabled={isSubmitting}
                showSoftInputOnFocus={!isSubmitting}
              />
            )}
          />
          {errors.currentPassword && (
            <Text style={styles.error}>{errors.currentPassword.message}</Text>
          )}

          <Controller
            control={control}
            name="newPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Nova Senha"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                disabled={isSubmitting}
                showSoftInputOnFocus={!isSubmitting}
              />
            )}
          />
          {errors.newPassword && (
            <Text style={styles.error}>{errors.newPassword.message}</Text>
          )}

          <Controller
            control={control}
            name="confirmNewPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Confirmar Nova Senha"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                disabled={isSubmitting}
                showSoftInputOnFocus={!isSubmitting}
              />
            )}
          />
          {errors.confirmNewPassword && (
            <Text style={styles.error}>{errors.confirmNewPassword.message}</Text>
          )}

          <Button
            title={isSubmitting ? 'Alterando...' : 'Alterar Senha'}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: Theme.colors.background,
  },
  container: {
    padding: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  title: {
    fontSize: Theme.fontSize.gxl,
    fontWeight: 'bold',
    marginBottom: 6,
    color: Theme.colors.primary,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    color: Theme.colors.text,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 5,
  },
});
