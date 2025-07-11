// import React, { useState } from 'react';
// import { router } from '@inertiajs/react';


// export default function Show({ exam }) {
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = () => {
//     if (!file) return;
//     const formData = new FormData();
//     formData.append('file', file);
//     setUploading(true);

//     router.post(
//       `/admin/course-exams/${exam.id}/upload`,
//       formData,
//       {
//         forceFormData: true,
//         onSuccess: () => {
//           alert('Results uploaded successfully');
//           setFile(null);
//         },
//         onFinish: () => setUploading(false),
//       }
//     );
//   };

//   const handleDownload = () => {
//     window.location.href = `/admin/course-exams/${exam.id}/download`;
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold">Exam: {exam.title}</h1>
//       <p>Status: <strong>{exam.status}</strong></p>

//       <div className="mt-4">
//         <button
//           onClick={handleDownload}
//           className="bg-blue-600 text-white px-4 py-2 rounded mr-4"
//         >
//           Download Marksheet
//         </button>

//         <input type="file" onChange={handleFileChange} className="mb-2" />

//         <button
//           onClick={handleUpload}
//           disabled={!file || uploading}
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           {uploading ? 'Uploading...' : 'Upload Filled Marksheet'}
//         </button>
//       </div>
//     </div>
//   );
// }


// import React from "react";

// export default function MarksheetSection({ exam }) {
//     return (
//         <div className="bg-white p-6 rounded shadow space-y-4 mt-6">
//             {/* 🔽 Download / Upload Marksheet */}
//             <div className="flex gap-4">
//                 <a
//                     href={route("admin.course_exams.download", exam.id)}
//                     className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                 >
//                     Download Marksheet
//                 </a>

//                 <form
//                     method="POST"
//                     encType="multipart/form-data"
//                     action={route("admin.course_exams.upload", exam.id)}
//                 >
//                     <input type="file" name="file" className="mb-2" required />
//                     <button
//                         type="submit"
//                         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                     >
//                         Upload Marksheet
//                     </button>
//                 </form>
//             </div>

//             {/* 🔽 Student Marks Table */}
//             <h4 className="text-lg font-semibold mt-6">Student Marks</h4>
//             <div className="overflow-x-auto">
//                 <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm">
//                     <thead className="bg-gray-100">
//                         <tr>
//                             <th className="border px-2 py-1">Name</th>
//                             <th className="border px-2 py-1">Email</th>
//                             <th className="border px-2 py-1">Writing</th>
//                             <th className="border px-2 py-1">Speaking</th>
//                             <th className="border px-2 py-1">Listening</th>
//                             <th className="border px-2 py-1">Reading</th>
//                             <th className="border px-2 py-1">Final</th>
//                             <th className="border px-2 py-1">Comments</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {exam.students.map((student) => (
//                             <tr key={student.id}>
//                                 <td className="border px-2 py-1">{student.name}</td>
//                                 <td className="border px-2 py-1">{student.email}</td>
//                                 <td className="border px-2 py-1">{student.pivot?.writing_score ?? ''}</td>
//                                 <td className="border px-2 py-1">{student.pivot?.speaking_score ?? ''}</td>
//                                 <td className="border px-2 py-1">{student.pivot?.listening_score ?? ''}</td>
//                                 <td className="border px-2 py-1">{student.pivot?.reading_score ?? ''}</td>
//                                 <td className="border px-2 py-1">{student.pivot?.final_score ?? ''}</td>
//                                 <td className="border px-2 py-1">{student.pivot?.final_comment ?? ''}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

import React, { useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";

export default function CourseExamMarks() {
    const { exam } = usePage().props;
    const fileInput = useRef();
    const [uploading, setUploading] = useState(false);

    const handleDownload = () => {
        window.location.href = route("admin.course_exams.download", exam.id);
    };

    const handleUpload = () => {
        fileInput.current.click();
    };

    const submitUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        setUploading(true);

        router.post(route("admin.course_exams.upload", exam.id), formData, {
            preserveScroll: true,
            forceFormData: true,
            onFinish: () => setUploading(false),
        });
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-4">
                <button
                    onClick={handleDownload}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Download Marksheet
                </button>

                <button
                    onClick={handleUpload}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    disabled={uploading}
                >
                    {uploading ? "Uploading..." : "Upload Marksheet"}
                </button>

                <input
                    type="file"
                    ref={fileInput}
                    className="hidden"
                    onChange={submitUpload}
                    accept=".xlsx,.xls"
                />
            </div>
        </div>
    );
}
