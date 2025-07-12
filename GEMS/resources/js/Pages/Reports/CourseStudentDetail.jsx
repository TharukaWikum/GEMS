// import React from 'react';
// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Head, Link, usePage } from '@inertiajs/react';

// export default function CourseStudentDetail() {
//     const { course_name, students } = usePage().props;

//     return (
//         <AuthenticatedLayout
//             header={<h2 className="text-xl font-bold">Students in {course_name}</h2>}
//         >
//             <Head title={`Students in ${course_name}`} />
//             <div className="overflow-x-auto p-6 bg-white rounded shadow mt-6">
//                 <table className="min-w-full text-sm text-left border">
//                     <thead className="bg-gray-100 font-semibold">
//                         <tr>
//                             <th className="px-3 py-2">Name</th>
//                             <th className="px-3 py-2">Email</th>
//                             <th className="px-3 py-2">Target Country</th>
//                             <th className="px-3 py-2">Preferred Course</th>
//                             <th className="px-3 py-2">Registered Date</th>
//                             <th className="px-3 py-2">Placement Score</th>
//                             <th className="px-3 py-2">Course Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {students.map((student, i) => (
//                             <tr key={i} className="border-t">
//                                 <td className="px-3 py-2">{student.name}</td>
//                                 <td className="px-3 py-2">{student.email}</td>
//                                 <td className="px-3 py-2">{student.target_country}</td>
//                                 <td className="px-3 py-2">{student.preferred_course}</td>
//                                 <td className="px-3 py-2">{student.registered_date}</td>
//                                 <td className="px-3 py-2">{student.placement_score}</td>
//                                 <td className="px-3 py-2">{student.course_status}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>

//                 <div className="mt-4">
//                     <Link href={route('dashboard')} className="text-blue-600 hover:underline">
//                         ← Back to Dashboard
//                     </Link>
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }


import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from '@inertiajs/react';

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

export default function CourseStudentDetail() {
  const { course_name, students } = usePage().props;

  return (
    <AuthenticatedLayout
      header={<h2 className="text-xl font-bold text-gray-800">Students in {course_name}</h2>}
    >
      <Head title={`Students in ${course_name}`} />
      <section className="max-w-7xl mx-auto mt-8 px-4">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
              <thead>
                <tr className="bg-gray-100 text-base">
                  <th className="p-3 font-semibold">Name</th>
                  <th className="p-3 font-semibold">Email</th>
                  <th className="p-3 font-semibold">Target Country</th>
                  <th className="p-3 font-semibold">Preferred Course</th>
                  <th className="p-3 font-semibold">Registered Date</th>
                  <th className="p-3 font-semibold">Placement Score</th>
                  <th className="p-3 font-semibold">Course Status</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-gray-500 bg-gray-50">
                      No students found.
                    </td>
                  </tr>
                ) : (
                  students.map((student, i) => (
                    <tr key={i} className="border-b last:border-none">
                      <td className="p-3 align-middle">{student.name}</td>
                      <td className="p-3 align-middle">{student.email}</td>
                      <td className="p-3 align-middle">{student.target_country}</td>
                      <td className="p-3 align-middle">{student.preferred_course}</td>
                      <td className="p-3 align-middle">{student.registered_date}</td>
                      <td className="p-3 align-middle">{student.placement_score}</td>
                      <td className="p-3 align-middle">{statusBadge(student.course_status)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-6">
            <Link
              href={route('dashboard')}
              className="text-blue-600 hover:underline text-base font-medium"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </section>
    </AuthenticatedLayout>
  );
}
