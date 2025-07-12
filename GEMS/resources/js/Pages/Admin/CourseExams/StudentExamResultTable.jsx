// import React from "react";

// export default function StudentExamResultTable({ students }) {
//     return (
//         <div>
//             <h4 className="mt-6 font-semibold">Student Results</h4>
//             <table className="w-full table-auto border mt-2 text-sm">
//                 <thead className="bg-gray-100">
//                     <tr>
//                         <th className="border px-2 py-1">Name</th>
//                         <th className="border px-2 py-1">Email</th>
//                         <th className="border px-2 py-1">Writing</th>
//                         <th className="border px-2 py-1">Speaking</th>
//                         <th className="border px-2 py-1">Listening</th>
//                         <th className="border px-2 py-1">Reading</th>
//                         <th className="border px-2 py-1">Final</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {students.map((student) => (
//                         <tr key={student.id}>
//                             <td className="border px-2 py-1">{student.name}</td>
//                             <td className="border px-2 py-1">{student.email}</td>
//                             <td className="border px-2 py-1">
//                                 {student.writing_score ?? "-"}
//                                 <br />
//                                 <span className="text-xs italic text-gray-500">
//                                     {student.writing_comment}
//                                 </span>
//                             </td>
//                             <td className="border px-2 py-1">
//                                 {student.speaking_score ?? "-"}
//                                 <br />
//                                 <span className="text-xs italic text-gray-500">
//                                     {student.speaking_comment}
//                                 </span>
//                             </td>
//                             <td className="border px-2 py-1">
//                                 {student.listening_score ?? "-"}
//                                 <br />
//                                 <span className="text-xs italic text-gray-500">
//                                     {student.listening_comment}
//                                 </span>
//                             </td>
//                             <td className="border px-2 py-1">
//                                 {student.reading_score ?? "-"}
//                                 <br />
//                                 <span className="text-xs italic text-gray-500">
//                                     {student.reading_comment}
//                                 </span>
//                             </td>
//                             <td className="border px-2 py-1">
//                                 {student.final_score ?? "-"}
//                                 <br />
//                                 <span className="text-xs italic text-gray-500">
//                                     {student.final_comment}
//                                 </span>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }



import React from "react";

export default function StudentExamResultTable({ students }) {
  return (
    <section className="max-w-5xl mx-auto mt-8 px-4">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h4 className="text-xl font-bold mb-4 text-gray-800">Student Results</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-100 text-base">
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Email</th>
                <th className="p-3 font-semibold">Writing</th>
                <th className="p-3 font-semibold">Speaking</th>
                <th className="p-3 font-semibold">Listening</th>
                <th className="p-3 font-semibold">Reading</th>
                <th className="p-3 font-semibold">Final</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-gray-500 bg-gray-50">
                    No student results available.
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id} className="border-b last:border-none">
                    <td className="p-3 align-middle">{student.name}</td>
                    <td className="p-3 align-middle">{student.email}</td>
                    <td className="p-3 align-middle">
                      <span className="font-semibold">{student.writing_score ?? "-"}</span>
                      <div className="text-xs italic text-gray-500">{student.writing_comment || ""}</div>
                    </td>
                    <td className="p-3 align-middle">
                      <span className="font-semibold">{student.speaking_score ?? "-"}</span>
                      <div className="text-xs italic text-gray-500">{student.speaking_comment || ""}</div>
                    </td>
                    <td className="p-3 align-middle">
                      <span className="font-semibold">{student.listening_score ?? "-"}</span>
                      <div className="text-xs italic text-gray-500">{student.listening_comment || ""}</div>
                    </td>
                    <td className="p-3 align-middle">
                      <span className="font-semibold">{student.reading_score ?? "-"}</span>
                      <div className="text-xs italic text-gray-500">{student.reading_comment || ""}</div>
                    </td>
                    <td className="p-3 align-middle">
                      <span className="font-bold text-green-700">{student.final_score ?? "-"}</span>
                      <div className="text-xs italic text-gray-500">{student.final_comment || ""}</div>
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
}
