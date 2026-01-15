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
import { useAlert } from '../../hooks/useAlertModal';
import { AuthContext } from '../../contexts/AuthContexts';

const loginSchema = z.object({
    email: z.string().email('Email inválido').nonempty('Email é obrigatório'),
    senha: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres').nonempty('Senha é obrigatória'),

});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen({ navigation }: any) {
    const { signIn } = React.useContext(AuthContext);
    const { showAlert } = useAlert();

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', senha: '' },
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            await signIn(data.email, data.senha);
            navigation.navigate('tabscreen');
        } catch (error: any) {
            showAlert('Erro', error.message || 'Falha ao realizar login');
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: Theme.colors.background }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.header}>
                        <Image
                            source={require('../../styles/icons/logo_sub.png')}
                            style={{ width: 100, height: 100, marginBottom: 16 }}
                        />
                        <Text style={styles.title}>Entrar ou Cadastrar</Text>
                        <Text style={styles.subtitle}>
                            Você terá respostas mais rápidas e precisas e muito inteligentes.
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

                    <Controller
                        control={control}
                        name="senha"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                placeholder="Senha"
                                secureTextEntry
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                disabled={isSubmitting}
                                showSoftInputOnFocus={!isSubmitting}
                            />
                        )}
                    />
                    {errors.senha && <Text style={styles.error}>{errors.senha.message}</Text>}

                    <Button
                        title={isSubmitting ? 'Carregando...' : 'Entrar'}
                        onPress={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                    />

                    <Divider />

                    <Button
                        title="Entrar com Google"
                        onPress={() => { }}
                        icon={require('../../styles/icons/google.png')}
                    />

                    <Text
                        style={styles.link}
                        onPress={() => navigation.navigate('registerscreen')}
                    >
                        Criar conta
                    </Text>

                    <Text
                        style={styles.link}
                        onPress={() => navigation.navigate('sendemail')}
                    >
                        Esqueceu a senha? Clique aqui!
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 15,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: Theme.fontSize.gxl,
        fontWeight: 'bold' as const,
        marginBottom: 6,
        color: Theme.colors.primary,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 24,
        color: Theme.colors.text,
        textAlign: 'center',
    },
    link: {
        textAlign: 'center',
        marginTop: 16,
        fontWeight: 'bold',
        color: Theme.colors.primary,
    },
    error: {
        color: 'red',
        marginBottom: 10,
        marginLeft: 5,
    },
});
