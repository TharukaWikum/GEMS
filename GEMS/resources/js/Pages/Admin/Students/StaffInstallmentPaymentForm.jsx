import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";

export default function StaffInstallmentPaymentForm({ studentId, application }) {
    const [method, setMethod] = useState("Handover");
    const [receipt, setReceipt] = useState(null);
    const [errors, setErrors] = useState({});
    const [amount, setAmount] = useState("");

    useEffect(() => {
        if (application && application.course?.duration) {
            const duration = application.course.duration;
            const match = duration.match(/(\d+)/);
            const months = match ? parseInt(match[1]) : 1;
            const expected = (application.full_amount / months).toFixed(2);
            setAmount(expected);
        }
    }, [application]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("application_id", application.id);
        formData.append("amount", amount);
        formData.append("payment_method", method);
        if (receipt) formData.append("receipt", receipt);

        router.post(`/admin/students/${studentId}/installment-payment`, formData, {
            forceFormData: true,
            onError: (err) => setErrors(err),
            onSuccess: () => {
                alert("Installment submitted successfully!");
                setReceipt(null);
                setErrors({});
            },
        });
    };

    return (
        <div className="mt-6 bg-gray-50 p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Pay Installment</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Amount (Fixed)</label>
                    <input
                        type="number"
                        className="border p-2 rounded w-full bg-gray-100"
                        value={amount}
                        disabled
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Payment Method</label>
                    <select
                        className="border p-2 rounded w-full"
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                    >
                        <option value="Handover">Handover</option>
                        <option value="Online Transfer">Online Transfer</option>
                        <option value="Bank Payment">Bank Payment</option>
                    </select>
                </div>

                {method !== "Handover" && (
                    <div>
                        <label className="block text-sm font-medium">Upload Receipt</label>
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.pdf"
                            className="border p-2 rounded w-full"
                            onChange={(e) => setReceipt(e.target.files[0])}
                        />
                        {errors.receipt && (
                            <p className="text-red-600 text-sm">{errors.receipt}</p>
                        )}
                    </div>
                )}

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Submit Installment
                </button>
            </form>
        </div>
    );
}
