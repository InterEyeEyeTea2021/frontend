import { useAuth, loginForm } from "../hooks/Auth";
import React, { useState } from "react";

function Payments() {
    const [isLoading, setIsLoading] = useState(false);
    let auth = useAuth();

    return (
        <div className="payments">
            <div>
                <h1>Payment</h1>
                <h1>SME</h1>
                <h1>Bell</h1>
            </div>
            <div>
                <h2>Machinery</h2>
                <h1>Pending</h1>
            </div>
            <h1>₹2000</h1>
            <div>
                <h1>Order</h1>
                <h1>Order Name</h1>
            </div>
            <h1>SHG</h1>
            <div>
                <h1>Box</h1>
                <div>
                    <h1>SHG NAME</h1>
                    <h2>XXXX XX XXXX</h2>
                </div>
                <h1>Call icon</h1>
            </div>
            <div>
                <button>Get Bill</button>
            </div>
            <div>
                <h1>All payments</h1>
                <div>
                    <h1></h1>
                    <div>
                        <h1>Machinery</h1>
                        <h2>Pending</h2>
                    </div>
                    <button>Pay</button>
                </div>
                <div>
                    <h1>₹2000</h1>
                    <div>
                        <h1>Machinery</h1>
                        <h2>Pending</h2>
                    </div>
                    <button>Pay</button>
                </div>
                <div>
                    <h1>₹2000</h1>
                    <div>
                        <h1>Machinery</h1>
                        <h2>Pending</h2>
                    </div>
                    <button>Pay</button>
                </div>
            </div>
        </div>
    )
}

export default Payments