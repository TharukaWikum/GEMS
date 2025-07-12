// import React from "react";
// import { Link } from "@inertiajs/react";

// export default function ScheduledExamList({ exams }) {
//     if (!exams || exams.length === 0) return null;

//     return (
//         <div className="max-w-7xl mx-auto p-6 bg-white rounded shadow mt-6 space-y-4">
//             <h3 className="text-lg font-semibold text-gray-800">
//                 Scheduled Exams
//             </h3>
//             <ul className="space-y-2">
//                 {exams.map((exam) => (
//                     <li
//                         key={exam.id}
//                         className="border p-4 rounded hover:bg-gray-50"
//                     >
//                         <Link
//                             href={route("admin.exams.show", exam.id)}
//                             className="text-blue-600 font-semibold"
//                         >
//                             {exam.title}
//                         </Link>
//                         <p className="text-sm text-gray-600">
//                             Scheduled on: {exam.exam_date} at {exam.start_time}
//                         </p>
//                         <p className="text-sm text-gray-600">
//                             By: {exam.scheduled_by}
//                         </p>
//                         <p className="text-sm text-gray-600">
//                             Status: {exam.status}
//                         </p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }



import React from "react";
import { Link } from "@inertiajs/react";

// Helper for status badge colors
const statusBadge = (status) => {
  let color = "bg-gray-100 text-gray-700";
  if (status === "scheduled") color = "bg-blue-100 text-blue-700";
  else if (status === "completed") color = "bg-green-100 text-green-700";
  else if (status === "cancelled") color = "bg-red-100 text-red-700";
  return (
    <span className={`inline-block px-3 py-0.5 rounded-full font-semibold text-xs capitalize ${color}`}>
      {status}
    </span>
  );
};

export default function ScheduledExamList({ exams }) {
  if (!exams || exams.length === 0) return null;

  // Sort exams from future to past by date and time
  const sortedExams = [...exams].sort((a, b) => {
    const aDate = new Date(`${a.exam_date}T${a.start_time}`);
    const bDate = new Date(`${b.exam_date}T${b.start_time}`);
    return bDate - aDate;
  });

  return (
    <section className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow mt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Scheduled Exams
      </h3>
      <ul className="space-y-3">
        {sortedExams.map((exam) => (
          <li
            key={exam.id}
            className="border rounded-lg p-4 hover:bg-gray-50 transition"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <Link
                href={route("admin.exams.show", exam.id)}
                className="text-blue-700 font-semibold text-lg hover:underline"
              >
                {exam.title}
              </Link>
              <div>{statusBadge(exam.status)}</div>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              <span className="mr-3">
                <strong>Scheduled on:</strong> {exam.exam_date} at {exam.start_time}
              </span>
              <span>
                <strong>By:</strong> {exam.scheduled_by}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

