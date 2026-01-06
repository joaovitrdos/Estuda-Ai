import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Theme } from '../styles/themes/themes';
import { BackButton } from '../components/Backbutton';

export default function SobreScreen() {

    const openUrl = async (url: string) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            alert('Não foi possível abrir o link');
        }
    };

    return (
        <View style={styles.container}>
            <BackButton
                showTitle={true}
                titleText="Sobre"
                showBackButton={true}
            />
            <ScrollView contentContainerStyle={styles.content}>
            </ScrollView>
            <View style={styles.linksContainer}>
                <TouchableOpacity onPress={() => openUrl('https://seusite.com/termos')}>
                    <Text style={styles.linkText}>Termos de Serviço</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => openUrl('https://seusite.com/politica-de-privacidade')}>
                    <Text style={styles.linkText}>Política de Privacidade</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: Theme.colors.background,
    },
    content: {
        paddingTop: 100,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Theme.colors.primary,
        marginTop: 20,
        marginBottom: 8,
    },
    text: {
        fontSize: 15,
        color: Theme.colors.text,
        lineHeight: 22,
    },
    linksContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        flexDirection: 'row',
        gap: 10,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    linkText: {
        fontSize: Theme.fontSize.xs,
        color: Theme.colors.primary,
        borderBottomColor: Theme.colors.primary,
        borderBottomWidth: 1,
        textAlign: 'center',
    },
});
