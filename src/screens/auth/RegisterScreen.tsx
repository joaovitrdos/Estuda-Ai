import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import { useContext, useState } from 'react';
import { Theme } from '../../styles/themes/themes';
import { Input } from '../../components/input';
import { Button } from '../../components/Button';
import { Divider } from '../../components/Divider';
import { BackButton } from '../../components/Backbutton';
import { AuthContext } from '../../contexts/AuthContexts';

export default function RegisterScreen({ navigation }: any) {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const { signUp } = useContext(AuthContext);

    async function handleRegister() {
        try {
            await signUp(nome, email, senha);
            navigation.navigate('loginscreen');
        } catch (e: any) {
            Alert.alert('Erro', e.message);
        }
    }

    return (
        <View style={styles.container}>
          <BackButton 
            showTitle={false}
          />

            <View style={styles.header}>
                <Image
                    source={require('../../../assets/favicon.png')}
                    style={{ width: 100, height: 100, marginBottom: 16 }}
                />
                <Text style={styles.title}>
                    Cadastrar
                </Text>

                <Text style={styles.subtitle}>
                    Você Terá respostas mais rápidas e precisas e muito inteligentes.
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
                title={loading ? 'Carregando...' : 'Entrar'}
                onPress={handleRegister}
            />

            <Divider />

            <Button
                title="Cadastra-se com o Google"
                onPress={() => { }}
                icon={require('./../../styles/icons/google.png')}
            />
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
