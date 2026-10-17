import { StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "../constants/theme";
import { INCIDENT_STATUS_STYLES } from "../constants/incidents";

const StatusBadge = ({ status }) => {
  const config = INCIDENT_STATUS_STYLES[status] || {
    label: status,
    backgroundColor: colors.lintLight,
    textColor: colors.forest,
  };

  return (
    <View style={[styles.badge, { backgroundColor: config.backgroundColor }]}>
      <Text style={[styles.text, { color: config.textColor }]}>
        {config.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  text: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
  },
});

export default StatusBadge;