import { Alert } from 'react-native';

/**
 * Confirmation réservée aux actions réellement irréversibles (§57).
 * Tout le reste s'exécute directement : l'utilisatrice garde la main.
 */
export function confirmDestructive(params: {
  title: string;
  message: string;
  confirmLabel: string;
  onConfirm: () => void;
}): void {
  Alert.alert(params.title, params.message, [
    { text: 'Annuler', style: 'cancel' },
    { text: params.confirmLabel, style: 'destructive', onPress: params.onConfirm },
  ]);
}
