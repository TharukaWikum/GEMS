// import { Link } from "@inertiajs/react";

// export default function CourseStudentCount({ summary }) {
//     console.log("students_by_course", summary.students_by_course);
//     return (
//         <div className="bg-white p-4 rounded shadow mb-6">
//             <h4 className="text-lg font-semibold mb-2">Students by Course</h4>
//             {/* <Link
//   href={route('reports.course.students.download')}
//   className="inline-block px-4 py-2 mt-2 text-white bg-green-600 rounded hover:bg-green-700"
// >
//   Download Full Course Student Report
// </Link> */}
// <a
//     href={route("reports.course.students.download")}
//     target="_blank"
//     rel="noopener noreferrer"
//     className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
// >
//      Download Full Course Student Report
// </a>

//             <ul className="space-y-1">
//                 {summary.students_by_course.map((course, idx) => (
//                     <li key={idx} className="flex justify-between">
//                         <Link
//                             href={route('reports.course.details', course.id)}
//                             className="text-blue-600 hover:underline"
//                         >
//                             {course.course_name}
//                         </Link>
//                         <span className="font-medium">{course.count}</span>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }


import { Link } from "@inertiajs/react";
import SchoolIcon from '@mui/icons-material/School';

export default function CourseStudentCount({ summary }) {
  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <SchoolIcon className="text-green-600" />
          <h4 className="text-xl font-bold text-gray-800">Students by Course</h4>
        </div>
        <a
          href={route("reports.course.students.download")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mb-6 px-5 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition"
        >
          Download Full Course Student Report
        </a>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {summary.students_by_course.map((course, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-5 rounded-lg shadow-sm border bg-green-50"
            >
              <Link
                href={route('reports.course.details', course.id)}
                className="font-semibold text-base text-green-700 hover:underline"
              >
                {course.course_name}
              </Link>
              <span className="text-lg font-bold">{course.count}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

