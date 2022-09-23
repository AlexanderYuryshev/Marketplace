import { React, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "../context/AuthContext.js";

export const OrdersPage = () => {
    const auth = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const userId = auth.userId;
    const products = useSelector((state) => state.products);

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
                        <h3>Order Date: {order.orderDate}</h3>
                        {order.Purchases[0] &&<span>
                                Cost: {order.cost}&#8381;
                        </span>}
                        <span>Status: {order.status}</span>
                        <span>Delivery Date: {order.deliveryDate}</span>
                        <span>Delivery Address: {order.deliveryAddress}</span>
                    </div>
                ))}
            </div>
        </>
    );
};
