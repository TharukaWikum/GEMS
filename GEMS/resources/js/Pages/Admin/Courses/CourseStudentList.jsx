// export default function CourseStudentList({ students }) {
//     return (
//         <div className="mt-8 bg-white p-4 shadow rounded">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Enrolled Students</h3>
//             <table className="min-w-full border border-gray-200 text-sm">
//                 <thead className="bg-gray-100">
//                     <tr>
//                         <th className="border px-4 py-2">Name</th>
//                         <th className="border px-4 py-2">Email</th>
//                         <th className="border px-4 py-2">Status</th>
//                         <th className="border px-4 py-2">Start Date</th>
//                         <th className="border px-4 py-2">End Date</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {students.length > 0 ? (
//                         students.map((student, idx) => (
//                             <tr key={idx} className="text-center">
//                                 <td className="border px-4 py-2">{student.name}</td>
//                                 <td className="border px-4 py-2">{student.email}</td>
//                                 <td className="border px-4 py-2">{student.status}</td>
//                                 <td className="border px-4 py-2">{student.start_date}</td>
//                                 <td className="border px-4 py-2">{student.end_date}</td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="5" className="text-center py-4">No students enrolled yet.</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// }



import React from "react";

// Helper for status badge colors
const statusBadge = (status) => {
  let color = "bg-gray-100 text-gray-700";
  if (status === "active") color = "bg-green-100 text-green-700";
  else if (status === "inactive") color = "bg-yellow-100 text-yellow-700";
  else if (status === "blocked") color = "bg-red-100 text-red-700";
  else if (status === "completed") color = "bg-blue-100 text-blue-700";
  return (
    <span className={`inline-block px-3 py-0.5 rounded-full font-semibold text-xs capitalize ${color}`}>
      {status}
    </span>
  );
};

export default function CourseStudentList({ students }) {
  return (
    <section className="max-w-7xl mx-auto mt-8 px-4">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Enrolled Students</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-100 text-base">
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Email</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold">Start Date</th>
                <th className="p-3 font-semibold">End Date</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student, idx) => (
                  <tr key={idx} className="border-b last:border-none text-center">
                    <td className="p-3 align-middle">{student.name}</td>
                    <td className="p-3 align-middle">{student.email}</td>
                    <td className="p-3 align-middle">{statusBadge(student.status)}</td>
                    <td className="p-3 align-middle">{student.start_date}</td>
                    <td className="p-3 align-middle">{student.end_date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-500 bg-gray-50">
                    No students enrolled yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

