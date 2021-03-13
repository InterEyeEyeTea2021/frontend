import { paymentForm } from "../hooks/RequestPayment";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/Auth";

function RequestPayment() {
    const [isLoading, setIsLoading] = useState(false);
    let auth = useAuth();
    const { handleSubmit } = useForm();
    const currSME = {
        name: "SME NAME",
        contact: "XXXX XX XXXX"
    }

    const currOrder = "Order Name"

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
    const onSubmit = (data: paymentForm) => {
        console.log(data)
    }

    return (
        <div className="payments">
            <div>
                <h1>Payment</h1>
                <h1>SME</h1>
                <h1>Bell</h1>
            </div>
            <div>
                <h2>Order</h2>
                <h1>{currOrder}</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Reason</h2>
                    <input
                        name="reason"
                        placeholder="Reason"
                    />
                    <h2>Description</h2>
                    <input
                        name="description"
                        placeholder="Description"
                    />
                </form>

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
                            <button>Details</button>
                        </div> 
                    )
                )}
            </div>
        </div>
    )
}

export default RequestPayment