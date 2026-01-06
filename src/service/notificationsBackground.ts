import * as Notifications from 'expo-notifications';
import { AppState } from 'react-native';

export async function notifyIfBackground(
  title: string,
  body: string
) {
  const state = AppState.currentState;

  // ❌ App aberto → não notifica
  if (state === 'active') return;

  // ✅ App em background ou fechado
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: null,
  });
}
