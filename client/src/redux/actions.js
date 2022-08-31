const ADD_PRODUCTS = (products) => ({
    type: "ADD_PRODUCTS",
    products,
});

const ADD_TO_CART = (id) => ({
    type: "ADD_TO_CART",
    id,
});

const SET_CART = (products) => ({
    type: "SET_CART",
    products,
});

const CLEAR_CART = () => ({
    type: "CLEAR_CART",
});

const REMOVE_FROM_CART = (id) => ({
    type: "REMOVE_FROM_CART",
    id,
});

export { ADD_PRODUCTS, ADD_TO_CART, SET_CART, CLEAR_CART, REMOVE_FROM_CART };
