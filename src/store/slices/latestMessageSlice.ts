import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface LatestMessage {
  chatId: string
  messageId: string
  text: string
  createdAt: string
}

interface LatestMessageState {
  latestMessages: Record<string, LatestMessage> 
}

const initialState: LatestMessageState = {
  latestMessages: {},
}

const latestMessageSlice = createSlice({
  name: "latestMessage",
  initialState,
  reducers: {
    setLatestMessage: (state, action: PayloadAction<LatestMessage>) => {
      const msg = action.payload
      state.latestMessages[msg.chatId] = msg
    },

    clearLatestMessage: (state, action: PayloadAction<{ chatId: string }>) => {
      delete state.latestMessages[action.payload.chatId]
    },

    resetLatestMessages: () => initialState,
  },
})

export const { setLatestMessage, clearLatestMessage, resetLatestMessages } =
  latestMessageSlice.actions

export default latestMessageSlice.reducer
