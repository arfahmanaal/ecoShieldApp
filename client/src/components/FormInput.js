import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors, fonts, radius, spacing } from "../constants/theme";

const FormInput = ({ label, style, ...inputProps }) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...inputProps}
        placeholderTextColor={colors.textMuted}
        style={[styles.input, focused && styles.inputFocused, style]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },
  label: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.text,
  },
  inputFocused: {
    borderColor: colors.emerald,
  },
});

export default FormInput;