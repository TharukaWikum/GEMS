import React from 'react';

const CourseExam = ({ examResults }) => {
  if (!examResults || examResults.length === 0) {
    return <p>No Exams scheduled yet.</p>;
  }

  return (
    <div className="mt-10 space-y-6">
      <h3 className="text-lg font-bold">Your Course Exams & Results</h3>
      {examResults.map((exam) => {
        const result = exam.results;

        if (!result || typeof result !== 'object') return null;

        return (
          <div key={exam.exam_id} className="p-4 bg-gray-100 rounded shadow">
            <h4 className="text-md font-semibold">{exam.exam_title}</h4>
            <p><strong>Course:</strong> {exam.course_name}</p>
            <p><strong>Date:</strong> {exam.exam_date}</p>
            <p><strong>Status:</strong> {exam.status}</p>

            <div className="mt-2">
              <ul className="ml-5 list-disc text-sm">
                <li>Writing: {result.writing_score ?? "-"} ({result.writing_comment ?? "No comment"})</li>
                <li>Speaking: {result.speaking_score ?? "-"} ({result.speaking_comment ?? "No comment"})</li>
                <li>Listening: {result.listening_score ?? "-"} ({result.listening_comment ?? "No comment"})</li>
                <li>Reading: {result.reading_score ?? "-"} ({result.reading_comment ?? "No comment"})</li>
                <li>Final Score: {result.final_score ?? "-"} ({result.final_comment ?? "No comment"})</li>
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CourseExam;
