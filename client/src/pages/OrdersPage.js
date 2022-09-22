import { React, useContext, useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "../context/AuthContext.js";

export const OrdersPage = () => {
    const auth = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const userId = auth.userId;
    const products = useSelector((state) => state.products);

    const calculateCost = useCallback((products) => {
        return products.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue.cost * currentValue.amount;
        }, 0);
    }, []);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await fetch(`${auth.url}my-orders`, {
                    method: "GET",
                    headers: {
                        UserId: +userId,
                    },
                });
                const data = await res.json();
                for (let i = 0; i < data.length; i++) {
                    data[i].Purchases.map((value) => {
                        for (let j = 0; j < products.length; j++) {
                            if (+value.ProductId === +products[j].id) {
                                value.cost = products[j].cost;
                                return value;
                            }
                        }
                        return value;
                    });
                }
                setOrders([...data]);
            } catch (e) {
                console.log(e);
            }
        };
        getOrders();
    }, [userId, auth.url, products]);

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
                        <span>
                            {order.Purchases[0] &&
                                `Cost: ${calculateCost(order.Purchases)} tugrics`}
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
