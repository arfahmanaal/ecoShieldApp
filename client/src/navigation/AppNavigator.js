import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import { colors, fonts } from "../constants/theme";
import LoadingScreen from "../components/LoadingScreen";
import HomeScreen from "../features/home/screens/HomeScreen";
import DashboardScreen from "../features/home/screens/DashboardScreen";
import RegisterScreen from "../features/auth/screens/RegisterScreen";
import LoginScreen from "../features/auth/screens/LoginScreen";

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerStyle: { backgroundColor: colors.forest },
  headerTintColor: colors.white,
  headerTitleStyle: { fontFamily: fonts.heading, fontSize: 22 },
  headerShadowVisible: false,
  contentStyle: { backgroundColor: colors.background },
};

const AppNavigator = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        {session ? (
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{ title: "EcoShield" }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ title: "Create Account" }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: "Sign In" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;