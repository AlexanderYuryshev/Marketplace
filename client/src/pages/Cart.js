import { React, useCallback, useContext } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "../context/AuthContext.js";
import store from "../redux/store.js";
import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from "../redux/actions.js";
import { useHttp } from "../hooks/http.hook.js";

export const Cart = () => {
    const auth = useContext(AuthContext);
    let products = useSelector((state) => state.products).filter((product) => product.amount !== 0);
    console.log("Cart:", products);
    const { request } = useHttp();

    const addHandler = async (e) => {
        const id = +e.target.id;
        const amount = +e.target.value;
        e.preventDefault();

        let reqBody = {
            UserId: auth.userId,
            productId: id,
            productAmount: amount,
        };
        const product = products.find((i) => +i.id === +id);
        if (e.target.name !== "sub") {
            reqBody.productAmount += 1;
            store.dispatch(ADD_TO_CART(id));
            await request(`${auth.url}cart`, "PUT", reqBody);
        } else {
            if (product.amount > 0) {
                reqBody.productAmount -= 1;
                store.dispatch(REMOVE_FROM_CART(id));
                await request(`${auth.url}cart`, "PUT", reqBody);
            }
        }
    };

    const createOrder = async () => {
        const date = new Date();
        date.setDate(date.getDate() + 14);
        const ids = products.map((i) => i.id);
        if (products[0]) {
            const data = {
                UserId: auth.userId,
                orderDate: Date.now(),
                deliveryDate: date,
                deliveryAddress: "Moscow, Kremlin",
                products: ids,
                cost: calculateCost(products)
            };
            store.dispatch(CLEAR_CART());
            await request(`${auth.url}my-orders`, "POST", data);
        } else {
            alert("You should add something to the cart before creating an order");
        }
    };

    const calculateCost = useCallback((products) => {
        return products.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue.cost * currentValue.amount;
        }, 0);
    }, []);

    const calculateAmount = useCallback((products) => {
        return products.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue.amount;
        }, 0);
    }, []);

    return (
        <>
            <h2 className="page-header">Cart</h2>
            {products[0] ? null : <h3>Cart is empty</h3>}
            <div className="list">
                {products[0] &&
                    products.map((product) => (
                        <div key={"list-product-" + product.id} className="item">
                            <h3>{product.title}</h3>
                            <span>{product.cost} tugrics</span>
                            <span>{product.vendorInfo}</span>
                            <form>
                                <button
                                    name="add"
                                    id={product.id}
                                    value={product.amount}
                                    onClick={addHandler}
                                >
                                    +
                                </button>
                                <span>{product.amount}</span>
                                <button
                                    name="sub"
                                    id={product.id}
                                    value={product.amount}
                                    onClick={addHandler}
                                >
                                    -
                                </button>
                            </form>
                        </div>
                    ))}
            </div>
            {products[0] && <div className="list">
                <button onClick={createOrder}>Create order</button>
                <h3>Total cost: {calculateCost(products)} tugrics</h3>
                <h3>Product count: {calculateAmount(products)}</h3>
            </div>}
        </>
    );
};
