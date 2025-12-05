import { COLORS } from "@/constants/theme"
import { Conversation } from "@/src/api/chat"
import { useChatList } from "@/src/hooks/useConversations"
import { RootState } from "@/src/store"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useCallback, useRef, useState } from "react"
import { ActivityIndicator, FlatList, Image, StatusBar, StyleSheet, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useSelector } from "react-redux"
import { Text, View, XStack } from "tamagui"

export default function ChatListScreen() {
  const router = useRouter()
  const flatListRef = useRef<FlatList>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Get local latest messages from Redux (for optimistic updates)
  const reduxLatestMessages = useSelector(
    (state: RootState) => state.latestMessage.latestMessages
  )

  // Use the custom hook for conversations and messages
  const { conversations, latestMessagesMap, isLoading, error } = useChatList()

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y
    setShowScrollTop(offsetY > 200)
  }

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({
      offset: 0,
      animated: true,
    })
  }

  // Format timestamp to relative time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Now'
    if (diffMins < 60) return `${diffMins}m`
    if (diffHours < 24) return `${diffHours}h`
    if (diffDays < 7) return `${diffDays}d`
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
  }

  // Memoized function to get latest message (combines Redux optimistic updates with API data)
  const getLatestMessage = useCallback((conversationId: string) => {
    const reduxLatest = reduxLatestMessages[conversationId]
    const apiLatest = latestMessagesMap[conversationId]
    
    if (reduxLatest && apiLatest) {
      const reduxTime = new Date(reduxLatest.createdAt).getTime()
      const apiTime = new Date(apiLatest.createdAt).getTime()
      return reduxTime > apiTime
        ? { text: reduxLatest.text, createdAt: reduxLatest.createdAt }
        : { text: apiLatest.text, createdAt: apiLatest.createdAt }
    }
    if (reduxLatest) {
      return { text: reduxLatest.text, createdAt: reduxLatest.createdAt }
    }
    if (apiLatest) {
      return { text: apiLatest.text, createdAt: apiLatest.createdAt }
    }
    return null
  }, [reduxLatestMessages, latestMessagesMap])

  const renderItem = useCallback(({ item }: { item: Conversation }) => {
    const latest = getLatestMessage(item.id)
    
    return (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/chat/ChatScreen",
            params: { id: item.id, name: item.name, avatar: item.avatar, phone: item.phone, email: item.email },
          })
        }
        activeOpacity={0.7}
        style={styles.chatItem}
      >
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: item.avatar }}
            style={styles.avatar}
          />
          <View style={styles.onlineIndicator} />
        </View>

        {/* Chat info */}
        <View style={styles.chatInfo}>
          <XStack justifyContent="space-between" alignItems="center">
            <Text style={styles.chatName} numberOfLines={1}>
              {item.name}
            </Text>
            {latest?.createdAt && (
              <Text style={styles.timestamp}>
                {formatTime(latest.createdAt)}
              </Text>
            )}
          </XStack>
          
          <XStack justifyContent="space-between" alignItems="center" marginTop={4}>
            <Text style={styles.lastMessage} numberOfLines={1}>
              {latest?.text ?? "Start a conversation"}
            </Text>
          </XStack>
        </View>
      </TouchableOpacity>
    )
  }, [router, getLatestMessage, formatTime])

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Messages</Text>
      <Text style={styles.headerSubtitle}>
        {conversations.length} conversation{conversations.length !== 1 ? 's' : ''}
      </Text>
    </View>
  )

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading conversations...</Text>
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorEmoji}>😕</Text>
        <Text style={styles.errorTitle}>Something went wrong</Text>
        <Text style={styles.errorText}>Unable to load conversations</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <FlatList
        ref={flatListRef}
        data={conversations}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>💬</Text>
            <Text style={styles.emptyTitle}>No conversations yet</Text>
            <Text style={styles.emptyText}>Start chatting with someone!</Text>
          </View>
        }
      />

      {showScrollTop && (
        <TouchableOpacity
          onPress={scrollToTop}
          activeOpacity={0.9}
          style={styles.scrollTopButton}
        >
        <Ionicons name="chevron-up" size={24} color={COLORS.border} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  header: {
    paddingHorizontal: 4,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 14,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.border,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.online,
    borderWidth: 2.5,
    borderColor: COLORS.surface,
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
    marginRight: 8,
  },
  timestamp: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  lastMessage: {
    fontSize: 15,
    color: COLORS.textSecondary,
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.border,
    marginLeft: 74,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  scrollTopButton: {
    position: 'absolute',
    bottom: 40,
    right: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  scrollTopText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
})
