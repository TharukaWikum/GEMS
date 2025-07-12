// import React from "react";

// export default function CourseApplicationStatusTable({ applications }) {
//     if (!applications.length) {
//         return <p className="text-sm text-gray-500">No applications found.</p>;
//     }

//     return (
//         <div className="mt-6">
//             <h3 className="text-lg font-semibold mb-2">Course Applications & Payments</h3>
//             <table className="w-full table-auto text-sm border">
//                 <thead className="bg-gray-100">
//                     <tr>
//                         <th className="p-2 border">Course</th>
//                         <th className="p-2 border">Payment Type</th>
//                         <th className="p-2 border">Amount Paid</th>
//                         <th className="p-2 border">Status</th>
//                         <th className="p-2 border">Next Due</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {applications.map((app) => (
//                         <tr key={app.id}>
//                             <td className="p-2 border">{app.course?.name}</td>
//                             <td className="p-2 border capitalize">{app.payment_type}</td>
//                             <td className="p-2 border">Rs. {app.amount_paid}</td>
//                             <td className="p-2 border capitalize">{app.status}</td>
//                             <td className="p-2 border">{app.next_payment_due_date || "N/A"}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }


import React from "react";

// Helper for status badge colors
const statusBadge = (status) => {
  let color = "bg-gray-100 text-gray-700";
  if (status === "registered") color = "bg-green-100 text-green-700";
  else if (status === "pending") color = "bg-yellow-100 text-yellow-700";
  else if (status === "cancelled") color = "bg-red-100 text-red-700";
  else if (status === "completed") color = "bg-blue-100 text-blue-700";
  return (
    <span className={`inline-block px-3 py-0.5 rounded-full font-semibold text-xs capitalize ${color}`}>
      {status}
    </span>
  );
};

export default function CourseApplicationStatusTable({ applications }) {
  if (!applications.length) {
    return (
      <div className="max-w-7xl mx-auto mt-8 px-4">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <p className="text-base text-gray-500">No applications found.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto mt-8 px-4">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">
          Course Applications & Payments
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-100 text-base">
                <th className="p-3 font-semibold">Course</th>
                <th className="p-3 font-semibold">Payment Type</th>
                <th className="p-3 font-semibold">Amount Paid</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold">Next Due</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-b last:border-none">
                  <td className="p-3 align-middle">{app.course?.name}</td>
                  <td className="p-3 align-middle capitalize">{app.payment_type}</td>
                  <td className="p-3 align-middle">Rs. {app.amount_paid}</td>
                  <td className="p-3 align-middle">{statusBadge(app.status)}</td>
                  <td className="p-3 align-middle">{app.next_payment_due_date || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
