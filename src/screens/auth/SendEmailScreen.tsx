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
import { Divider } from '../../components/Divider';
import { BackButton } from '../../components/Backbutton';
import { AuthContext } from '../../contexts/AuthContexts';
import { useAlert } from '../../hooks/useAlertModal';

const emailSchema = z.object({
  email: z.string().email('Email inválido').nonempty('Email é obrigatório'),
});

type EmailFormData = z.infer<typeof emailSchema>;

export default function SendEmailScreen({ navigation }: any) {
  const { sendResetEmail } = React.useContext(AuthContext);
  const { showAlert } = useAlert();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: EmailFormData) => {
    try {
      await sendResetEmail(data.email);
      showAlert(
        'Sucesso',
        'Se este email estiver cadastrado, você receberá um link para redefinir a senha.'
      );
      navigation.navigate('emailSentScreen'); // opcional, tela de confirmação
    } catch (error: any) {
      showAlert('Erro', error.message || 'Falha ao enviar email');
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
            <Text style={styles.title}>Redefinir Senha</Text>
            <Text style={styles.subtitle}>
              Informe seu email para receber o link de redefinição.
            </Text>
          </View>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Email"
                keyboardType="email-address"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                disabled={isSubmitting}
                showSoftInputOnFocus={!isSubmitting}
              />
            )}
          />
          {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

          <Button
            title={isSubmitting ? 'Enviando...' : 'Enviar Email'}
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
