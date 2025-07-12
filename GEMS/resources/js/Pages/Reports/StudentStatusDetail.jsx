// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Head } from "@inertiajs/react";

// export default function StudentStatusDetail({ status, students }) {
//     return (
//         <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800">Students in {status.replaceAll('_', ' ')}</h2>}>
//             <Head title={`Students - ${status}`} />
//             <div className="p-6 bg-white shadow rounded">
//                 {students.length === 0 ? (
//                     <p>No students found.</p>
//                 ) : (
//                     <table className="w-full text-sm table-auto">
//                         <thead>
//                             <tr>
//                                 <th className="border px-4 py-2">Name</th>
//                                 <th className="border px-4 py-2">Email</th>
//                                 <th className="border px-4 py-2">Target Country</th>
//                                 <th className="border px-4 py-2">Target Score</th>
//                                 <th className="border px-4 py-2">Preferred Course</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {students.map((s, i) => (
//                                 <tr key={i}>
//                                     <td className="border px-4 py-2">{s.name}</td>
//                                     <td className="border px-4 py-2">{s.email}</td>
//                                     <td className="border px-4 py-2">{s.target_country}</td>
//                                     <td className="border px-4 py-2">{s.target_score}</td>
//                                     <td className="border px-4 py-2">{s.preferred_course}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//             </div>
//         </AuthenticatedLayout>
//     );
// }


import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function StudentStatusDetail({ status, students }) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800">
          Students in {status.replaceAll('_', ' ')}
        </h2>
      }
    >
      <Head title={`Students - ${status.replaceAll('_', ' ')}`} />
      <section className="max-w-7xl mx-auto mt-8 px-4">
        <div className="bg-white rounded-xl shadow-md p-6">
          {students.length === 0 ? (
            <div className="text-base text-gray-500 text-center py-8">
              No students found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-700">
                <thead>
                  <tr className="bg-gray-100 text-base">
                    <th className="p-3 font-semibold">Name</th>
                    <th className="p-3 font-semibold">Email</th>
                    <th className="p-3 font-semibold">Target Country</th>
                    <th className="p-3 font-semibold">Target Score</th>
                    <th className="p-3 font-semibold">Preferred Course</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s, i) => (
                    <tr key={i} className="border-b last:border-none">
                      <td className="p-3 align-middle">{s.name}</td>
                      <td className="p-3 align-middle">{s.email}</td>
                      <td className="p-3 align-middle">{s.target_country}</td>
                      <td className="p-3 align-middle">{s.target_score}</td>
                      <td className="p-3 align-middle">{s.preferred_course}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </AuthenticatedLayout>
  );
}
