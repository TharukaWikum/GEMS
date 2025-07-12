// import React from "react";

// export default function AllPaymentsTable({ payments }) {
//     if (!payments.length) {
//         return <p className="text-sm text-gray-500">No payments available.</p>;
//     }

//     return (
//         <div className="mt-6">
//             <h3 className="text-lg font-semibold mb-2">All Payments</h3>
//             <table className="w-full text-sm table-auto border">
//                 <thead className="bg-gray-100">
//                     <tr>
//                         <th className="p-2 border">Type</th>
//                         <th className="p-2 border">Amount</th>
//                         <th className="p-2 border">Method</th>
//                         <th className="p-2 border">Status</th>
//                         <th className="p-2 border">Date</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {payments.map((pay) => (
//                         <tr key={pay.id}>
//                             <td className="p-2 border">{pay.type}</td>
//                             <td className="p-2 border">Rs. {pay.amount}</td>
//                             <td className="p-2 border">{pay.method}</td>
//                             <td className="p-2 border">
//                                 {pay.verified ? "Verified" : pay.rejected ? "Rejected" : "Pending"}
//                             </td>
//                             <td className="p-2 border">{pay.created_at}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }


import React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

const statusBadge = (pay) => {
  if (pay.verified) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold text-xs">
        <CheckCircleIcon fontSize="inherit" className="text-green-500" />
        Verified
      </span>
    );
  }
  if (pay.rejected) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-semibold text-xs">
        <CancelIcon fontSize="inherit" className="text-red-500" />
        Rejected
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-semibold text-xs">
      <HourglassBottomIcon fontSize="inherit" className="text-yellow-500" />
      Pending
    </span>
  );
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) return "-";
  return date.toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function AllPaymentsTable({ payments }) {
  if (!payments.length) {
    return (
      <div className="max-w-7xl mx-auto mt-8 px-4">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <p className="text-base text-gray-500">No payments available.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto mt-8 px-4">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">All Payments</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-100 text-base">
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Amount</th>
                <th className="p-3 font-semibold">Method</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pay) => (
                <tr key={pay.id} className="border-b last:border-none">
                  <td className="p-3 align-middle capitalize">{pay.type}</td>
                  <td className="p-3 align-middle">Rs. {pay.amount}</td>
                  <td className="p-3 align-middle capitalize">{pay.method}</td>
                  <td className="p-3 align-middle">{statusBadge(pay)}</td>
                  <td className="p-3 align-middle whitespace-nowrap">{formatDate(pay.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
