import { COLORS } from '@/constants/theme'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card, Paragraph, Text, View, XStack, YStack } from 'tamagui'

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={[COLORS.primaryLight, COLORS.background]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.5 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container} edges={['top']}>
        <YStack alignItems="center" paddingTop="$8" paddingBottom="$6" gap="$3">
          <View style={styles.logoContainer}>
            <Ionicons name="chatbubbles" size={48} color={COLORS.primary} />
          </View>
          <Text style={styles.welcomeTitle}>Welcome to Chat App</Text>
          <Paragraph style={styles.welcomeSubtitle}>
            Your modern, secure messaging companion
          </Paragraph>
        </YStack>

        <XStack justifyContent="center" gap="$6" paddingVertical="$4">
          <YStack alignItems="center" gap="$1">
            <Text style={styles.statNumber}>10+</Text>
            <Text style={styles.statLabel}>Chats</Text>
          </YStack>
          <View style={styles.statDivider} />
          <YStack alignItems="center" gap="$1">
            <Text style={styles.statNumber}>100%</Text>
            <Text style={styles.statLabel}>Secure</Text>
          </YStack>
          <View style={styles.statDivider} />
          <YStack alignItems="center" gap="$1">
            <Text style={styles.statNumber}>24/7</Text>
            <Text style={styles.statLabel}>Online</Text>
          </YStack>
        </XStack>

        {/* Quick Actions */}
        <YStack paddingHorizontal="$4" gap="$4" paddingTop="$4">
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          {/* Card: Chats */}
          <TouchableOpacity activeOpacity={0.8}>
            <Card style={styles.card}>
              <XStack gap="$4" alignItems="center">
                <View style={[styles.iconContainer, { backgroundColor: '#EFF6FF' }]}>
                  <Ionicons name="chatbubbles" size={24} color={COLORS.accentBlue} />
                </View>
                <YStack flex={1}>
                  <Text style={styles.cardTitle}>Start Chatting</Text>
                  <Paragraph style={styles.cardDescription}>
                    View your conversations and send messages
                  </Paragraph>
                </YStack>
              </XStack>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8}>
            <Card style={styles.card}>
              <XStack gap="$4" alignItems="center">
                <View style={[styles.iconContainer, { backgroundColor: '#FEF3C7' }]}>
                  <Ionicons name="settings" size={24} color={COLORS.accentOrange} />
                </View>
                <YStack flex={1}>
                  <Text style={styles.cardTitle}>Preferences</Text>
                  <Paragraph style={styles.cardDescription}>
                    Customize your app experience
                  </Paragraph>
                </YStack>
              </XStack>
            </Card>
          </TouchableOpacity>
        </YStack>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  card: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  cardDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
})
