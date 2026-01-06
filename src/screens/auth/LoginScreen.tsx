import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useContext, useState } from 'react';
import { Theme } from '../../styles/themes/themes';
import { AuthContext } from '../../contexts/AuthContexts';
import { Input } from '../../components/input';
import { Button } from '../../components/Button';
import { Divider } from '../../components/Divider';
import { useAlert } from '../../hooks/useAlertModal';

export default function LoginScreen({ navigation }: any) {

    const { signIn } = useContext(AuthContext);
    const { showAlert } = useAlert();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleLogin() {
        try {
            setLoading(true);
            await signIn(email, senha);
            navigation.navigate('homescreen');
        } catch (e: any) {
            showAlert('Erro', e.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: Theme.colors.background }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.header}>
                        <Image
                            source={require('../../../assets/favicon.png')}
                            style={{ width: 100, height: 100, marginBottom: 16 }}
                        />
                        <Text style={styles.title}>Entrar ou Cadastrar</Text>
                        <Text style={styles.subtitle}> Você terá respostas mais rápidas e precisas e muito inteligentes.</Text>
                    </View>

                    <Input
                        placeholder="Email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                        disabled={loading}
                        showSoftInputOnFocus={!loading}
                    />

                    <Input
                        placeholder="Senha"
                        secureTextEntry
                        value={senha}
                        onChangeText={setSenha}
                        disabled={loading}
                        showSoftInputOnFocus={!loading}
                    />

                    <Button
                        title={loading ? 'Carregando...' : 'Entrar'}
                        onPress={handleLogin}
                        disabled={loading}
                    />

                    <Divider />

                    <Button
                        title="Entrar com Google"
                        onPress={() => { }}
                        icon={require('./../../styles/icons/google.png')}
                    />

                    <TouchableOpacity
                        onPress={() => navigation.navigate('registerscreen')}
                    >
                        <Text style={styles.link}>Criar conta</Text>
                    </TouchableOpacity>
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
});
