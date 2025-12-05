import { COLORS } from '@/constants/theme'
import { Message } from '@/src/api/messages'
import ChatInput from '@/src/components/ChatInput'
import { useMessages, useSendMessage } from '@/src/hooks/useChat'
import { useLocalSearchParams, useRouter } from 'expo-router'
import LottieView from 'lottie-react-native'
import React, { useCallback, useRef, useState } from 'react'
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Spinner, Text, View } from 'tamagui'

// Define a constant for "my" userId (the current user)
const MY_USER_ID = 'me'

export default function ChatScreen() {
  const { id, name, avatar, phone, email } = useLocalSearchParams()
  const chatId = id as string
  const router = useRouter()
  const [messageText, setMessageText] = useState('')
  const flatListRef = useRef<FlatList>(null)

  // Use React Query for messages with optimistic updates
  const { data, isLoading, error } = useMessages(chatId)
  const sendMessageMutation = useSendMessage(chatId)

  const messages = React.useMemo(() => {
    const fetchedMessages = Array.isArray(data) ? data : []
    return [...fetchedMessages].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )
  }, [data])

  // Format timestamp
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const renderItem = ({ item, index }: { item: Message; index: number }) => {
    const isSentMessage = item.userId === MY_USER_ID
    const prevMessage = index > 0 ? messages[index - 1] : null
    const showTimestamp = !prevMessage ||
      (new Date(item.createdAt).getTime() - new Date(prevMessage.createdAt).getTime() > 300000) // 5 min gap
    
    return (
      <View style={styles.messageContainer}>
        {showTimestamp && (
          <View style={styles.timestampContainer}>
            <Text style={styles.timestampText}>
              {formatTime(item.createdAt)}
            </Text>
          </View>
        )}
        <View
          style={[
            styles.messageBubbleRow,
            isSentMessage ? styles.sentRow : styles.receivedRow,
          ]}
        >
          {!isSentMessage && (
            <Image
              source={{ uri: avatar as string }}
              style={styles.messageAvatar}
            />
          )}
          <View
            style={[
              styles.messageBubble,
              isSentMessage ? styles.sentBubble : styles.receivedBubble,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                isSentMessage ? styles.sentText : styles.receivedText,
              ]}
            >
              {item.text}
            </Text>
          </View>
        </View>
      </View>
    )
  }

  // ------------- HANDLE SEND MESSAGE -------------
  const onSend = useCallback(() => {
    if (!messageText.trim()) return

    const textToSend = messageText.trim()
    setMessageText('')
    
    // Send message with optimistic update handled by useSendMessage hook
    sendMessageMutation.mutate({
      title: 'chat-message',
      body: textToSend,
      userId: chatId,
    })
    
    // Scroll to bottom after sending
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true })
    }, 100)
  }, [messageText, chatId, sendMessageMutation])

  const navigateToProfile = () => {
    router.push({
      pathname: '/chat/ProfileScreen',
      params: { id: id as string, name: name as string, avatar: avatar as string, phone: phone as string, email: email as string },
    })
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Spinner size="large" color="$green10" />
        <Text style={styles.loadingText}>Loading messages...</Text>
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorEmoji}>😕</Text>
        <Text style={styles.errorTitle}>Unable to load messages</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header with avatar and user info */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={navigateToProfile} style={styles.userInfo}>
          <View style={styles.headerAvatarContainer}>
            <Image
              source={{ uri: avatar as string }}
              style={styles.headerAvatar}
            />
            <View style={styles.onlineIndicator} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.headerName} numberOfLines={1}>
              {name || 'Chat'}
              
            </Text>
            <Text style={styles.headerStatus}>Online</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreIcon}>•••</Text>
        </TouchableOpacity>
      </View>
      
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <LottieView
        autoPlay
        loop
        style={{
          width: 200,
          height: 200,
          
        }}
        source={require('@/assets/lottie/fish.json')}
      />
      <Text style={styles.emptyTitle}>Start the conversation</Text>
      <Text style={styles.emptyText}>Send a message to {name}</Text>
            </View>
          }
        />
     <ChatInput
     value={messageText}
     onChangeText={setMessageText}
     onSend={onSend}
     />

      </KeyboardAvoidingView>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
  backIcon: {
    fontSize: 32,
    color: COLORS.primary,
    fontWeight: '300',
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.border,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.online,
    borderWidth: 2,
    borderColor: COLORS.surface,
  },
  headerText: {
    flex: 1,
  },
  headerName: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.text,
  },
  headerStatus: {
    fontSize: 13,
    color: COLORS.online,
    marginTop: 1,
  },
  moreButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreIcon: {
    fontSize: 18,
    color: COLORS.textSecondary,
    letterSpacing: 2,
  },
  keyboardView: {
    flex: 1,
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexGrow: 1,
  },
  messageContainer: {
    marginBottom: 4,
  },
  timestampContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  timestampText: {
    fontSize: 12,
    color: COLORS.textMuted,
    backgroundColor: COLORS.background,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
  },
  messageBubbleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 2,
  },
  sentRow: {
    justifyContent: 'flex-end',
  },
  receivedRow: {
    justifyContent: 'flex-start',
  },
  messageAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
    backgroundColor: COLORS.border,
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sentBubble: {
    backgroundColor: COLORS.messageSent,
    borderBottomRightRadius: 4,
  },
  receivedBubble: {
    backgroundColor: COLORS.messageReceived,
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  sentText: {
    color: '#FFFFFF',
  },
  receivedText: {
    color: COLORS.text,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
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
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 24,
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  attachButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attachIcon: {
    fontSize: 22,
    color: COLORS.textSecondary,
    fontWeight: '300',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxHeight: 100,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: COLORS.primary,
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.border,
  },
  sendIcon: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
})

