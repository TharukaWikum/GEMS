// // File: VerifiedPaymentsTable.jsx

// import React from "react";

// export default function VerifiedPaymentsTable({ payments }) {
//     // console.log("first",payments)
//     return (
//         <div>
//             <h2 className="text-xl font-semibold mb-3">Verified Payments</h2>
//             <table className="w-full table-auto border">
//                 <thead className="bg-green-100">
//                     <tr>
//                         <th className="border p-2">Student</th>
//                         <th className="border p-2">Email</th>
//                         <th className="border p-2">Type</th>
//                         <th className="border p-2">Amount</th>
//                         <th className="border p-2">Method</th>
//                         <th className="border p-2">Receipt</th>
//                         <th className="border p-2">Verified At</th>
//                         <th className="border p-2">Verified By</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {payments.map((payment) => (
//                         <tr key={payment.id}>
//                             <td className="border p-2">{payment.student.user.name}</td>
//                             <td className="border p-2">{payment.student.user.email}</td>
//                             <td className="border p-2 capitalize">{payment.type}</td>
//                             <td className="border p-2">{payment.amount}</td>
//                             <td className="border p-2">{payment.method}</td>
//                             <td className="border p-2">
//                                 {payment.receipt ? (
//                                     <a
//                                         href={`/storage/${payment.receipt}`}
//                                         target="_blank"
//                                         className="text-blue-500 underline"
//                                     >
//                                         View
//                                     </a>
//                                 ) : "N/A"}
//                             </td>
//                             <td className="border p-2">{payment.verified_at}</td>
//                             <td className="border p-2">{payment.verifier?.name ?? 'N/A'}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }




import React from "react";

export default function VerifiedPaymentsTable({ payments }) {
  return (
    <section className="max-w-7xl mx-auto mt-8 px-4">
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Verified Payments</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-basetext-gray-700">
            <thead>
              <tr className="bg-green-100 text-base">
                <th className="p-3 font-semibold">Student</th>
                <th className="p-3 font-semibold">Email</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Amount</th>
                <th className="p-3 font-semibold">Method</th>
                <th className="p-3 font-semibold">Receipt</th>
                <th className="p-3 font-semibold">Verified At</th>
                <th className="p-3 font-semibold">Verified By</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-gray-500 bg-green-50">
                    No verified payments.
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment.id} className="border-b last:border-none align-top">
                    <td className="p-3 align-middle">{payment.student.user.name}</td>
                    <td className="p-3 align-middle">{payment.student.user.email}</td>
                    <td className="p-3 align-middle capitalize">{payment.type}</td>
                    <td className="p-3 align-middle">Rs. {payment.amount}</td>
                    <td className="p-3 align-middle">{payment.method}</td>
                    <td className="p-3 align-middle">
                      {payment.receipt ? (
                        <a
                          href={`/storage/${payment.receipt}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded font-medium hover:bg-blue-100 transition"
                        >
                          View
                        </a>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="p-3 align-middle whitespace-nowrap">
                      {payment.verified_at
                        ? new Date(payment.verified_at).toLocaleString()
                        : "N/A"}
                    </td>
                    <td className="p-3 align-middle capitalize">
                      {payment.verifier?.name ?? 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
