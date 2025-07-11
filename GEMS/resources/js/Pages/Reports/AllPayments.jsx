import React from 'react';
import { Head } from '@inertiajs/react';

export default function AllPayments({ payments }) {
    console.log("payments",payments)
  return (
    <>
      <Head title="All Payments" />
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Complete Payment Report</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100 text-sm font-semibold">
              <tr>
                <th className="px-4 py-2 border">Student</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Amount</th>
                <th className="px-4 py-2 border">Method</th>
                <th className="px-4 py-2 border">Verified</th>
                <th className="px-4 py-2 border">Verified By</th>
                <th className="px-4 py-2 border">Verified At</th>
                <th className="px-4 py-2 border">Rejected</th>
                <th className="px-4 py-2 border">Rejected By</th>
                <th className="px-4 py-2 border">Rejection Reason</th>
                <th className="px-4 py-2 border">Course</th>
                <th className="px-4 py-2 border">Receipt</th>
                <th className="px-4 py-2 border">Created At</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {payments.map((p, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-2 border">{p.student_name}</td>
                  <td className="px-4 py-2 border">{p.email}</td>
                  <td className="px-4 py-2 border">{p.type}</td>
                  <td className="px-4 py-2 border">Rs. {parseFloat(p.amount).toFixed(2)}</td>
                  <td className="px-4 py-2 border">{p.method}</td>
                  <td className="px-4 py-2 border">{p.verified}</td>
                  <td className="px-4 py-2 border">{p.verified_by}</td>
                  <td className="px-4 py-2 border">{p.verified_at}</td>
                  <td className="px-4 py-2 border">{p.rejected}</td>
                  <td className="px-4 py-2 border">{p.rejected_by}</td>
                  <td className="px-4 py-2 border">{p.rejection_reason}</td>
                  <td className="px-4 py-2 border">{p.course}</td>
                  <td className="px-4 py-2 border">{p.receipt ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-2 border">{p.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
