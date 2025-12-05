import { configureStore } from "@reduxjs/toolkit"
import blockedUsersReducer from "./slices/blockedUsersSlice"
import chatMessagesReducer from "./slices/chatMessagesSlice"
import latestMessageReducer from "./slices/latestMessageSlice"

export const store = configureStore({
  reducer: {
    latestMessage: latestMessageReducer,
    blockedUsers: blockedUsersReducer,
    chatMessages: chatMessagesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
