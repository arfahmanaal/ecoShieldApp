import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, fonts, radius, spacing } from "../constants/theme";

const ChipSelect = ({ label, options, value, onChange }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        {options.map((option) => {
          const selected = option.value === value;

          return (
            <TouchableOpacity
              key={String(option.value)}
              activeOpacity={0.85}
              onPress={() => onChange(option.value)}
              style={[styles.chip, selected && styles.chipSelected]}
            >
              <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
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
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  chipSelected: {
    backgroundColor: colors.forest,
    borderColor: colors.forest,
  },
  chipText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: colors.forest,
  },
  chipTextSelected: {
    color: colors.white,
  },
});

export default ChipSelect;