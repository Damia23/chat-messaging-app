import { COLORS } from '@/constants/theme'
import { Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import { ScrollView, StyleSheet, Switch, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card, Text, View, XStack, YStack } from 'tamagui'

export default function SettingsScreen() {
  const appName = Constants.expoConfig?.name || 'chat app'
  const appVersion = Constants.expoConfig?.version || '1.0.0'

  return (
    <LinearGradient
      colors={[COLORS.primaryLight, COLORS.background]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.3 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Profile Header */}
          <YStack alignItems="center" paddingTop="$6" paddingBottom="$8" gap="$3">
            <View style={styles.avatarContainer}>
              <Ionicons name="person" size={40} color={COLORS.textOnPrimary} />
            </View>
            <YStack alignItems="center" gap="$1">
              <Text style={styles.profileName}>Guest User</Text>
              <Text style={styles.profileEmail}>guest@bubble.app</Text>
            </YStack>
            <TouchableOpacity style={styles.editProfileButton}>
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          </YStack>

          {/* Settings Sections */}
          <YStack paddingHorizontal="$4" gap="$6">
            {/* Account Section */}
            <YStack gap="$3">
              <Text style={styles.sectionTitle}>Account</Text>
              <Card style={styles.card}>
                <SettingsItem
                  icon="person-outline"
                  iconColor={COLORS.accentBlue}
                  iconBg="#EFF6FF"
                  title="Profile Settings"
                  subtitle="Update your personal information"
                  showArrow
                />
                <View style={styles.divider} />
                <SettingsItem
                  icon="lock-closed-outline"
                  iconColor={COLORS.primary}
                  iconBg="#ECFDF5"
                  title="Privacy & Security"
                  subtitle="Manage your privacy settings"
                  showArrow
                />
                <View style={styles.divider} />
                <SettingsItem
                  icon="key-outline"
                  iconColor={COLORS.accentOrange}
                  iconBg="#FEF3C7"
                  title="Change Password"
                  subtitle="Update your login credentials"
                  showArrow
                />
              </Card>
            </YStack>

            {/* Support Section */}
            <YStack gap="$3">
              <Text style={styles.sectionTitle}>Support</Text>
              <Card style={styles.card}>
                <SettingsItem
                  icon="help-circle-outline"
                  iconColor={COLORS.primary}
                  iconBg="#ECFDF5"
                  title="Help Center"
                  subtitle="FAQs and support articles"
                  showArrow
                />
                <View style={styles.divider} />
                <SettingsItem
                  icon="chatbubble-ellipses-outline"
                  iconColor={COLORS.accentBlue}
                  iconBg="#EFF6FF"
                  title="Contact Us"
                  subtitle="Get in touch with our team"
                  showArrow
                />
                <View style={styles.divider} />
                <SettingsItem
                  icon="star-outline"
                  iconColor={COLORS.accentOrange}
                  iconBg="#FEF3C7"
                  title="Rate the App"
                  subtitle="Share your feedback"
                  showArrow
                />
              </Card>
            </YStack>

            {/* Danger Zone */}
            <YStack gap="$3">
              <Text style={styles.sectionTitle}>Danger Zone</Text>
              <Card style={styles.cardDanger}>
                <TouchableOpacity style={styles.dangerItem}>
                  <XStack alignItems="center" gap="$3">
                    <View style={[styles.iconContainer, { backgroundColor: '#FEE2E2' }]}>
                      <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
                    </View>
                    <Text style={styles.dangerText}>Log Out</Text>
                  </XStack>
                </TouchableOpacity>
              </Card>
            </YStack>

            {/* App Info */}
            <YStack alignItems="center" paddingVertical="$6" gap="$2">
              <View style={styles.appIconSmall}>
                <Ionicons name="chatbubbles" size={24} color={COLORS.primary} />
              </View>
              <Text style={styles.appName}>{appName}</Text>
              <Text style={styles.appVersion}>Version {appVersion}</Text>
              <Text style={styles.copyright}>© 2025 Chat App. All rights reserved.</Text>
            </YStack>
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

// Reusable Settings Item Component
function SettingsItem({
  icon,
  iconColor,
  iconBg,
  title,
  subtitle,
  showArrow,
  showToggle,
}: {
  icon: string
  iconColor: string
  iconBg: string
  title: string
  subtitle: string
  showArrow?: boolean
  showToggle?: boolean
}) {
  return (
    <TouchableOpacity style={styles.settingsItem} activeOpacity={0.7}>
      <XStack alignItems="center" gap="$3" flex={1}>
        <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
          <Ionicons name={icon as any} size={20} color={iconColor} />
        </View>
        <YStack flex={1}>
          <Text style={styles.itemTitle}>{title}</Text>
          <Text style={styles.itemSubtitle}>{subtitle}</Text>
        </YStack>
        {showArrow && (
          <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
        )}
        {showToggle && (
          <Switch
            trackColor={{ false: COLORS.border, true: COLORS.primaryLight }}
            thumbColor={COLORS.surface}
            value={false}
          />
        )}
      </XStack>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
  },
  profileEmail: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  editProfileButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginTop: 8,
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginLeft: 4,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    overflow: 'hidden',
  },
  cardDanger: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    overflow: 'hidden',
  },
  settingsItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginLeft: 68,
  },
  dangerItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dangerText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.error,
  },
  appIconSmall: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 8,
  },
  appVersion: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  copyright: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 8,
  },
})
