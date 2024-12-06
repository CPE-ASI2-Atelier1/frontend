import {createSlice} from "@reduxjs/toolkit";
import {ICard} from "../components/Card/Card.tsx";

export const cardSlice = createSlice({
    name: "card",
    initialState: {
        card : {
            name: "Floppa",
            description: "Floppa McFlopper Floppin' arround.",
            family: "Felines",
            affinity: "Lyon",
            imgUrl: "https://assets.coingecko.com/coins/images/36969/large/floppa.jpg?1722771377",
            smallOmgUrl: "https://assets.coingecko.com/coins/images/36969/large/floppa.jpg?1722771377",
            id: 2,
            energy: 500,
            hp: 26,
            defence: 4,
            attack: 1,
            price: 69,
            userId: 2,
        }
    },
    reducers: {
        cardSelection: (state, action : {payload: ICard}   ) => {
            state.card = action.payload || {};
        }
    }
})

export const {cardSelection} = cardSlice.actions;

export default cardSlice.reducer;