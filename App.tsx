import { AuthProvider } from './src/contexts/AuthContexts';
import { RootNavigator } from './app/navigation/RootNavigation';
import { AlertModalProvider } from './src/provider/AlertModalProvider';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});
export default function App() {

  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>([]);
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(
    undefined
  );


  return (
    <AlertModalProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </AlertModalProvider>
  );
}
