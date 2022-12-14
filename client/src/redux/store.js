import { configureStore } from "@reduxjs/toolkit";
const initialState = {
    products: []
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
            const cartProducts = state.products.map((value) => {
                for (let j = 0; j < action.products.length; j++) {
                    if (+value.id === +action.products[j].ProductId) {
                        return { ...value, amount: action.products[j].amount };
                    }
                }
                return value;
            });
            return {
                ...state,
                products: cartProducts,
            };
        case "CLEAR_CART":
            let cleanedProducts = state.products.map((i) => {
                return { ...i, amount: 0 };
            });
            return { ...state, products: cleanedProducts };
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
