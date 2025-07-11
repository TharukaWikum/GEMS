// import React from "react";
// import { useForm, Link } from "@inertiajs/react";

// const ScheduledTestsTable = ({ tests }) => {
//     const { post } = useForm();

//     const handleMarkPending = (testId) => {
//         if (confirm("Mark this test as pending?")) {
//             post(route("placement.markPending", testId));
//         }
//     };

//     return (
//         <div className="mb-8">
//             <h3 className="text-xl font-semibold mb-3">Scheduled Tests</h3>
//             <table className="w-full border text-sm mb-4">
//                 <thead className="bg-gray-100">
//                     <tr>
//                         <th className="border px-2 py-1">Title</th>
//                         <th className="border px-2 py-1">Created At</th>
//                         <th className="border px-2 py-1">Students</th>
//                         <th className="border px-2 py-1">Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {tests.map((test) => (
//                         <tr key={test.id}>
//                             <td className="border px-2 py-1">{test.title}</td>
//                             <td className="border px-2 py-1">{new Date(test.created_at).toLocaleDateString()}</td>
//                             <td className="border px-2 py-1">{test.results_count}</td>
//                             <td className="border px-2 py-1">
//                                 <Link
//                                     href={route("placement.show", test.id)}
//                                     className="text-blue-600 hover:underline mr-2"
//                                 >
//                                     View Details
//                                 </Link>

//                                 <button
//                                     onClick={() => handleMarkPending(test.id)}
//                                     className="text-yellow-600 hover:underline"
//                                 >
//                                     Mark Pending
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ScheduledTestsTable;


import React from "react";
import { useForm, Link } from "@inertiajs/react";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const ScheduledTestsTable = ({ tests }) => {
  const { post } = useForm();

  const handleMarkPending = (testId) => {
    if (confirm("Mark this test as pending?")) {
      post(route("placement.markPending", testId));
    }
  };

  return (
    <section className="max-w-7xl mx-auto mb-8 px-4">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <EventAvailableIcon className="text-blue-600" />
          <h3 className="text-xl font-bold text-gray-800">Scheduled Tests</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-100 text-base">
                <th className="p-3 font-semibold">Title</th>
                <th className="p-3 font-semibold">Created At</th>
                <th className="p-3 font-semibold">Students</th>
                <th className="p-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {tests.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-gray-500 bg-gray-50">
                    No scheduled tests.
                  </td>
                </tr>
              ) : (
                tests.map((test) => (
                  <tr key={test.id} className="border-b last:border-none">
                    <td className="p-3 align-middle">{test.title}</td>
                    <td className="p-3 align-middle">{new Date(test.created_at).toLocaleDateString()}</td>
                    <td className="p-3 align-middle">{test.results_count}</td>
                    <td className="p-3 align-middle space-x-2">
                      <Link
                        href={route("placement.show", test.id)}
                        className="inline-block px-3 py-1.5 bg-blue-50 text-blue-700 rounded font-medium hover:bg-blue-100 transition"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => handleMarkPending(test.id)}
                        className="inline-block px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded font-medium hover:bg-yellow-100 transition"
                      >
                        Mark Pending
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ScheduledTestsTable;
