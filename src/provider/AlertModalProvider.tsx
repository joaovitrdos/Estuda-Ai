import { createContext, useState, ReactNode } from 'react';
import { AlertModal } from '../components/AlertModal';

interface AlertContextData {
  showAlert: (title: string, message: string) => void;
}

export const AlertContext = createContext<AlertContextData>(
  {} as AlertContextData
);

export function AlertModalProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  function showAlert(title: string, message: string) {
    setTitle(title);
    setMessage(message);
    setVisible(true);
  }

  function closeAlert() {
    setVisible(false);
  }

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      <AlertModal
        visible={visible}
        title={title}
        message={message}
        onClose={closeAlert}
      />
    </AlertContext.Provider>
  );
}
