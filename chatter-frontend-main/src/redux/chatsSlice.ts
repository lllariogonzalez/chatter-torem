import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { ChatsState, ChatTabProps } from '../types/chat';

const initialState: ChatsState = {
  chats: [],
  isAllowedExpand: true
};

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChatsData: (state, action: PayloadAction<Array<ChatTabProps>>) => {
      state.chats = action.payload;
    },
    setIsAllowedExpand: (state, action: PayloadAction<boolean>) => {
      state.isAllowedExpand = action.payload;
    }
  }
});

export const { setChatsData, setIsAllowedExpand } = chatsSlice.actions;

export const getChats = (state: RootState) => state.chats;
export const getIsAllowedExpand = (state: RootState) => state.chats.isAllowedExpand;

export default chatsSlice.reducer;
