import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface BlockedUsersState {
  blockedUserIds: string[]
}

const initialState: BlockedUsersState = {
  blockedUserIds: [],
}

const blockedUsersSlice = createSlice({
  name: "blockedUsers",
  initialState,
  reducers: {
    blockUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload
      if (!state.blockedUserIds.includes(userId)) {
        state.blockedUserIds.push(userId)
      }
    },

    unblockUser: (state, action: PayloadAction<string>) => {
      state.blockedUserIds = state.blockedUserIds.filter(
        (id) => id !== action.payload
      )
    },

    toggleBlockUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload
      if (state.blockedUserIds.includes(userId)) {
        state.blockedUserIds = state.blockedUserIds.filter((id) => id !== userId)
      } else {
        state.blockedUserIds.push(userId)
      }
    },

    resetBlockedUsers: () => initialState,
  },
})

export const { blockUser, unblockUser, toggleBlockUser, resetBlockedUsers } =
  blockedUsersSlice.actions

export default blockedUsersSlice.reducer