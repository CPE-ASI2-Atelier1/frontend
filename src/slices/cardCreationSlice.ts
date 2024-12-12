/**
 * @author Arthur Jezequel
 */

// WARNING : THIS IS NOT USED YET, MIGHT HAVE TO DELETE
// TODO : DELETE ?

import {createSlice} from "@reduxjs/toolkit";
import ICard from "../types/ICard.ts";

interface WIPCardState {
    wipCard: ICard | null;
}

const initialState:WIPCardState = {
    wipCard: null,
};

export const cardCreationSlice = createSlice({
    name: "card",
    initialState,
    reducers: {
        updateWipCard(state, action : {payload : ICard}) {
            state.wipCard = action.payload || null;
        }
    }
})

export const {updateWipCard} = cardCreationSlice.actions;

export default cardCreationSlice.reducer;