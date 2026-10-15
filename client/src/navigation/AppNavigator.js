import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import HomeScreen from "../features/home/screens/HomeScreen";
import DashboardScreen from "../features/home/screens/DashboardScreen";
import RegisterScreen from "../features/auth/screens/RegisterScreen";
import LoginScreen from "../features/auth/screens/LoginScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#2e7d32" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
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
              options={{ title: "EcoShield" }}
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