// import React from 'react';

// const StudentPaymentHistory = ({ payments }) => {
//   return (
//     <div className="mt-6">
//       <h2 className="text-xl font-semibold mb-4">Payment History</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full text-sm text-left border border-gray-300">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2 border">Date</th>
//               <th className="px-4 py-2 border">Course</th>
//               <th className="px-4 py-2 border">Amount</th>
//               <th className="px-4 py-2 border">Method</th>
//               <th className="px-4 py-2 border">Type</th>
//               <th className="px-4 py-2 border">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {payments.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="px-4 py-2 text-center text-gray-500">
//                   No payments found.
//                 </td>
//               </tr>
//             ) : (
//               payments.map((payment) => (
//                 <tr key={payment.id}>
//                   <td className="px-4 py-2 border">
//                     {new Date(payment.created_at).toLocaleDateString()}
//                   </td>
//                   <td className="px-4 py-2 border">
//                     {payment.application?.course?.name || 'N/A'}
//                   </td>
//                   <td className="px-4 py-2 border">Rs. {payment.amount}</td>
//                   <td className="px-4 py-2 border">{payment.method}</td>
//                   <td className="px-4 py-2 border">{payment.type}</td>
//                   <td className="px-4 py-2 border">
//                     {payment.verified ? (
//                       <span className="text-green-600 font-semibold">Verified</span>
//                     ) : payment.rejected ? (
//                       <span className="text-red-600 font-semibold">Rejected</span>
//                     ) : (
//                       <span className="text-yellow-600 font-semibold">Pending</span>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default StudentPaymentHistory;



import React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import CancelIcon from '@mui/icons-material/Cancel';

const statusStyles = {
  verified: {
    color: "bg-green-100 text-green-800",
    icon: <CheckCircleIcon fontSize="small" className="text-green-500 mr-1" />,
    label: "Verified",
  },
  pending: {
    color: "bg-yellow-100 text-yellow-800",
    icon: <HourglassBottomIcon fontSize="small" className="text-yellow-500 mr-1" />,
    label: "Pending",
  },
  rejected: {
    color: "bg-red-100 text-red-800",
    icon: <CancelIcon fontSize="small" className="text-red-500 mr-1" />,
    label: "Rejected",
  },
};

const getStatus = (payment) => {
  if (payment.verified) return statusStyles.verified;
  if (payment.rejected) return statusStyles.rejected;
  return statusStyles.pending;
};

const StudentPaymentHistory = ({ payments }) => (
  <section className="max-w-7xl mx-auto mt-8 px-4">
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 font-semibold">Date</th>
              <th className="p-3 font-semibold">Course</th>
              <th className="p-3 font-semibold">Amount</th>
              <th className="p-3 font-semibold">Method</th>
              <th className="p-3 font-semibold">Type</th>
              <th className="p-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500 bg-gray-50">
                  No payments found.
                </td>
              </tr>
            ) : (
              payments.map((payment) => {
                const status = getStatus(payment);
                return (
                  <tr key={payment.id} className="border-b last:border-none">
                    <td className="p-3 align-middle">{new Date(payment.created_at).toLocaleDateString()}</td>
                    <td className="p-3 align-middle">{payment.application?.course?.name || 'N/A'}</td>
                    <td className="p-3 align-middle">Rs. {payment.amount}</td>
                    <td className="p-3 align-middle">{payment.method}</td>
                    <td className="p-3 align-middle capitalize">{payment.type}</td>
                    <td className="p-3 align-middle">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-semibold text-xs ${status.color}`}>
                        {status.icon}
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

export default StudentPaymentHistory;
