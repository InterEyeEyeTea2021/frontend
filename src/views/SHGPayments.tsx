import { useAuth, loginForm } from "../hooks/Auth";
import React, { useState } from "react";

function SHGPayments() {
    const [isLoading, setIsLoading] = useState(false);
    let auth = useAuth();

    const currSME = {
        name: "SME NAME",
        contact: "XXXX XX XXXX"
    }

    const currPayment = {
        amount: 2000,
        name: "Machinery",
        status: "pending",
    }

    const paymentsList = [
        {
            amount: 2000,
            name: "Machinery",
            status: "pending",
        },
        {
            amount: 5000,
            name: "Machinery",
            status: "paid",
        },
        {
            amount: 2000,
            name: "Machinery",
            status: "paid",
        },
    ]

    return (
        <div className="payments">
            <div>
                <h1>Payment</h1>
                <h1>SME</h1>
                <h1>Bell</h1>
            </div>
            <div>
                <h2>{currPayment.name}</h2>
                <h1>{currPayment.status[0].toUpperCase() + currPayment.status.slice(1)}</h1>
            </div>
            <h1>₹{currPayment.amount}</h1>
            <div>
                <h1>Order</h1>
                <h1>Order Name</h1>
            </div>
            <h1>SME</h1>
            <div>
                <h1>Box</h1>
                <div>
                    <h1>{currSME.name}</h1>
                    <h2>{currSME.contact}</h2>
                </div>
                <h1>Call icon</h1>
            </div>
            <div>
                <button>Get Bill</button>
            </div>
            <div>
                <h1>All payments</h1>
                {paymentsList.map(p => (
                        <div>
                            <h1>₹{p.amount}</h1>
                            <div>
                                <h1>{p.name}</h1>
                                <h2>{p.status[0].toUpperCase() + p.status.slice(1)}</h2>
                            </div>
                            <button>{(p.status == "pending") ? "Pay": "Details"}</button>
                        </div> 
                    )
                )}
            </div>
        </div>
    )
}

export default SHGPayments