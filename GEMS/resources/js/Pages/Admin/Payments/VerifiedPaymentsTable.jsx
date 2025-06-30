// File: VerifiedPaymentsTable.jsx

import React from "react";

export default function VerifiedPaymentsTable({ payments }) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-3">Verified Payments</h2>
            <table className="w-full table-auto border">
                <thead className="bg-green-100">
                    <tr>
                        <th className="border p-2">Student</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Type</th>
                        <th className="border p-2">Amount</th>
                        <th className="border p-2">Method</th>
                        <th className="border p-2">Receipt</th>
                        <th className="border p-2">Verified At</th>
                        <th className="border p-2">Verified By</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment.id}>
                            <td className="border p-2">{payment.student.user.name}</td>
                            <td className="border p-2">{payment.student.user.email}</td>
                            <td className="border p-2 capitalize">{payment.type}</td>
                            <td className="border p-2">{payment.amount}</td>
                            <td className="border p-2">{payment.method}</td>
                            <td className="border p-2">
                                {payment.receipt ? (
                                    <a
                                        href={`/storage/${payment.receipt}`}
                                        target="_blank"
                                        className="text-blue-500 underline"
                                    >
                                        View
                                    </a>
                                ) : "N/A"}
                            </td>
                            <td className="border p-2">{payment.verified_at}</td>
                            <td className="border p-2">{payment.verifier?.name ?? 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
