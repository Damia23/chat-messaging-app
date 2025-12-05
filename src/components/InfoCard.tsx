import { COLORS } from "@/constants/theme";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "tamagui";

interface InfoCardProps {
  label: string;
  value: string;
  icon?: string;
  onPress?: () => void;
}

export default function InfoCard({ label, value, icon, onPress }: InfoCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
    >
      {icon && (
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{icon}</Text>
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      {onPress && <Text style={styles.chevron}>›</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: "rgba(0,0,0,0.08)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  icon: {
    fontSize: 18,
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: "500",
  },
  chevron: {
    fontSize: 24,
    color: COLORS.textMuted,
    fontWeight: "300",
  },
});
