import { COLORS } from "@/constants/theme";
import { useUser } from "@/src/api/user";
import BlockToggle from "@/src/components/BlockToggle";
import InfoCard from "@/src/components/InfoCard";
import { AppDispatch, RootState } from "@/src/store";
import { toggleBlockUser } from "@/src/store/slices/blockedUsersSlice";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, Text, View } from "tamagui";

export default function ProfileScreen() {
  // Get route params (used as fallback if API data is not available yet)
  const { id, name: paramName, avatar: paramAvatar, phone: paramPhone, email: paramEmail } = useLocalSearchParams();
  const userId = id as string;
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  
  // Fetch user profile data via React Query
  const { data: user, isLoading, error } = useUser(userId);
  
  // Use API data if available, otherwise fall back to route params
  // Ensure string types for route params (they can be string | string[])
  const name = user?.name ?? (Array.isArray(paramName) ? paramName[0] : paramName);
  const avatar = user?.avatar ?? (Array.isArray(paramAvatar) ? paramAvatar[0] : paramAvatar);
  const phone = user?.phone ?? (Array.isArray(paramPhone) ? paramPhone[0] : paramPhone) ?? '';
  const email = user?.email ?? (Array.isArray(paramEmail) ? paramEmail[0] : paramEmail) ?? '';
  
  // Get blocked status from Redux store
  const blockedUserIds = useSelector((state: RootState) => state.blockedUsers.blockedUserIds);
  const isBlocked = blockedUserIds.includes(userId);
  
  // Memoized toggle handler
  const handleBlockToggle = useCallback((id: string) => {
    dispatch(toggleBlockUser(id));
  }, [dispatch]);
  
  // Loading state
  if (isLoading && !paramName) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={styles.headerSpacer} />
        </View>
        <View style={styles.loadingContainer}>
          <Spinner size="large" color="$green10" />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  // Error state
  if (error && !paramName) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={styles.headerSpacer} />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorEmoji}>😕</Text>
          <Text style={styles.errorTitle}>Unable to load profile</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            {avatar ? (
              <Image
                source={{ uri: avatar as string }}
                style={styles.avatar}
              />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Text style={styles.avatarInitial}>
                  {(name as string)?.[0]?.toUpperCase() || '?'}
                </Text>
              </View>
            )}
            <View style={styles.onlineIndicator} />
          </View>

         {/* Name & Online Status */}
          <Text style={styles.profileName}>{name || 'Unknown User'}</Text>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Online</Text>
          </View>
        </View>

        {/* Info Cards */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          <InfoCard
            label="Phone Number"
            value={phone as string}
            icon="📞"
          />
          <InfoCard
            label="Email"
            value={email as string}
            icon="✉️"
          />
          <BlockToggle
            userId={userId}
            userName={name as string}
            isBlocked={isBlocked}
            onToggle={handleBlockToggle}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.text,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: COLORS.surface,
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.border,
  },
  avatarPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  avatarInitial: {
    fontSize: 40,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.online,
    borderWidth: 3,
    borderColor: COLORS.surface,
  },
  profileName: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.online,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: COLORS.online,
    fontWeight: '500',
  },
  infoSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    marginLeft: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 18,
    color: COLORS.text,
    fontWeight: '600',
  },
});
