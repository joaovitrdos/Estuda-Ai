import { AuthProvider } from './src/contexts/AuthContexts';
import { RootNavigator } from './app/navigation/RootNavigation';

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
