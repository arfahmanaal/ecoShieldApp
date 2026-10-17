import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text } from "react-native";
import AppButton from "../../../components/AppButton";
import ChipSelect from "../../../components/ChipSelect";
import FormInput from "../../../components/FormInput";
import { colors, fonts, spacing } from "../../../constants/theme";
import { INCIDENT_CATEGORIES } from "../../../constants/incidents";
import { createIncident } from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";

const TIME_OPTIONS = [
  { value: 0, label: "Just now" },
  { value: 1, label: "1 hour ago" },
  { value: 3, label: "3 hours ago" },
  { value: 24, label: "1 day ago" },
];

const ReportIncidentScreen = ({ navigation }) => {
  const { session, signOut } = useAuth();
  const [category, setCategory] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [hoursAgo, setHoursAgo] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const cleanTitle = title.trim();
    const cleanDescription = description.trim();
    const cleanLocation = location.trim();

    if (!category) {
      Alert.alert("Missing details", "Please choose a category.");
      return;
    }

    if (cleanTitle.length < 3) {
      Alert.alert("Missing details", "Title must be at least 3 characters.");
      return;
    }

    if (cleanDescription.length < 10) {
      Alert.alert(
        "Missing details",
        "Description must be at least 10 characters."
      );
      return;
    }

    setLoading(true);

    try {
      const observedAt = new Date(
        Date.now() - hoursAgo * 60 * 60 * 1000
      ).toISOString();

      const body = {
        category,
        title: cleanTitle,
        description: cleanDescription,
        observedAt,
      };

      if (cleanLocation) {
        body.location = { description: cleanLocation };
      }

      const result = await createIncident(session.token, body);

      Alert.alert(
        "Report submitted",
        `Reference: ${result.data.incident.id}\n\nYour report is unverified until it has been reviewed.`,
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      if (error.status === 401) {
        Alert.alert("Session expired", "Please sign in again.");
        await signOut();
      } else {
        Alert.alert("Could not submit report", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Report an incident</Text>
      <Text style={styles.subtitle}>
        Describe what you observed. Reports are reviewed before being treated as
        verified.
      </Text>

      <ChipSelect
        label="Category"
        options={INCIDENT_CATEGORIES}
        value={category}
        onChange={setCategory}
      />

      <FormInput
        label="Title"
        placeholder="Short summary"
        value={title}
        onChangeText={setTitle}
        maxLength={100}
      />

      <FormInput
        label="Description"
        placeholder="What did you see? Any details that help."
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={5}
        textAlignVertical="top"
        maxLength={2000}
        style={styles.multiline}
      />

      <FormInput
        label="Location (optional)"
        placeholder="Street, landmark or area"
        value={location}
        onChangeText={setLocation}
        maxLength={200}
      />

      <ChipSelect
        label="When did you notice it?"
        options={TIME_OPTIONS}
        value={hoursAgo}
        onChange={setHoursAgo}
      />

      <AppButton
        title="Submit report"
        onPress={handleSubmit}
        loading={loading}
        style={styles.button}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 32,
    color: colors.forest,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  multiline: {
    minHeight: 110,
  },
  button: {
    marginTop: spacing.sm,
  },
});

export default ReportIncidentScreen;