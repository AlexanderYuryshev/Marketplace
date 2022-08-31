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
        console.log("Req body: ", reqBody);
        const product = products.find((i) => +i.id === +id);
        // console.log("Pr: ", product);
        if (e.target.name !== "sub") {
            reqBody.productAmount += 1;
            await request(`${auth.url}cart`, "PUT", reqBody);
            store.dispatch(ADD_TO_CART(id));
        } else {
            if (product.amount > 0) {
                reqBody.productAmount -= 1;
                await request(`${auth.url}cart`, "PUT", reqBody);
                store.dispatch(REMOVE_FROM_CART(id));
            }
        }
    };

    return (
        <>
            <div className="search">
                <input list="sort" placeholder="Sort by" className="search-input"></input>
                <datalist id="sort">
                    <option value="Lowest price first"></option>
                    <option value="Highest price first"></option>
                    <option value="From A to Z"></option>
                    <option value="From Z to A"></option>
                </datalist>
                <input type="text" placeholder="Search" className="search-input"></input>
            </div>

            <div className="list">
                {products[0] &&
                    products.map((product) => (
                        <div key={"list-product-" + product.id} className="item">
                            <img
                                src={`./products-images/${product.title.toLowerCase()}.png`}
                                alt="Product here"
                            />
                            <h3>{product.title}</h3>
                            {/* <p>
                            {product.description.length > 50
                                ? product.description.slice(0, 49) + "..."
                                : product.description}
                        </p> */}
                            <span>{product.cost + " tugrics"}</span>
                            {product.amount === 0 ? (
                                <button id={product.id} value={0} onClick={addHandler}>
                                    Add to cart
                                </button>
                            ) : (
                                <form>
                                    <button
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
                            )}
                        </div>
                    ))}
            </div>
        </>
    );
};
