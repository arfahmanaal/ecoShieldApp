import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Baskervville_400Regular } from "@expo-google-fonts/baskervville/400Regular";
import { Epilogue_400Regular } from "@expo-google-fonts/epilogue/400Regular";
import { Epilogue_500Medium } from "@expo-google-fonts/epilogue/500Medium";
import { Epilogue_600SemiBold } from "@expo-google-fonts/epilogue/600SemiBold";
import { AuthProvider } from "./src/context/AuthContext";
import AppNavigator from "./src/navigation/AppNavigator";
import LoadingScreen from "./src/components/LoadingScreen";

const App = () => {
  const [fontsLoaded, fontError] = useFonts({
    Baskervville_400Regular,
    Epilogue_400Regular,
    Epilogue_500Medium,
    Epilogue_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return <LoadingScreen />;
  }

  return (
    <AuthProvider>
      <StatusBar style="light" />
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;