import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useContext, useState } from 'react';
import { Theme } from '../../styles/themes/themes';
import { Input } from '../../components/input';
import { Button } from '../../components/Button';
import { Divider } from '../../components/Divider';
import { BackButton } from '../../components/Backbutton';
import { AuthContext } from '../../contexts/AuthContexts';
import { useAlert } from '../../hooks/useAlertModal';

export default function RegisterScreen({ navigation }: any) {

    const { showAlert } = useAlert();
    const { signUp } = useContext(AuthContext);
    
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleRegister() {
        try {
            setLoading(true);

            if (!nome || !email || !senha) {
                showAlert('Atenção', 'Preencha todos os campos');
                return;
            }

            await signUp(nome, email, senha);

            showAlert('Sucesso', 'Conta criada com sucesso 🎉');
            navigation.navigate('loginscreen');

        } catch (e: any) {
            showAlert('Erro', e.message || 'Erro ao criar conta');
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.safe}>
            <BackButton showTitle titleText="Cadastrar" showBackButton />

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
                            source={require('../../../assets/favicon.png')}
                            style={styles.logo}
                        />

                        <Text style={styles.title}>Cadastrar</Text>

                        <Text style={styles.subtitle}>
                            Você terá respostas mais rápidas e precisas e muito inteligentes.
                        </Text>
                    </View>

                    <Input
                        placeholder="Nome"
                        value={nome}
                        onChangeText={setNome}
                    />

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
                        title={loading ? 'Carregando...' : 'Cadastrar'}
                        onPress={handleRegister}
                    />

                    <Divider />

                    <Button
                        title="Cadastrar-se com o Google"
                        onPress={() => { }}
                        icon={require('./../../styles/icons/google.png')}
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
});
