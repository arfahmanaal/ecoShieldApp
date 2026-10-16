import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import AppButton from "../../../components/AppButton";
import FormInput from "../../../components/FormInput";
import { colors, fonts, spacing } from "../../../constants/theme";
import { loginUser } from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      Alert.alert("Missing details", "Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const result = await loginUser({ email: cleanEmail, password });

      if (!result.data || !result.data.token || !result.data.user) {
        throw new Error("Unexpected response from server.");
      }

      await signIn({
        token: result.data.token,
        user: result.data.user,
      });
    } catch (error) {
      Alert.alert("Login failed", error.message);
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>Sign in to continue to EcoShield.</Text>

      <FormInput
        label="Email"
        placeholder="you@example.com"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <FormInput
        label="Password"
        placeholder="Your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <AppButton
        title="Sign In"
        onPress={handleLogin}
        loading={loading}
        style={styles.button}
      />

      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.linkText}>
          No account? <Text style={styles.linkStrong}>Create one</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: spacing.lg,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 34,
    color: colors.forest,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.textMuted,
    marginBottom: spacing.xl,
  },
  button: {
    marginTop: spacing.sm,
  },
  link: {
    marginTop: spacing.lg,
    alignItems: "center",
  },
  linkText: {
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.textMuted,
  },
  linkStrong: {
    fontFamily: fonts.bodySemiBold,
    color: colors.forest,
    textDecorationLine: "underline",
  },
});

export default LoginScreen;