import * as Notifications from 'expo-notifications';
import { AppState } from 'react-native';

export async function notifyIfBackground(
  title: string,
  body: string
) {
  const state = AppState.currentState;

  if (state === 'active') return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: null,
  });
}
