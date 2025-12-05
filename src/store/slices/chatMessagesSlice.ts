import { Message } from "@/src/api/messages"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ChatMessagesState {
  messagesByChatId: Record<string, Message[]>
}

const initialState: ChatMessagesState = {
  messagesByChatId: {},
}

const chatMessagesSlice = createSlice({
  name: "chatMessages",
  initialState,
  reducers: {
    addMessage: (
      state,
      action: PayloadAction<{ chatId: string; message: Message }>
    ) => {
      const { chatId, message } = action.payload
      if (!state.messagesByChatId[chatId]) {
        state.messagesByChatId[chatId] = []
      }
      const exists = state.messagesByChatId[chatId].some(
        (m) => m.id === message.id
      )
      if (!exists) {
        state.messagesByChatId[chatId].push(message)
      }
    },

    clearChatMessages: (state, action: PayloadAction<{ chatId: string }>) => {
      delete state.messagesByChatId[action.payload.chatId]
    },

    resetAllMessages: () => initialState,
  },
})

export const { addMessage, clearChatMessages, resetAllMessages } =
  chatMessagesSlice.actions

export default chatMessagesSlice.reducer