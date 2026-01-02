import { AuthProvider } from './src/contexts/AuthContexts';
import { RootNavigator } from './app/navigation/RootNavigation';
import { AlertModalProvider } from './src/provider/AlertModalProvider';

export default function App() {
  return (
    <AlertModalProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </AlertModalProvider>
  );
}
