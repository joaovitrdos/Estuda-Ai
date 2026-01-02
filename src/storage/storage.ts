import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToken = async (token: string) => {
    try {
        await AsyncStorage.setItem('@user_token', token);
    } catch (e) {
        console.log('Erro ao salvar token:', e);
    }
};

export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('@user_token');
        return token;
    } catch (e) {
        console.log('Erro ao ler token:', e);
    }
};

export const removeToken = async () => {
    try {
        await AsyncStorage.removeItem('@user_token');
    } catch (e) {
        console.log('Erro ao remover token:', e);
    }
};
