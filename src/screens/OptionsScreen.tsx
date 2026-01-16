import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Theme } from '../styles/themes/themes';
import { BackButton } from '../components/Backbutton';

export default function OptionsScreen({ navigation }: any) {

    return (
        <View style={styles.container}>
            <BackButton
                showTitle={true}
                titleText="Opções"
                showBackButton={false}
            />
            <View style={styles.optionsContainer}>
                <View style={styles.option}>
                    <TouchableOpacity onPress={() => navigation.navigate('profile')}>
                        <Text style={styles.optionText}>Perfil</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.option}>
                    <TouchableOpacity>
                        <Text style={styles.optionText}>Configurações</Text>

                    </TouchableOpacity>
                </View>
                <View style={styles.option}>
                    <TouchableOpacity onPress={() => navigation.navigate('sobre')}>
                        <Text style={styles.optionText}>Sobre</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    optionsContainer: {
        flex: 1,
        marginTop: -20,
        padding: 10,
        gap: 10,
    },
    option: {
        paddingVertical: 15,
        paddingHorizontal: 0,
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.border,
    },
    optionText: {
        fontSize: Theme.fontSize.md,
        color: Theme.colors.primary,
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
