// import React from "react";

// export default function ExamResultsSection({ examResults }) {
//     return (
//         <div className="mt-6">
//             <h3 className="text-lg font-semibold mb-2">Course Exams & Results</h3>
//             {examResults.length > 0 ? (
//                 examResults.map((exam) => (
//                     <div key={exam.exam_id} className="bg-white p-4 rounded shadow mb-6">
//                         <h3 className="text-xl font-bold mb-2">{exam.exam_title}</h3>
//                         <p className="text-gray-600"><strong>Course:</strong> {exam.course_name}</p>
//                         <p className="text-gray-600"><strong>Date:</strong> {exam.exam_date}</p>
//                         <p className="text-gray-600"><strong>Status:</strong> {exam.status}</p>

//                         {exam.results.map((result, i) => (
//                             <div key={i} className="mt-2 text-sm text-gray-700 space-y-1">
//                                 <p><strong>Writing:</strong> {result.writing_score} ({result.writing_comment})</p>
//                                 <p><strong>Speaking:</strong> {result.speaking_score} ({result.speaking_comment})</p>
//                                 <p><strong>Listening:</strong> {result.listening_score} ({result.listening_comment})</p>
//                                 <p><strong>Reading:</strong> {result.reading_score} ({result.reading_comment})</p>
//                                 <p><strong>Final Score:</strong> {result.final_score} ({result.final_comment})</p>
//                             </div>
//                         ))}
//                     </div>
//                 ))
//             ) : (
//                 <p className="text-sm text-gray-500">No exams assigned to this student.</p>
//             )}
//         </div>
//     );
// }



import React from "react";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

export default function ExamResultsSection({ examResults }) {
  // Sort exams: future (newest) to past (oldest)
  const sortedExams = [...examResults].sort(
    (a, b) => new Date(b.exam_date) - new Date(a.exam_date)
  );

  return (
    <section className="max-w-7xl mx-auto mt-8 px-4">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <AssignmentTurnedInIcon className="text-blue-600" />
          <h3 className="text-xl font-bold text-gray-800">Course Exams & Results</h3>
        </div>
        {sortedExams.length > 0 ? (
          sortedExams.map((exam) => (
            <div
              key={exam.exam_id}
              className="bg-white rounded-xl shadow-md p-6 mb-6"
            >
              <div className="flex flex-wrap items-center gap-4 mb-2">
                <div className="font-semibold text-lg text-gray-800">{exam.exam_title}</div>
                <span className="text-sm text-gray-500">
                  {new Date(exam.exam_date).toLocaleDateString()}
                </span>
                <span className={`px-3 py-0.5 rounded-full text-xs font-semibold capitalize ${
                  exam.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : exam.status === "scheduled"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                }`}>
                  {exam.status}
                </span>
              </div>
              <div className="mb-3 text-gray-700">
                <span className="font-semibold">Course:</span> {exam.course_name}
              </div>
              {exam.results && exam.results.length > 0 ? (
                exam.results.map((result, i) => (
                  <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base text-gray-700 mb-2">
                    <div>
                      <span className="font-semibold">Writing:</span>{" "}
                      <span className="font-mono">{result.writing_score ?? "-"}</span>
                      <span className="ml-2 text-gray-500 text-sm">{result.writing_comment ?? "No comment"}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Speaking:</span>{" "}
                      <span className="font-mono">{result.speaking_score ?? "-"}</span>
                      <span className="ml-2 text-gray-500 text-sm">{result.speaking_comment ?? "No comment"}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Listening:</span>{" "}
                      <span className="font-mono">{result.listening_score ?? "-"}</span>
                      <span className="ml-2 text-gray-500 text-sm">{result.listening_comment ?? "No comment"}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Reading:</span>{" "}
                      <span className="font-mono">{result.reading_score ?? "-"}</span>
                      <span className="ml-2 text-gray-500 text-sm">{result.reading_comment ?? "No comment"}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="font-semibold">Final Score:</span>{" "}
                      <span className="font-bold text-green-700">{result.final_score ?? "-"}</span>
                      <span className="ml-2 text-gray-500 text-sm">{result.final_comment ?? "No comment"}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-base">No results yet.</div>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
            No exams assigned to this student.
          </div>
        )}
      </div>
    </section>
  );
}
