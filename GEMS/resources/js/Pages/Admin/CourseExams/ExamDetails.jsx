// import React from "react";

// export default function ExamDetails({ exam }) {
//     return (
//         <div className="bg-white p-6 rounded shadow space-y-4">
//             <h3 className="text-xl font-bold">{exam.title}</h3>
//             <p>{exam.description}</p>
//             <p>
//                 <strong>Date:</strong> {exam.exam_date}
//             </p>
//             <p>
//                 <strong>Time:</strong> {exam.start_time} ({exam.duration_minutes} minutes)
//             </p>
//             <p>
//                 <strong>Status:</strong> {exam.status}
//             </p>
//             <p>
//                 <strong>Scheduled By:</strong> {exam.scheduled_by}
//             </p>
//         </div>
//     );
// }



import React from "react";

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

export default function ExamDetails({ exam }) {
  return (
    <section className="max-w-7xl mx-auto mt-8 px-4">
      <div className="bg-white rounded-xl shadow-md p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{exam.title}</h3>
        <p className="text-base text-gray-700 mb-4">{exam.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2 text-base">
          <div>
            <span className="font-semibold">Date:</span> {exam.exam_date}
          </div>
          <div>
            <span className="font-semibold">Time:</span> {exam.start_time} ({exam.duration_minutes} minutes)
          </div>
          <div>
            <span className="font-semibold">Status:</span> {statusBadge(exam.status)}
          </div>
          <div>
            <span className="font-semibold">Scheduled By:</span> {exam.scheduled_by}
          </div>
        </div>
      </div>
    </section>
  );
}
