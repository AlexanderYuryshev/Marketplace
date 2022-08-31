import { React, useContext, useState, useEffect, useCallback } from "react";
import { AuthContext } from "../context/AuthContext.js";

export const OrdersPage = () => {
    const auth = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const UserId = localStorage.getItem("UserId");

    const calculateCost = useCallback((products) => {
        return products.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue.cost;
        }, 0);
    }, []);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await fetch(`${auth.url}my-orders`, {
                    method: "GET",
                    headers: {
                        UserId: +UserId,
                    },
                });
                const data = await res.json();
                setOrders([...data]);
            } catch (e) {
                console.log(e);
            }
        };
        getOrders();
    }, []);

    return (
        <>
            <div className="search">
                <input list="sort" placeholder="Sort by" className="search-input"></input>
                <datalist id="sort">
                    <option value="Lowest price first"></option>
                    <option value="Highest price first"></option>
                    <option value="Earlier first"></option>
                    <option value="Later first"></option>
                </datalist>
            </div>

            <div className="order-list">
                {orders.map((order) => (
                    <div key={"list-order-" + order.id} className="order-item">
                        <h3>Order ID: {order.id}</h3>
                        {/* <p>
                            {product.description.length > 50
                                ? product.description.slice(0, 49) + "..."
                                : product.description}
                        </p> */}
                        {/* <span>{calculateCost(order.products)}</span> */}
                        <span>
                            {order.Products[0] && `Cost: ${calculateCost(order.Products)} tugrics`}
                        </span>
                        <span>Order Date: {order.orderDate}</span>
                        <span>Delivery Date: {order.deliveryDate}</span>
                        <span>Delivery Address: {order.deliveryAddress}</span>
                    </div>
                ))}
            </div>
        </>
    );
};
