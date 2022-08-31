import { configureStore } from "@reduxjs/toolkit";
const initialState = {
    products: [],
    // cartProducts: [],
};

const store = configureStore({ reducer: reducer });

function reducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_PRODUCTS":
            let products = action.products.map((i) => {
                return { ...i, amount: 0 };
            });
            return { ...state, products: products };
        case "ADD_TO_CART":
            return {
                ...state,
                products: state.products.map((i) => {
                    return +i.id !== +action.id ? i : { ...i, amount: i.amount + 1 };
                }),
            };
        case "SET_CART":
            return { ...state, cartProducts: action.products };
        case "CLEAR_CART":
            return { ...state, cartProducts: [] };
        case "REMOVE_FROM_CART":
            return {
                ...state,
                products: state.products.map((i) => {
                    return +i.id !== +action.id ? i : { ...i, amount: i.amount - 1 };
                }),
            };
        default:
            return state;
    }
}

export default store;
