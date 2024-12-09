/**
 * @author Arthur Jezequel
 */

import {createSlice} from "@reduxjs/toolkit";

/**
 * Store slice handling cards
 */
export const cardSlice = createSlice({
    name: "card",
    initialState: {
        cardId : -1
    },
    reducers: {
        /**
         * When a card is selected, the id is updated so subscribed component can fetch the card
         * @param state State of the card slice.
         * @param action Payload containing the new card id
         */
        cardSelection: (state, action : {payload: number}   ) => {
            state.cardId = action.payload || -1;
        }
    }
})

export const {cardSelection} = cardSlice.actions;

export default cardSlice.reducer;