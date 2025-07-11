// import React from "react";
// import ResubmitCoursePaymentForm from "./ResubmitCoursePaymentForm"; // 🔁 import this component

// export default function MyApplications({ applications }) {
//     const pendingApps = applications.filter((app) => app.status === "pending");
//     const registeredApps = applications.filter(
//         (app) => app.status === "registered"
//     );
//     const completedApps = applications.filter(
//         (app) => app.status === "completed"
//     );

//     return (
//         <div className="bg-white p-6 rounded shadow mt-8">
//             <h2 className="text-lg font-semibold mb-4">
//                 My Course Applications
//             </h2>
//             <table className="w-full border mb-6">
//                 <thead>
//                     <tr className="bg-gray-100">
//                         <th className="p-2 border">Course</th>
//                         <th className="p-2 border">Payment Type</th>
//                         <th className="p-2 border">Amount Paid</th>
//                         <th className="p-2 border">Full Amount</th>
//                         <th className="p-2 border">Due Date</th>
//                         <th className="p-2 border">Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {applications.map((app) => (
//                         <React.Fragment key={app.id}>
//                             <tr>
//                                 <td className="p-2 border">
//                                     {app.course.name}
//                                 </td>
//                                 <td className="p-2 border capitalize">
//                                     {app.payment_type}
//                                 </td>
//                                 <td className="p-2 border">
//                                     Rs. {app.amount_paid}
//                                 </td>
//                                 <td className="p-2 border">
//                                     Rs. {app.full_amount}
//                                 </td>
//                                 <td className="p-2 border">
//                                     {app.next_payment_due_date ?? "N/A"}
//                                 </td>
//                                 <td className="p-2 border capitalize">
//                                     <span
//                                         className={`px-2 py-1 rounded text-white text-xs ${
//                                             app.status === "registered"
//                                                 ? "bg-green-500"
//                                                 : app.status === "pending"
//                                                 ? "bg-yellow-500"
//                                                 : app.status === "cancelled"
//                                                 ? "bg-red-500"
//                                                 : "bg-gray-500"
//                                         }`}
//                                     >
//                                         {app.status}
//                                     </span>
//                                 </td>
//                             </tr>

//                             {/* ✅ Conditional row for resubmitting initial payment */}
//                             {app.status === "cancelled" &&
//                                 app.payments?.some(
//                                     (p) =>
//                                         p.type === "course" &&
//                                         p.rejected &&
//                                         !p.verified
//                                 ) &&
//                                 !app.payments?.some(
//                                     (p) =>
//                                         p.type === "course" &&
//                                         !p.rejected &&
//                                         !p.verified
//                                 ) && (
//                                     <tr>
//                                         <td
//                                             colSpan="6"
//                                             className="p-4 bg-red-50 border text-center"
//                                         >
//                                             <p className="text-red-600 font-medium mb-2">
//                                                 Your initial course payment was
//                                                 rejected.
//                                             </p>
//                                             <ResubmitCoursePaymentForm
//                                                 application={app}
//                                             />
//                                         </td>
//                                     </tr>
//                                 )}
//                         </React.Fragment>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }


import React from "react";
import ResubmitCoursePaymentForm from "./ResubmitCoursePaymentForm";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const statusStyles = {
  registered: {
    color: "bg-green-100 text-green-800",
    icon: <CheckCircleIcon fontSize="small" className="text-green-500 mr-1" />,
    label: "Registered",
  },
  pending: {
    color: "bg-yellow-100 text-yellow-800",
    icon: <HourglassBottomIcon fontSize="small" className="text-yellow-500 mr-1" />,
    label: "Pending",
  },
  cancelled: {
    color: "bg-red-100 text-red-800",
    icon: <CancelIcon fontSize="small" className="text-red-500 mr-1" />,
    label: "Cancelled",
  },
  completed: {
    color: "bg-blue-100 text-blue-800",
    icon: <DoneAllIcon fontSize="small" className="text-blue-500 mr-1" />,
    label: "Completed",
  },
};

export default function MyApplications({ applications }) {
  return (
    <section className="max-w-7xl mx-auto mt-8 px-4">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">My Course Applications</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 font-semibold">Course</th>
                <th className="p-3 font-semibold">Payment Type</th>
                <th className="p-3 font-semibold">Amount Paid</th>
                <th className="p-3 font-semibold">Full Amount</th>
                <th className="p-3 font-semibold">Due Date</th>
                <th className="p-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => {
                const status = statusStyles[app.status] || {
                  color: "bg-gray-100 text-gray-700",
                  icon: null,
                  label: app.status,
                };
                return (
                  <React.Fragment key={app.id}>
                    <tr className="border-b last:border-none">
                      <td className="p-3 align-middle">{app.course.name}</td>
                      <td className="p-3 capitalize align-middle">{app.payment_type}</td>
                      <td className="p-3 align-middle">Rs. {app.amount_paid}</td>
                      <td className="p-3 align-middle">Rs. {app.full_amount}</td>
                      <td className="p-3 align-middle">{app.next_payment_due_date ?? "N/A"}</td>
                      <td className="p-3 align-middle">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-semibold text-xs ${status.color}`}>
                          {status.icon}
                          {status.label}
                        </span>
                      </td>
                    </tr>
                    {/* Conditional row for rejected initial payment */}
                    {app.status === "cancelled" &&
                      app.payments?.some(
                        (p) => p.type === "course" && p.rejected && !p.verified
                      ) &&
                      !app.payments?.some(
                        (p) => p.type === "course" && !p.rejected && !p.verified
                      ) && (
                        <tr>
                          <td colSpan="6" className="p-4 bg-red-50 border-b text-center">
                            <p className="text-red-600 font-medium mb-2">
                              Your initial course payment was rejected.
                            </p>
                            <ResubmitCoursePaymentForm application={app} />
                          </td>
                        </tr>
                      )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
