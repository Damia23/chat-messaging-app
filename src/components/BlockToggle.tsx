import { COLORS } from "@/constants/theme";
import React from "react";
import { Alert, StyleSheet, Switch, View } from "react-native";
import { Text } from "tamagui";

interface BlockToggleProps {
  userId: string;
  userName: string;
  isBlocked: boolean;
  onToggle: (userId: string) => void;
}

export default function BlockToggle({ userId, userName, isBlocked, onToggle }: BlockToggleProps) {
  const handleToggle = () => {
    if (!isBlocked) {
      Alert.alert(
        "Block User",
        `Are you sure you want to block ${userName}? They won't be able to send you messages.`,
        [
          { text: "Cancel", style: "cancel" },
          { text: "Block", style: "destructive", onPress: () => onToggle(userId) },
        ]
      );
    } else {
      onToggle(userId);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.icon}>{isBlocked ? "🔓" : "🚫"}</Text>
        <View style={styles.textContainer}>
          <Text style={[styles.title, isBlocked && styles.blockedTitle]}>
            {isBlocked ? "User Blocked" : "Block User"}
          </Text>
          <Text style={styles.description}>
            {isBlocked
              ? `${userName} is blocked and cannot message you`
              : `Prevent ${userName} from sending you messages`}
          </Text>
        </View>
      </View>
      <Switch
        value={isBlocked}
        onValueChange={handleToggle}
        trackColor={{ false: COLORS.border, true: "rgba(239, 68, 68, 0.3)" }}
        thumbColor={isBlocked ? COLORS.blocked || "#EF4444" : COLORS.surface}
        ios_backgroundColor={COLORS.border}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    shadowColor: "rgba(0,0,0,0.08)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 2,
  },
  blockedTitle: {
    color: "#EF4444",
  },
  description: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
});
