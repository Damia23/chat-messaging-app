import { Message, SendMessagePayload, fetchMessages, sendMessage as sendMessageApi } from '@/src/api/messages'
import { store } from '@/src/store'
import { setLatestMessage } from '@/src/store/slices/latestMessageSlice'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// Query key factory for better cache management
export const chatKeys = {
  all: ['messages'] as const,
  list: (chatId: string) => [...chatKeys.all, chatId] as const,
}

/**
 * Hook to fetch messages for a specific chat
 */
export function useMessages(chatId: string) {
  return useQuery<Message[]>({
    queryKey: chatKeys.list(chatId),
    queryFn: () => fetchMessages(chatId),
    staleTime: 30000, // 30 seconds
    refetchOnWindowFocus: false,
  })
}

/**
 * Hook to send a message with optimistic updates
 * Updates both React Query cache and Redux state for chat list display
 */
export function useSendMessage(chatId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: SendMessagePayload) => sendMessageApi(payload),
    
    // Optimistic update: add message to cache immediately
    onMutate: async (newMessagePayload) => {
      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: chatKeys.list(chatId) })

      // Snapshot the previous value
      const previousMessages = queryClient.getQueryData<Message[]>(chatKeys.list(chatId))

      const now = new Date().toISOString()
      // Use a combination of timestamp and random string for truly unique temp IDs
      const tempId = `temp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

      // Create optimistic message
      const optimisticMessage: Message = {
        id: tempId,
        userId: 'me',
        text: newMessagePayload.body,
        createdAt: now,
      }

      // Optimistically update the React Query cache
      queryClient.setQueryData<Message[]>(chatKeys.list(chatId), (old) => {
        return old ? [...old, optimisticMessage] : [optimisticMessage]
      })

      // Also update Redux latestMessage for ChatListScreen display
      store.dispatch(setLatestMessage({
        chatId,
        messageId: tempId,
        text: newMessagePayload.body,
        createdAt: now,
      }))

      // Return context with the snapshotted value
      return { previousMessages, optimisticMessage }
    },

    // If mutation fails, roll back to the previous value
    onError: (err, newMessage, context) => {
      console.error('Failed to send message:', err)
      if (context?.previousMessages) {
        queryClient.setQueryData(chatKeys.list(chatId), context.previousMessages)
      }
    },

    // After success, update with real server data
    onSuccess: (data, variables, context) => {
      if (data && context?.optimisticMessage) {
        // Create a unique client ID to avoid duplicates if server returns same ID
        const uniqueId = `${data.id}-${Date.now()}`
        
        // Update React Query cache - keep temp ID unique to avoid key conflicts
        queryClient.setQueryData<Message[]>(chatKeys.list(chatId), (old) => {
          if (!old) return old
          return old.map((msg) =>
            msg.id === context.optimisticMessage.id
              ? { ...msg, id: uniqueId }
              : msg
          )
        })

        // Update Redux latestMessage
        store.dispatch(setLatestMessage({
          chatId,
          messageId: uniqueId,
          text: variables.body,
          createdAt: context.optimisticMessage.createdAt,
        }))
      }
    },
  })
}