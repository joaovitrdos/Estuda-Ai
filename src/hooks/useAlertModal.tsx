import { useContext } from 'react';
import { AlertContext } from '../provider/AlertModalProvider';

export function useAlert() {
  return useContext(AlertContext);
}
