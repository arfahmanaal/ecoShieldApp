import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { colors, fonts, radius, spacing } from "../constants/theme";

const variants = {
  primary: {
    backgroundColor: colors.forest,
    borderColor: colors.forest,
    textColor: colors.white,
  },
  secondary: {
    backgroundColor: colors.lintLight,
    borderColor: colors.lintLight,
    textColor: colors.forest,
  },
  accent: {
    backgroundColor: colors.lint,
    borderColor: colors.lint,
    textColor: colors.forest,
  },
  outlineLight: {
    backgroundColor: "transparent",
    borderColor: colors.lintLight,
    textColor: colors.white,
  },
};

const AppButton = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = "primary",
  style,
}) => {
  const palette = variants[variant];
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.base,
        {
          backgroundColor: palette.backgroundColor,
          borderColor: palette.borderColor,
        },
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={palette.textColor} />
      ) : (
        <Text style={[styles.text, { color: palette.textColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 16,
  },
});

export default AppButton;