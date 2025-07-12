// import { Link } from "@inertiajs/react";

// export default function StudentStatusOverview({ summary }) {
//     return (
//         <div className="bg-white p-4 rounded shadow mb-6">
//             <h4 className="text-lg font-semibold mb-2">
//                 Student Status Overview
//             </h4>
//             <a
//     href={route("reports.student.status.all.pdf")}
//     target="_blank"
//     className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
// >
//     Download Full Student Status PDF
// </a>
//             {/* Reports */}
//             <ul className="space-y-1">
//                 {Object.entries(summary.students_by_status).map(
//                 ([status, count], idx) => (
//                     <li key={idx} className="flex justify-between">
//                         <Link
//                             href={route(
//                                 "reports.student.status.details",
//                                 status
//                             )}
//                             className="text-blue-600 hover:underline capitalize"
//                         >
//                             {status.replaceAll("_", " ")}
//                         </Link>
//                         <span className="font-medium">{count}</span>
//                     </li>
//                 )
//             )}
//             </ul>
//         </div>
//     );
// }


import { Link } from "@inertiajs/react";
import InsertChartIcon from '@mui/icons-material/InsertChart';

const statusColors = {
  active: "bg-green-100 text-green-700",
  inactive: "bg-yellow-100 text-yellow-700",
  blocked: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
  // Add more status-color mappings as needed
};

export default function StudentStatusOverview({ summary }) {
  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <InsertChartIcon className="text-blue-600" />
          <h4 className="text-xl font-bold text-gray-800">
            Student Status Overview
          </h4>
        </div>
        <a
          href={route("reports.student.status.all.pdf")}
          target="_blank"
          className="inline-block mb-6 px-5 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Download Full Student Status PDF
        </a>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {Object.entries(summary.students_by_status).map(([status, count], idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between p-5 rounded-lg shadow-sm border ${statusColors[status] || "bg-gray-50 text-gray-700"}`}
            >
              <Link
                href={route("reports.student.status.details", status)}
                className="font-semibold text-base capitalize hover:underline"
              >
                {status.replaceAll("_", " ")}
              </Link>
              <span className="text-lg font-bold">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
