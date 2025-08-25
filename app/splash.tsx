import { SplashScreen } from 'expo-router';
import { useSession } from '@/context/AuthContext';

export default function SplashScreenController() {
  const { isLoading } = useSession();

  if (!isLoading) {
    SplashScreen.hideAsync();
  }

  return null;
}
