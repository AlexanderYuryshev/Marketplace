import { React, useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";
import { useHttp } from "../hooks/http.hook.js";
import store from "../redux/store.js";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../redux/actions.js";
import { useSelector } from "react-redux";

export const ProductsPage = () => {
    const auth = useContext(AuthContext);
    const products = useSelector((state) => state.products);
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

    return (
        <>
            <div className="search">
                <input type="text" placeholder="Search" className="search-input"></input>
            </div>

            <div className="list">
                {products[0] &&
                    products.map((product) => (
                        <div key={"list-product-" + product.id} className="item">
                            <img src={`./products-images/${product.id}.png`} alt="Product here" width={100 + "%"} height={60 + "%"}/>
                            <h3>{product.title}</h3>
                            {product.amount > 0 ? (
                                <span>{product.cost * product.amount}&#8381; for {product.amount} items</span>
                            ) : (
                                <span>{product.cost}&#8381;</span>
                            )}
                            {auth.isAuthentificated &&
                                (product.amount === 0 ? (
                                    <button
                                        name="add"
                                        id={product.id}
                                        value={0}
                                        onClick={addHandler}
                                    >
                                        Add to cart
                                    </button>
                                ) : (
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
                                ))}
                        </div>
                    ))}
            </div>
        </>
    );
};
