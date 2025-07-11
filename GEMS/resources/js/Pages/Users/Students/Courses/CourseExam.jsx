// import React from 'react';

// const CourseExam = ({ examResults }) => {
//   if (!examResults || examResults.length === 0) {
//     return <p>No Exams scheduled yet.</p>;
//   }

//   return (
//     <div className="mt-10 space-y-6">
//       <h3 className="text-lg font-bold">Your Course Exams & Results</h3>
//       {examResults.map((exam) => {
//         const result = exam.results;

//         if (!result || typeof result !== 'object') return null;

//         return (
//           <div key={exam.exam_id} className="p-4 bg-gray-100 rounded shadow">
//             <h4 className="text-md font-semibold">{exam.exam_title}</h4>
//             <p><strong>Course:</strong> {exam.course_name}</p>
//             <p><strong>Date:</strong> {exam.exam_date}</p>
//             <p><strong>Status:</strong> {exam.status}</p>

//             <div className="mt-2">
//               <ul className="ml-5 list-disc text-sm">
//                 <li>Writing: {result.writing_score ?? "-"} ({result.writing_comment ?? "No comment"})</li>
//                 <li>Speaking: {result.speaking_score ?? "-"} ({result.speaking_comment ?? "No comment"})</li>
//                 <li>Listening: {result.listening_score ?? "-"} ({result.listening_comment ?? "No comment"})</li>
//                 <li>Reading: {result.reading_score ?? "-"} ({result.reading_comment ?? "No comment"})</li>
//                 <li>Final Score: {result.final_score ?? "-"} ({result.final_comment ?? "No comment"})</li>
//               </ul>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default CourseExam;



import React from "react";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import dayjs from "dayjs";

const statusColors = {
  completed: "bg-green-100 text-green-800",
  scheduled: "bg-blue-100 text-blue-800",
  absent: "bg-red-100 text-red-800",
};

const getExamStatus = (exam) => {
  const { status, results } = exam;
  const hasMarks =
    results &&
    [results.writing_score, results.speaking_score, results.listening_score, results.reading_score, results.final_score]
      .some((score) => score !== null && score !== undefined);

  if (status === "completed" && !hasMarks) return "absent";
  return status;
};

const getStatusText = (status, exam) => {
  if (status === "absent") return "Absent";
  if (status === "scheduled") return "Scheduled";
  if (status === "completed") return "Completed";
  return exam.status;
};

const getStatusIcon = (status) => {
  if (status === "absent") return <ErrorOutlineIcon fontSize="small" className="text-red-500 mr-1" />;
  if (status === "scheduled") return <EventAvailableIcon fontSize="small" className="text-blue-500 mr-1" />;
  if (status === "completed") return <AssignmentTurnedInIcon fontSize="small" className="text-green-500 mr-1" />;
  return null;
};

export default function CourseExam({ examResults }) {
  if (!examResults || examResults.length === 0) {
    return (
      <div className="max-w-7xl mx-auto mt-8 px-4">
        <div className="bg-white rounded-lg shadow p-6 text-gray-500">
          No Exams scheduled yet.
        </div>
      </div>
    );
  }

  // Order by date (future to past)
  const sortedExams = [...examResults].sort(
    (a, b) => new Date(b.exam_date) - new Date(a.exam_date)
  );

  return (
    <section className="max-w-7xl mx-auto mt-8 px-4">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        Your Course Exams & Results
      </h3>
      <div className="space-y-6">
        {sortedExams.map((exam) => {
          const status = getExamStatus(exam);
          const statusText = getStatusText(status, exam);
          const statusIcon = getStatusIcon(status);
          const result = exam.results || {};

          // Check if any marks are present
          const hasMarks =
            [result.writing_score, result.speaking_score, result.listening_score, result.reading_score, result.final_score]
              .some((score) => score !== null && score !== undefined);

          return (
            <div
              key={exam.exam_id}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-2"
            >
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full font-semibold text-sm ${statusColors[status] || "bg-gray-100 text-gray-600"}`}
                >
                  {statusIcon}
                  {statusText}
                </span>
                <span className="ml-auto text-sm text-gray-500">
                  {dayjs(exam.exam_date).format("YYYY-MM-DD")}
                </span>
              </div>
              <div className="text-lg font-bold text-gray-800">{exam.exam_title}</div>
              <div className="text-base text-gray-700 mb-2">
                <span className="font-semibold">Course:</span> {exam.course_name}
              </div>

              {/* Exam Results or Messages */}
              {status === "absent" && (
                <div className="bg-red-50 text-red-700 rounded p-3 font-medium">
                  You were absent for this exam.
                </div>
              )}
              {status === "scheduled" && !hasMarks && (
                <div className="bg-blue-50 text-blue-700 rounded p-3 font-medium">
                  Please come to the institute and face the exam on the scheduled date.
                </div>
              )}
              {hasMarks && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div className="bg-gray-50 rounded p-3">
                    <div className="font-semibold text-gray-700 mb-1">Writing</div>
                    <div className="text-lg font-mono text-gray-800">{result.writing_score ?? "-"}</div>
                    <div className="text-sm text-gray-500">{result.writing_comment ?? "No comment"}</div>
                  </div>
                  <div className="bg-gray-50 rounded p-3">
                    <div className="font-semibold text-gray-700 mb-1">Speaking</div>
                    <div className="text-lg font-mono text-gray-800">{result.speaking_score ?? "-"}</div>
                    <div className="text-sm text-gray-500">{result.speaking_comment ?? "No comment"}</div>
                  </div>
                  <div className="bg-gray-50 rounded p-3">
                    <div className="font-semibold text-gray-700 mb-1">Listening</div>
                    <div className="text-lg font-mono text-gray-800">{result.listening_score ?? "-"}</div>
                    <div className="text-sm text-gray-500">{result.listening_comment ?? "No comment"}</div>
                  </div>
                  <div className="bg-gray-50 rounded p-3">
                    <div className="font-semibold text-gray-700 mb-1">Reading</div>
                    <div className="text-lg font-mono text-gray-800">{result.reading_score ?? "-"}</div>
                    <div className="text-sm text-gray-500">{result.reading_comment ?? "No comment"}</div>
                  </div>
                  <div className="sm:col-span-2 bg-green-50 rounded p-3 mt-2">
                    <div className="font-semibold text-gray-700 mb-1">Final Score</div>
                    <div className="text-xl font-bold text-green-700">{result.final_score ?? "-"}</div>
                    <div className="text-sm text-gray-500">{result.final_comment ?? "No comment"}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
