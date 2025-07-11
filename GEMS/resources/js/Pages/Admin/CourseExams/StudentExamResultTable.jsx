import React from "react";

export default function StudentExamResultTable({ students }) {
    return (
        <div>
            <h4 className="mt-6 font-semibold">Student Results</h4>
            <table className="w-full table-auto border mt-2 text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-2 py-1">Name</th>
                        <th className="border px-2 py-1">Email</th>
                        <th className="border px-2 py-1">Writing</th>
                        <th className="border px-2 py-1">Speaking</th>
                        <th className="border px-2 py-1">Listening</th>
                        <th className="border px-2 py-1">Reading</th>
                        <th className="border px-2 py-1">Final</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td className="border px-2 py-1">{student.name}</td>
                            <td className="border px-2 py-1">{student.email}</td>
                            <td className="border px-2 py-1">
                                {student.writing_score ?? "-"}
                                <br />
                                <span className="text-xs italic text-gray-500">
                                    {student.writing_comment}
                                </span>
                            </td>
                            <td className="border px-2 py-1">
                                {student.speaking_score ?? "-"}
                                <br />
                                <span className="text-xs italic text-gray-500">
                                    {student.speaking_comment}
                                </span>
                            </td>
                            <td className="border px-2 py-1">
                                {student.listening_score ?? "-"}
                                <br />
                                <span className="text-xs italic text-gray-500">
                                    {student.listening_comment}
                                </span>
                            </td>
                            <td className="border px-2 py-1">
                                {student.reading_score ?? "-"}
                                <br />
                                <span className="text-xs italic text-gray-500">
                                    {student.reading_comment}
                                </span>
                            </td>
                            <td className="border px-2 py-1">
                                {student.final_score ?? "-"}
                                <br />
                                <span className="text-xs italic text-gray-500">
                                    {student.final_comment}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
