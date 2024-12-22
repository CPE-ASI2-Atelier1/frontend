import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type MessageType = string;

type ChatState = {
    messages: MessageType[];
};

const initialState: ChatState = {
    messages: [],
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        // Action pour ajouter un message au chat
        addMessage: (state, action: PayloadAction<MessageType>) => {
            state.messages.unshift(action.payload); // Ajoute le nouveau message en haut de la liste
        },
    },
});

export const { addMessage } = chatSlice.actions;

export default chatSlice.reducer;
