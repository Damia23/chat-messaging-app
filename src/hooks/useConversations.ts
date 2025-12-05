import { Conversation, fetchConversations } from '@/src/api/chat'
import { Message, fetchMessages } from '@/src/api/messages'
import { useQueries, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

// Query key factory for conversations
export const conversationKeys = {
  all: ['conversations'] as const,
  list: () => [...conversationKeys.all, 'list'] as const,
  messages: (conversationId: string) => ['messages', conversationId] as const,
}

/**
 * Hook to fetch all conversations
 */
export function useConversations() {
  return useQuery<Conversation[]>({
    queryKey: conversationKeys.list(),
    queryFn: fetchConversations,
    staleTime: 60000, // 1 minute
    refetchOnWindowFocus: true,
  })
}

/**
 * Hook to fetch messages for multiple conversations at once
 * Uses useQueries for parallel fetching
 */
export function useConversationMessages(conversations: Conversation[]) {
  const messageQueries = useQueries({
    queries: conversations.map((conv) => ({
      queryKey: conversationKeys.messages(conv.id),
      queryFn: () => fetchMessages(conv.id),
      enabled: !!conv.id,
      staleTime: 30000, // 30 seconds
      refetchOnWindowFocus: false,
    })),
  })

  // Build a map of conversation ID to latest message
  const latestMessagesMap = useMemo(() => {
    const map: Record<string, Message | null> = {}
    conversations.forEach((conv, index) => {
      const queryResult = messageQueries[index]
      if (queryResult?.data && Array.isArray(queryResult.data) && queryResult.data.length > 0) {
        // Sort by createdAt descending and get the latest
        const sorted = [...queryResult.data].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        map[conv.id] = sorted[0]
      } else {
        map[conv.id] = null
      }
    })
    return map
  }, [conversations, messageQueries])

  const isLoading = messageQueries.some((q) => q.isLoading)
  const isError = messageQueries.some((q) => q.isError)

  return {
    latestMessagesMap,
    isLoading,
    isError,
    queries: messageQueries,
  }
}

/**
 * Combined hook for chat list screen
 * Fetches conversations and their latest messages
 */
export function useChatList() {
  const conversationsQuery = useConversations()
  const conversations = conversationsQuery.data ?? []
  
  const messagesData = useConversationMessages(conversations)

  return {
    conversations,
    latestMessagesMap: messagesData.latestMessagesMap,
    isLoading: conversationsQuery.isLoading,
    isMessagesLoading: messagesData.isLoading,
    error: conversationsQuery.error,
    refetch: conversationsQuery.refetch,
  }
}