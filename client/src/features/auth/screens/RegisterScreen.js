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
import { registerUser } from "../../../services/api";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (!cleanName || !cleanEmail || !password || !confirmPassword) {
      Alert.alert("Missing details", "Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Weak password", "Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password mismatch", "Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await registerUser({
        name: cleanName,
        email: cleanEmail,
        password,
      });

      Alert.alert("Account created", "Your account was created successfully.", [
        { text: "OK", onPress: () => navigation.replace("Login") },
      ]);
    } catch (error) {
      Alert.alert("Registration failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Create your account</Text>
      <Text style={styles.subtitle}>
        Join EcoShield to report incidents and stay prepared.
      </Text>

      <FormInput
        label="Full name"
        placeholder="Your name"
        value={name}
        onChangeText={setName}
      />

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
        placeholder="At least 8 characters"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <FormInput
        label="Confirm password"
        placeholder="Repeat your password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <AppButton
        title="Register"
        onPress={handleRegister}
        loading={loading}
        style={styles.button}
      />

      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.linkText}>
          Already have an account? <Text style={styles.linkStrong}>Sign in</Text>
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

export default RegisterScreen;