import React from 'react';

export default function MyApplications({ applications }) {
    return (
        <div className="bg-white p-6 rounded shadow mt-8">
            <h2 className="text-lg font-semibold mb-4">My Course Applications</h2>
            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">Course</th>
                        <th className="p-2 border">Payment Type</th>
                        <th className="p-2 border">Amount Paid</th>
                        <th className="p-2 border">Full Amount</th>
                        <th className="p-2 border">Due Date</th>
                        <th className="p-2 border">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((app) => (
                        <tr key={app.id}>
                            <td className="p-2 border">{app.course.name}</td>
                            <td className="p-2 border capitalize">{app.payment_type}</td>
                            <td className="p-2 border">Rs. {app.amount_paid}</td>
                            <td className="p-2 border">Rs. {app.full_amount}</td>
                            <td className="p-2 border">{app.next_payment_due_date ?? 'N/A'}</td>
                            <td className="p-2 border capitalize">{app.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
