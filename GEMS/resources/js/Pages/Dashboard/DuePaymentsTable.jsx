import React from "react";

export default function DuePaymentsTable({ duePayments }) {
    return (
        <div className="bg-white p-4 rounded shadow mb-6">
            <h4 className="text-lg font-semibold mb-4">Overdue Payments</h4>
            {duePayments.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border">
                        <thead className="bg-gray-100 text-xs uppercase">
                            <tr>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Amount</th>
                                <th className="px-4 py-2">Due Date</th>
                                <th className="px-4 py-2">Type</th>
                                <th className="px-4 py-2">Method</th>
                            </tr>
                        </thead>
                        <tbody>
                            {duePayments.map((payment, i) => (
                                <tr key={i} className="border-t">
                                    <td className="px-4 py-2">{payment.student_name}</td>
                                    <td className="px-4 py-2">{payment.email}</td>
                                    <td className="px-4 py-2 text-red-700 font-medium">Rs. {payment.amount}</td>
                                    <td className="px-4 py-2">{payment.due_date}</td>
                                    <td className="px-4 py-2">{payment.payment_type}</td>
                                    <td className="px-4 py-2">{payment.payment_method}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-sm text-gray-500 italic">No overdue payments.</p>
            )}
        </div>
    );
}
