import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { Theme } from '../../styles/themes/themes';
import { AuthContext } from '../../contexts/AuthContexts';
import { Input } from '../../components/input';
import { Button } from '../../components/Button';
import { Divider } from '../../components/Divider';

export default function LoginScreen({ navigation }: any) {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const { signIn } = useContext(AuthContext);

    async function handleLogin() {
        try {
            await signIn(email, senha);
            navigation.navigate('homescreen');
        } catch (e: any) {
            Alert.alert('Erro', e.message);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../../../assets/favicon.png')}
                    style={{ width: 100, height: 100, marginBottom: 16 }}
                />
                <Text style={styles.title}>
                    Entrar ou Cadastrar
                </Text>

                <Text style={styles.subtitle}>
                    Você Terá respostas mais rápidas e precisas e muito inteligentes.
                </Text>
            </View>
            <Input
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />

            <Input
                placeholder="Senha"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
            />

            <Button
                title={loading ? 'Carregando...' : 'Entrar'}
                onPress={handleLogin}
            />

            <Divider />

            <Button
                title="Entrar com Google"
                onPress={() => {}}
                icon={require('./../../styles/icons/google.png')}
            />

            <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                <Text style={styles.link}>
                    Criar conta
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        justifyContent: 'center',
        backgroundColor: Theme.colors.background,
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
        justifyContent: 'center',
        textAlign: 'center',
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
});
