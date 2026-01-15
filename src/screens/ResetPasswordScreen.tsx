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
import { Theme } from '../styles/themes/themes';
import { Input } from '../components/input';
import { Button } from '../components/Button';
import { BackButton } from '../components/Backbutton';
import { AuthContext } from '../contexts/AuthContexts';
import { useAlert } from '../hooks/useAlertModal';


const resetSchema = z
  .object({
    newPassword: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
    confirmNewPassword: z.string().nonempty('Confirme a senha'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmNewPassword'],
  });

type ResetFormData = z.infer<typeof resetSchema>;

export default function ResetPasswordScreen({ navigation, route }: any) {
  const { token } = route.params;
  const { resetPasswordWithToken } = React.useContext(AuthContext);
  const { showAlert } = useAlert();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
    defaultValues: { newPassword: '', confirmNewPassword: '' },
  });

  const onSubmit = async (data: ResetFormData) => {
    try {
      await resetPasswordWithToken(token, data.newPassword);
      showAlert('Sucesso', 'Senha redefinida com sucesso!');
      navigation.navigate('loginscreen');
    } catch (error: any) {
      showAlert('Erro', error.message || 'Falha ao redefinir senha');
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
              source={require('../styles/icons/logo_sub.png')}
              style={styles.logo}
            />
            <Text style={styles.title}>Nova Senha</Text>
            <Text style={styles.subtitle}>
              Insira a nova senha e confirme para redefinir sua senha.
            </Text>
          </View>

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
          {errors.newPassword && <Text style={styles.error}>{errors.newPassword.message}</Text>}

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
            title={isSubmitting ? 'Redefinindo...' : 'Redefinir Senha'}
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
