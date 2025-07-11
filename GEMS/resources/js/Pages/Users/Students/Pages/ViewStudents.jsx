// import { router } from "@inertiajs/react";
// import { useState } from "react";
// import { Link } from "@inertiajs/react";

// export default function ViewStudents({ students }) {
//     console.log("students", students);
//     return (
//         <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
//             <div className="text-2xl font-semibold m-2 mb-3">Student List</div>
//             <table className="min-w-full bg-white border border-gray-200">
//                 <thead>
//                     <tr className="bg-gray-100 text-sm">
//                         <th className="border px-4 py-2">Name</th>
//                         <th className="border px-4 py-2">Email</th>
//                         <th className="border px-4 py-2">Account Status</th>
//                         <th className="border px-4 py-2">Student Status</th>
//                         <th className="border px-4 py-2">Course</th>
//                         <th className="border px-4 py-2">Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {students.length > 0 ? (
//                         students.map((student, index) => (
//                             <tr key={index} className="text-center text-sm">
//                                 <td className="border px-4 py-2">
//                                     {student.name}
//                                 </td>
//                                 <td className="border px-4 py-2">
//                                     {student.email}
//                                 </td>
//                                 {/* <td className="border px-4 py-2">
//                                     {student.status}
//                                 </td> */}
//                                 <td className="border px-4 py-2">
//                                     <form
//                                         onChange={(e) => {
//                                             router.post(
//                                                 route(
//                                                     "admin.students.updateStatus",
//                                                     { id: student.id }
//                                                 ),
//                                                 { status: e.target.value },
//                                                 {
//                                                     preserveScroll: true,
//                                                     only: ["students"],
//                                                 }
//                                             );
//                                         }}
//                                     >
//                                         <select
//                                             defaultValue={student.status}
//                                             className="border rounded px-2 py-1 text-sm"
//                                         >
//                                             <option value="active">
//                                                 Active
//                                             </option>
//                                             <option value="inactive">
//                                                 Inactive
//                                             </option>
//                                             <option value="blocked">
//                                                 Blocked
//                                             </option>
//                                         </select>
//                                     </form>
//                                 </td>

//                                 <td className="border px-4 py-2">
//                                     {student.student_status}
//                                 </td>
//                                 <td className="border px-4 py-2">
//                                     {student.preferred_course}
//                                 </td>
//                                 <td className="border px-4 py-2">
//                                     <button
//                                         onClick={() =>
//                                             router.visit(
//                                                 route(
//                                                     "admin.students.profile",
//                                                     { id: student.id }
//                                                 )
//                                             )
//                                         }
//                                         className="text-blue-600 hover:underline"
//                                     >
//                                         View Profile
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="6" className="text-center py-4">
//                                 No students found.
//                             </td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";

// Helper for status color classes
const statusColor = (status) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-700";
    case "inactive":
      return "bg-yellow-100 text-yellow-700";
    case "blocked":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function ViewStudents({ students, success }) {
  const [ack, setAck] = useState(success);

  // Auto-dismiss success message after 3 seconds
  useEffect(() => {
    if (ack) {
      const timer = setTimeout(() => setAck(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [ack]);

  return (
    <section className="max-w-7xl mx-auto mt-8 px-4">
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Student List</h2>
        {ack && (
          <div className="mb-4 px-4 py-2 rounded border border-green-300 bg-green-50 text-green-800 font-medium text-base shadow-sm transition">
            {ack}
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-100 text-base">
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Email</th>
                <th className="p-3 font-semibold">Account Status</th>
                <th className="p-3 font-semibold">Student Status</th>
                <th className="p-3 font-semibold">Course</th>
                <th className="p-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <tr key={student.id} className="border-b last:border-none">
                    <td className="p-3 align-middle">{student.name}</td>
                    <td className="p-3 align-middle">{student.email}</td>
                    <td className="p-3 align-middle">
                      <form
                        onChange={e => {
                          router.post(
                            route("admin.students.updateStatus", { id: student.id }),
                            { status: e.target.value },
                            {
                              preserveScroll: true,
                              only: ["students"],
                              onSuccess: () => setAck("User status updated successfully."),
                            }
                          );
                        }}
                      >
                        <div className="relative ">
                          <select
                            defaultValue={student.status}
                            className={`
                              border border-gray-300 rounded px-3 py-1 text-sm font-medium pr-8
                              focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition
                              appearance-none
                              ${statusColor(student.status)}
                            `}
                            style={{ minWidth: 110 }}
                          >
                            <option value="active" className="text-green-700 bg-green-50">Active</option>
                            <option value="inactive" className="text-yellow-700 bg-yellow-50">Inactive</option>
                            <option value="blocked" className="text-red-700 bg-red-50">Blocked</option>
                          </select>
                          {/* Dropdown icon */}
                          
                        </div>
                        
                      </form>
                    </td>
                    <td className="p-3 align-middle">{student.student_status}</td>
                    <td className="p-3 align-middle">{student.preferred_course}</td>
                    <td className="p-3 align-middle">
                      <button
                        onClick={() =>
                          router.visit(route("admin.students.profile", { id: student.id }))
                        }
                        className="text-blue-600 hover:underline font-medium"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-500 bg-gray-50">
                    No students found.
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
