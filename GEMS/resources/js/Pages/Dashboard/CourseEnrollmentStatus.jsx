// export default function CourseEnrollmentStatus({ summary }) {
//     return (
//         <div className="bg-white p-4 rounded shadow">
//             <h4 className="text-lg font-semibold mb-2">Course Enrollment Status</h4>
//             <ul className="space-y-1">
//                 {Object.entries(summary.students_by_course_status).map(([status, count], idx) => (
//                     <li key={idx} className="flex justify-between">
//                         <span>{status}</span>
//                         <span className="font-medium">{count}</span>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }



import React from "react";

// Helper for status badge colors
const statusBadge = (status) => {
  let color = "bg-gray-100 text-gray-700";
  if (status.toLowerCase() === "active") color = "bg-green-100 text-green-700";
  else if (status.toLowerCase() === "inactive") color = "bg-yellow-100 text-yellow-700";
  else if (status.toLowerCase() === "blocked") color = "bg-red-100 text-red-700";
  else if (status.toLowerCase() === "completed") color = "bg-blue-100 text-blue-700";
  return (
    <span className={`inline-block px-3 py-0.5 rounded-full font-semibold text-xs capitalize ${color}`}>
      {status}
    </span>
  );
};

export default function CourseEnrollmentStatus({ summary }) {
  return (
    <section className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
      <h4 className="text-xl font-bold mb-4 text-gray-800">Course Enrollment Status</h4>
      <ul className="divide-y divide-gray-100">
        {Object.entries(summary.students_by_course_status).map(([status, count], idx) => (
          <li key={idx} className="flex justify-between items-center py-2">
            {statusBadge(status)}
            <span className="font-bold text-gray-700 text-base">{count}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
