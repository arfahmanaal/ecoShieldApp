import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "../../../components/AppButton";
import { colors, fonts, spacing } from "../../../constants/theme";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.circleLarge} />
      <View style={styles.circleSmall} />

      <View style={styles.hero}>
        <Text style={styles.eyebrow}>DISASTER PREPAREDNESS</Text>
        <Text style={styles.title}>EcoShield</Text>
        <Text style={styles.subtitle}>
          Report incidents, stay prepared, and protect your community.
        </Text>
      </View>

      <View style={styles.actions}>
        <AppButton
          title="Sign In"
          variant="accent"
          onPress={() => navigation.navigate("Login")}
        />
        <AppButton
          title="Create Account"
          variant="outlineLight"
          style={styles.secondaryAction}
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.forest,
    paddingHorizontal: spacing.lg,
    justifyContent: "space-between",
    overflow: "hidden",
  },
  circleLarge: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: colors.emerald,
    opacity: 0.35,
    top: -80,
    right: -100,
  },
  circleSmall: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: colors.lint,
    opacity: 0.18,
    bottom: 180,
    left: -60,
  },
  hero: {
    flex: 1,
    justifyContent: "center",
  },
  eyebrow: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    letterSpacing: 2,
    color: colors.lint,
    marginBottom: spacing.md,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 52,
    color: colors.white,
    marginBottom: spacing.md,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 17,
    lineHeight: 26,
    color: colors.lintLight,
    maxWidth: 320,
  },
  actions: {
    paddingBottom: spacing.lg,
  },
  secondaryAction: {
    marginTop: 12,
  },
});

export default HomeScreen;