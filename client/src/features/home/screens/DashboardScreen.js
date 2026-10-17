import { StyleSheet, Text, View } from "react-native";
import AppButton from "../../../components/AppButton";
import { colors, fonts, radius, spacing } from "../../../constants/theme";
import { useAuth } from "../../../context/AuthContext";

const DashboardScreen = ({ navigation }) => {
  const { session, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>SIGNED IN</Text>
        <Text style={styles.name}>{session.user.name}</Text>
        <Text style={styles.email}>{session.user.email}</Text>
      </View>

      <AppButton
        title="Report an incident"
        onPress={() => navigation.navigate("ReportIncident")}
      />

      <AppButton
        title="My reports"
        variant="outline"
        onPress={() => navigation.navigate("MyReports")}
        style={styles.secondaryAction}
      />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>More coming soon</Text>
        <Text style={styles.cardText}>
          Daily recommendations will appear here as they are built.
        </Text>
      </View>

      <AppButton
        title="Sign Out"
        variant="secondary"
        onPress={signOut}
        style={styles.signOut}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  hero: {
    backgroundColor: colors.forest,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  eyebrow: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    letterSpacing: 2,
    color: colors.lint,
  },
  name: {
    fontFamily: fonts.heading,
    fontSize: 30,
    color: colors.white,
    marginTop: spacing.sm,
  },
  email: {
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.lintLight,
    marginTop: spacing.xs,
  },
  secondaryAction: {
    marginTop: spacing.sm,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginTop: spacing.md,
  },
  cardTitle: {
    fontFamily: fonts.heading,
    fontSize: 22,
    color: colors.forest,
  },
  cardText: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  signOut: {
    marginTop: spacing.lg,
  },
});

export default DashboardScreen;