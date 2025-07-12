// import { router } from "@inertiajs/react";

// export default function CourseCard({ course }) {
//     const handleView = () => {
//         router.visit(route("admin.courses.profile", { id: course.id }));
//     };
//     return (
//         <div className="bg-white rounded-lg shadow-md border hover:shadow-lg transition duration-200 p-5">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                 {course.name}
//             </h3>

//             <p className="text-sm text-gray-600 mb-3">
//                 {course.description || "No description provided."}
//             </p>

//             <div className="text-sm text-gray-700 space-y-1">
//                 <p><strong>💰 Fee:</strong> LKR {course.course_fee}</p>
//                 <p><strong>📅 Duration:</strong> {course.duration}</p>
//                 <p><strong>👨‍🏫 Conductor:</strong> {course.conductor_name}</p>
//                 <p>
//                     <strong>📌 Status:</strong>{" "}
//                     <span
//                         className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
//                             course.status === "Active"
//                                 ? "bg-green-100 text-green-800"
//                                 : course.status === "Inactive"
//                                 ? "bg-gray-100 text-gray-700"
//                                 : course.status === "Completed"
//                                 ? "bg-blue-100 text-blue-800"
//                                 : "bg-red-100 text-red-800"
//                         }`}
//                     >
//                         {course.status}
//                     </span>
//                 </p>
//             </div>
//              <button
//                 onClick={handleView}
//                 className="mt-2 bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
//             >
//                 View Course
//             </button>
//         </div>
//     );
// }




import { router } from "@inertiajs/react";
import SchoolIcon from '@mui/icons-material/School';

export default function CourseCard({ course }) {
  const handleView = () => {
    router.visit(route("admin.courses.profile", { id: course.id }));
  };

  // Helper for status badge color
  const statusColor = {
    Active: "bg-green-100 text-green-700",
    Inactive: "bg-gray-100 text-gray-700",
    Completed: "bg-blue-100 text-blue-700",
    Cancelled: "bg-red-100 text-red-700",
  }[course.status] || "bg-gray-100 text-gray-700";

  return (
    <div className="bg-white rounded-xl shadow-md border hover:shadow-xl transition duration-200 p-6 flex flex-col gap-3 hover:border-blue-400">
      <div className="flex items-center gap-3 mb-2">
        <SchoolIcon className="text-blue-600" fontSize="medium" />
        <h3 className="text-xl font-bold text-gray-800 flex-1">{course.name}</h3>
        <span
          className={`inline-block px-3 py-0.5 rounded-full font-semibold text-xs capitalize ${statusColor}`}
        >
          {course.status}
        </span>
      </div>

      <p className="text-base text-gray-600 mb-2">
        {course.description || "No description provided."}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-base text-gray-700">
        <div>
          <span className="font-semibold">💰 Fee:</span> LKR {course.course_fee}
        </div>
        <div>
          <span className="font-semibold">📅 Duration:</span> {course.duration}
        </div>
        <div>
          <span className="font-semibold">👨‍🏫 Conductor:</span> {course.conductor_name}
        </div>
      </div>

      <button
        onClick={handleView}
        className="mt-4 w-max bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded shadow transition"
      >
        View Course
      </button>
    </div>
  );
}
