// import React from "react";

// export default function MyRegisteredCourses({ registeredCourses }) {
//     if (!registeredCourses || registeredCourses.length === 0) return null;

//     return (
//         <div className="space-y-4">
//             {registeredCourses.map((course) => (
//                 <div
//                     key={course.id}
//                     className="p-4 bg-white rounded shadow"
//                 >
//                     <h3 className="text-lg font-bold">{course.name}</h3>
//                     <p>{course.description}</p>
//                     <p>
//                         <strong>Fee:</strong> Rs. {course.course_fee}
//                     </p>
//                     <p>
//                         <strong>Duration:</strong> {course.duration}
//                     </p>
//                     <p>
//                         <strong>Type:</strong> {course.type}
//                     </p>
//                     <p>
//                         <strong>Conductor:</strong> {course.conductor_name}
//                     </p>

//                     <h4 className="font-semibold mt-3">Materials:</h4>
//                     {Array.isArray(course.materials) && course.materials.length > 0 ? (
//                         <ul className="list-disc ml-5">
//                             {course.materials.map((mat) => (
//                                 <li key={mat.id}>
//                                     <a
//                                         href={`/storage/${mat.file_path}`}
//                                         className="text-blue-600 underline"
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                     >
//                                         {mat.title} ({mat.type})
//                                     </a>
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p className="text-sm text-gray-500">
//                             No materials available.
//                         </p>
//                     )}
//                 </div>
//             ))}
//         </div>
//     );
// }


import React from "react";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import dayjs from "dayjs";
import DownloadIcon from '@mui/icons-material/Download';

export default function MyRegisteredCourses({ registeredCourses }) {
  if (!registeredCourses || registeredCourses.length === 0) return null;

  // Only one course per student
  const course = registeredCourses[0];

  return (
    <section className="max-w-7xl mx-auto mt-8 px-4">
      {/* Course Details */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{course.name}</h2>
        <p className="text-gray-700 text-base mb-3">{course.description}</p>
        <div className="flex flex-col sm:flex-row sm:gap-8 gap-2 text-gray-700 text-base">
          <div>
            <span className="font-semibold">Fee:</span> Rs. {course.course_fee}
          </div>
          <div>
            <span className="font-semibold">Duration:</span> {course.duration}
          </div>
          <div>
            <span className="font-semibold">Type:</span> {course.type}
          </div>
          <div>
            <span className="font-semibold">Conductor:</span> {course.conductor_name}
          </div>
        </div>
      </div>

      {/* Materials Section */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Course Materials</h3>
        {Array.isArray(course.materials) && course.materials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {course.materials.map((mat) => (
              <div
                key={mat.id}
                className="bg-gray-50 rounded-lg shadow-sm p-5 flex flex-col gap-3"
              >
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <InsertDriveFileIcon fontSize="small" className="text-blue-400" />
                  <span>{dayjs(mat.created_at).format("YYYY-MM-DD")}</span>
                  <span className="ml-auto px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs font-semibold uppercase">
                    {mat.type}
                  </span>
                </div>
                <div className="font-semibold text-lg text-gray-800">{mat.title}</div>
                <div className="text-gray-600 text-sm break-all">{mat.file_path.split('/').pop()}</div>
                <a
                  href={`/storage/${mat.file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition font-medium w-max"
                  download
                >
                  <DownloadIcon fontSize="small" />
                  Download
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-base bg-gray-50 rounded p-4">
            No materials available.
          </div>
        )}
      </div>
    </section>
  );
}
