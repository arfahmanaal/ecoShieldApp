import { ActivityIndicator, StyleSheet, View } from "react-native";
import { colors } from "../constants/theme";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.lint} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.forest,
  },
});

export default LoadingScreen;