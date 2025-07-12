
// // File: PendingPaymentsTable.jsx

// import React, { useState } from "react";
// import { router } from "@inertiajs/react";

// export default function PendingPaymentsTable({ payments }) {
//     const [rejectingId, setRejectingId] = useState(null);
//     const [reason, setReason] = useState("");

//     const handleVerify = (id) => {
//         if (confirm("Verify this payment?")) {
//             router.post(`/admin/payments/${id}/verify`);
//         }
//     };

//     const handleReject = (id) => {
//         setRejectingId(id);
//     };

//     const submitRejection = () => {
//         if (!reason.trim()) return alert("Please provide a reason.");
//         router.post(`/admin/payments/${rejectingId}/reject`, { reason });
//         setRejectingId(null);
//         setReason("");
//     };

//     return (
//         <div>
//             <h2 className="text-xl font-semibold mb-3">Pending Payments</h2>
//             <table className="w-full table-auto border">
//                 <thead className="bg-gray-100">
//                     <tr>
//                         <th className="border p-2">Student</th>
//                         <th className="border p-2">Email</th>
//                         <th className="border p-2">Type</th>
//                         <th className="border p-2">Amount</th>
//                         <th className="border p-2">Method</th>
//                         <th className="border p-2">Receipt</th>
//                         <th className="border p-2">Action</th>
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
//                             <td className="border p-2 space-x-2">
//                                 <button
//                                     onClick={() => handleVerify(payment.id)}
//                                     className="bg-green-600 text-white px-3 py-1 rounded"
//                                 >
//                                     Verify
//                                 </button>
//                                 <button
//                                     onClick={() => handleReject(payment.id)}
//                                     className="bg-red-600 text-white px-3 py-1 rounded"
//                                 >
//                                     Reject
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {rejectingId && (
//                 <div className="mt-4 bg-gray-100 p-4 rounded shadow">
//                     <h3 className="font-semibold text-lg">Reject Payment</h3>
//                     <textarea
//                         value={reason}
//                         onChange={(e) => setReason(e.target.value)}
//                         className="w-full border rounded mt-2 p-2"
//                         placeholder="Enter reason for rejection..."
//                     />
//                     <div className="mt-2 space-x-2">
//                         <button
//                             onClick={submitRejection}
//                             className="bg-red-600 text-white px-4 py-1 rounded"
//                         >
//                             Submit
//                         </button>
//                         <button
//                             onClick={() => {
//                                 setRejectingId(null);
//                                 setReason("");
//                             }}
//                             className="bg-gray-500 text-white px-4 py-1 rounded"
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }


// import React, { useState } from "react";
// import { router } from "@inertiajs/react";

// export default function PendingPaymentsTable({ payments }) {
//   const [rejectingId, setRejectingId] = useState(null);
//   const [reason, setReason] = useState("");

//   const handleVerify = (id) => {
//     if (confirm("Verify this payment?")) {
//       router.post(`/admin/payments/${id}/verify`);
//     }
//   };

//   const handleReject = (id) => setRejectingId(id);

//   const submitRejection = () => {
//     if (!reason.trim()) return alert("Please provide a reason.");
//     router.post(`/admin/payments/${rejectingId}/reject`, { reason });
//     setRejectingId(null);
//     setReason("");
//   };

//   return (
//     <section className="max-w-7xl mx-auto mt-8 px-4">
//       <div className="bg-white shadow rounded-xl p-6">
//         <h2 className="text-2xl font-bold mb-4 text-gray-800">Pending Payments</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-base text-gray-700">
//             <thead>
//               <tr className="bg-gray-100 text-base">
//                 <th className="p-3 font-semibold">Student</th>
//                 <th className="p-3 font-semibold">Email</th>
//                 <th className="p-3 font-semibold">Type</th>
//                 <th className="p-3 font-semibold">Amount</th>
//                 <th className="p-3 font-semibold">Method</th>
//                 <th className="p-3 font-semibold">Receipt</th>
//                 <th className="p-3 font-semibold">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {payments.length === 0 ? (
//                 <tr>
//                   <td colSpan={7} className="p-6 text-center text-gray-500 bg-gray-50">
//                     No pending payments.
//                   </td>
//                 </tr>
//               ) : (
//                 payments.map((payment) => (
//                   <tr key={payment.id} className="border-b last:border-none text-base">
//                     <td className="p-3 align-middle">{payment.student.user.name}</td>
//                     <td className="p-3 align-middle">{payment.student.user.email}</td>
//                     <td className="p-3 align-middle capitalize">{payment.type}</td>
//                     <td className="p-3 align-middle">Rs. {payment.amount}</td>
//                     <td className="p-3 align-middle">{payment.method}</td>
//                     <td className="p-3 align-middle">
//                       {payment.receipt ? (
//                         <a
//                           href={`/storage/${payment.receipt}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded font-medium hover:bg-blue-100 transition"
//                         >
//                           View
//                         </a>
//                       ) : (
//                         <span className="text-gray-400">N/A</span>
//                       )}
//                     </td>
//                     <td className="p-3 align-middle space-x-2">
//                       <button
//                         onClick={() => handleVerify(payment.id)}
//                         className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded transition font-semibold"
//                       >
//                         Verify
//                       </button>
//                       <button
//                         onClick={() => handleReject(payment.id)}
//                         className="inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded transition font-semibold"
//                       >
//                         Reject
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {rejectingId && (
//           <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30">
//             <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-auto">
//               <h3 className="font-bold text-lg mb-2 text-red-700">Reject Payment</h3>
//               <textarea
//                 value={reason}
//                 onChange={(e) => setReason(e.target.value)}
//                 className="w-full border rounded mt-2 p-2 text-base"
//                 placeholder="Enter reason for rejection..."
//                 rows={3}
//                 autoFocus
//               />
//               <div className="mt-4 flex justify-end gap-2">
//                 <button
//                   onClick={submitRejection}
//                   className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded font-semibold transition"
//                 >
//                   Submit
//                 </button>
//                 <button
//                   onClick={() => {
//                     setRejectingId(null);
//                     setReason("");
//                   }}
//                   className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1.5 rounded font-semibold transition"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }



import React, { useState, useMemo } from "react";
import { router } from "@inertiajs/react";

const columns = [
  { key: "student", label: "Student", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "type", label: "Type", sortable: true },
  { key: "amount", label: "Amount", sortable: true },
  { key: "method", label: "Method", sortable: true },
  { key: "receipt", label: "Receipt", sortable: false },
  { key: "action", label: "Action", sortable: false },
];

export default function PendingPaymentsTable({
  payments,
  searchable = true,
  sortable = true,
}) {
  const [rejectingId, setRejectingId] = useState(null);
  const [reason, setReason] = useState("");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("student");
  const [sortDir, setSortDir] = useState("asc");

  // Prepare data for search/sort
  const preparedPayments = payments.map((p) => ({
    ...p,
    student: p.student.user.name,
    email: p.student.user.email,
    amount: parseFloat(p.amount),
  }));

  // Filter and sort
  const filteredPayments = useMemo(() => {
    let result = preparedPayments;
    if (searchable && search.trim()) {
      const s = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.student?.toLowerCase().includes(s) ||
          p.email?.toLowerCase().includes(s) ||
          p.type?.toLowerCase().includes(s) ||
          p.method?.toLowerCase().includes(s)
      );
    }
    if (sortable && sortKey) {
      result = [...result].sort((a, b) => {
        let aVal = a[sortKey];
        let bVal = b[sortKey];
        if (typeof aVal === "string") aVal = aVal.toLowerCase();
        if (typeof bVal === "string") bVal = bVal.toLowerCase();
        if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [preparedPayments, search, sortKey, sortDir, searchable, sortable]);

  const handleSort = (key) => {
    if (!sortable) return;
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const handleVerify = (id) => {
    if (confirm("Verify this payment?")) {
      router.post(`/admin/payments/${id}/verify`);
    }
  };

  const handleReject = (id) => setRejectingId(id);

  const submitRejection = () => {
    if (!reason.trim()) return alert("Please provide a reason.");
    router.post(`/admin/payments/${rejectingId}/reject`, { reason });
    setRejectingId(null);
    setReason("");
  };

  return (
    <section className="max-w-7xl mx-auto mt-8 px-4">
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Pending Payments</h2>
        {searchable && (
          <div className="mb-4 flex justify-end">
            <input
              type="text"
              placeholder="Search by student, email, type, or method"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded px-3 py-2 text-sm w-full max-w-xs"
            />
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full text-base text-gray-700">
            <thead>
              <tr className="bg-gray-100 text-base">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`p-3 font-semibold ${sortable && col.sortable ? "cursor-pointer select-none" : ""}`}
                    onClick={() => col.sortable && handleSort(col.key)}
                  >
                    {col.label}
                    {sortable && col.sortable && sortKey === col.key && (
                      <span>{sortDir === "asc" ? " ▲" : " ▼"}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="p-6 text-center text-gray-500 bg-gray-50">
                    No pending payments.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b last:border-none text-base">
                    <td className="p-3 align-middle">{payment.student}</td>
                    <td className="p-3 align-middle">{payment.email}</td>
                    <td className="p-3 align-middle capitalize">{payment.type}</td>
                    <td className="p-3 align-middle">Rs. {Number(payment.amount).toLocaleString()}</td>
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
                    <td className="p-3 align-middle space-x-2">
                      <button
                        onClick={() => handleVerify(payment.id)}
                        className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded transition font-semibold"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() => handleReject(payment.id)}
                        className="inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded transition font-semibold"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Reject Modal */}
        {rejectingId && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-auto">
              <h3 className="font-bold text-lg mb-2 text-red-700">Reject Payment</h3>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full border rounded mt-2 p-2 text-base"
                placeholder="Enter reason for rejection..."
                rows={3}
                autoFocus
              />
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={submitRejection}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded font-semibold transition"
                >
                  Submit
                </button>
                <button
                  onClick={() => {
                    setRejectingId(null);
                    setReason("");
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1.5 rounded font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
