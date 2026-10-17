import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AppButton from "../../../components/AppButton";
import StatusBadge from "../../../components/StatusBadge";
import { colors, fonts, radius, spacing } from "../../../constants/theme";
import { getCategoryLabel } from "../../../constants/incidents";
import { getMyIncidents } from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";
import { formatDateTime } from "../../../utils/formatDate";

const IncidentCard = ({ incident }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <Text style={styles.category}>
          {getCategoryLabel(incident.category)}
        </Text>
        <StatusBadge status={incident.status} />
      </View>

      <Text style={styles.cardTitle}>{incident.title}</Text>
      <Text style={styles.cardText} numberOfLines={2}>
        {incident.description}
      </Text>

      <Text style={styles.meta}>
        Observed {formatDateTime(incident.observedAt)}
      </Text>
      {incident.location ? (
        <Text style={styles.meta}>{incident.location.description}</Text>
      ) : null}
    </View>
  );
};

const MyReportsScreen = ({ navigation }) => {
  const { session, signOut } = useAuth();
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      const result = await getMyIncidents(session.token);
      setIncidents(result.data.incidents);
      setError(null);
    } catch (err) {
      if (err.status === 401) {
        await signOut();
        return;
      }
      setError(err.message);
    }
  };

  useEffect(() => {
    const firstLoad = async () => {
      await load();
      setLoading(false);
    };

    firstLoad();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const handleRetry = async () => {
    setLoading(true);
    await load();
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.forest} />
      </View>
    );
  }

  if (error && incidents.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.stateTitle}>Could not load reports</Text>
        <Text style={styles.stateText}>{error}</Text>
        <AppButton
          title="Try again"
          onPress={handleRetry}
          style={styles.stateButton}
        />
      </View>
    );
  }

  return (
    <FlatList
      data={incidents}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <IncidentCard incident={item} />}
      contentContainerStyle={styles.list}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={[colors.forest]}
          tintColor={colors.forest}
        />
      }
      ListHeaderComponent={
        error ? (
          <Text style={styles.banner}>
            Could not refresh. Pull down to try again.
          </Text>
        ) : null
      }
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.stateTitle}>No reports yet</Text>
          <Text style={styles.stateText}>
            Reports you submit will appear here with their latest status.
          </Text>
          <AppButton
            title="Report an incident"
            onPress={() => navigation.navigate("ReportIncident")}
            style={styles.stateButton}
          />
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
  },
  list: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  category: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: colors.textMuted,
  },
  cardTitle: {
    fontFamily: fonts.heading,
    fontSize: 21,
    color: colors.forest,
    marginBottom: spacing.xs,
  },
  cardText: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  meta: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xxl,
  },
  stateTitle: {
    fontFamily: fonts.heading,
    fontSize: 26,
    color: colors.forest,
    textAlign: "center",
  },
  stateText: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: spacing.sm,
  },
  stateButton: {
    marginTop: spacing.lg,
    alignSelf: "stretch",
  },
  banner: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: "#8a2a22",
    backgroundColor: "#f6dcd9",
    borderRadius: radius.md,
    padding: spacing.sm,
    marginBottom: spacing.md,
    textAlign: "center",
  },
});

export default MyReportsScreen;