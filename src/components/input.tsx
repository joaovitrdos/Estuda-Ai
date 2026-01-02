import { View, TextInput, StyleSheet } from 'react-native';
import { Theme } from '../styles/themes/themes';

export function Input(props: any) {

    return (
        <View style={styles.container}>
            <TextInput
                placeholderTextColor={Theme.colors.text}
                style={styles.input}
                {...props}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 14,
        borderColor: Theme.colors.text,
    },
    input: {
        padding: 14,
        fontSize: 16,
        borderColor: Theme.colors.primary,
        color: Theme.colors.text,
    },
});
