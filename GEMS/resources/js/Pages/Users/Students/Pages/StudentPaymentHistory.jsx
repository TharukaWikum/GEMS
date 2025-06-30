import React from 'react';

const StudentPaymentHistory = ({ payments }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Course</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Method</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-2 text-center text-gray-500">
                  No payments found.
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-4 py-2 border">
                    {new Date(payment.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border">
                    {payment.application?.course?.name || 'N/A'}
                  </td>
                  <td className="px-4 py-2 border">Rs. {payment.amount}</td>
                  <td className="px-4 py-2 border">{payment.method}</td>
                  <td className="px-4 py-2 border">{payment.type}</td>
                  <td className="px-4 py-2 border">
                    {payment.verified ? (
                      <span className="text-green-600 font-semibold">Verified</span>
                    ) : payment.rejected ? (
                      <span className="text-red-600 font-semibold">Rejected</span>
                    ) : (
                      <span className="text-yellow-600 font-semibold">Pending</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentPaymentHistory;
