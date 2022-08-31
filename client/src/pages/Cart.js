import { React, useCallback, useContext } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "../context/AuthContext.js";
import store from "../redux/store.js";
import { CLEAR_CART, REMOVE_FROM_CART } from "../redux/actions.js";
import { useHttp } from "../hooks/http.hook.js";

export const Cart = () => {
    const auth = useContext(AuthContext);
    let products = useSelector((state) => state.cartProducts);
    console.log(products);
    const { request } = useHttp();

    const removeFromCart = async (e) => {
        const id = e.target.value;
        const reqBody = {
            UserId: auth.userId,
            products: products.filter((item) => +item.id !== +id).map((item) => item.id),
        };
        try {
            await request(`${auth.url}cart`, "DELETE", reqBody);
            store.dispatch(REMOVE_FROM_CART(e.target.value));
        } catch (e) {
            console.log(e);
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
            };
            await request(`${auth.url}my-orders`, "POST", data);
            store.dispatch(CLEAR_CART());
        } else {
            alert("You should add something to the cart before creating an order");
        }
    };

    const calculateCost = useCallback((products) => {
        return products.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue.Product.cost;
        }, 0);
    }, []);

    return (
        <>
            <h2 className="page-header">Cart</h2>
            <div className="list">
                {products[0] &&
                    products.map((product) => (
                        <div key={"list-product-" + product.Product.id} className="item">
                            <h3>{product.Product.title}</h3>
                            {/* <p>
                                {product.description.length > 50
                                    ? product.description.slice(0, 49) + "..."
                                    : product.description}
                            </p> */}
                            <span>{product.Product.cost} tugrics</span>
                            <span>{product.Product.vendorInfo}</span>
                            <span>Amount: {product.amount}</span>
                            <button value={product.Product.id} onClick={removeFromCart}>
                                Remove from cart
                            </button>
                        </div>
                    ))}
            </div>
            <div className="list">
                <button onClick={createOrder}>Create order</button>
                <h3>Total cost: {calculateCost(products)} tugrics</h3>
                <h3>Product count: {products.length}</h3>
            </div>
        </>
    );
};
