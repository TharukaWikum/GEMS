// import React, { useRef, useState } from 'react';
// import { router, usePage } from '@inertiajs/react';

// export default function Show() {
//     const { test } = usePage().props;
//     const fileInput = useRef();
//     const [uploading, setUploading] = useState(false);

//     const handleDownload = () => {
//         window.location.href = route('placement.download', test.id);
//     };

//     const handleUpload = () => {
//         fileInput.current.click();
//     };

//     const submitUpload = (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         const formData = new FormData();
//         formData.append('file', file);

//         setUploading(true);

//         router.post(route('placement.upload', test.id), formData, {
//             onFinish: () => setUploading(false),
//         });
//     };

//     return (
//         <div className="p-6 max-w-4xl mx-auto">
//             <h1 className="text-2xl font-bold mb-4">
//                 Placement Test: {test.title}
//             </h1>
//             <p className="mb-2">
//                 <strong>Status:</strong> {test.status}
//             </p>

//             <div className="flex items-center gap-4 mt-6">
//                 <button
//                     onClick={handleDownload}
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 >
//                     Download Marksheet
//                 </button>

//                 <button
//                     onClick={handleUpload}
//                     className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                     disabled={uploading}
//                 >
//                     {uploading ? 'Uploading...' : 'Upload Filled Marksheet'}
//                 </button>
//                 <input
//                     type="file"
//                     ref={fileInput}
//                     className="hidden"
//                     onChange={submitUpload}
//                     accept=".xlsx,.xls"
//                 />
//             </div>

//             <div className="mt-10">
//                 <h2 className="text-lg font-semibold mb-3">Registered Students</h2>
//                 <table className="w-full border text-sm">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th className="border px-2 py-1">ID</th>
//                             <th className="border px-2 py-1">Name</th>
//                             <th className="border px-2 py-1">Email</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {test.results.map((result) => (
//                             <tr key={result.id}>
//                                 <td className="border px-2 py-1">{result.student.id}</td>
//                                 <td className="border px-2 py-1">{result.student.user.name}</td>
//                                 <td className="border px-2 py-1">{result.student.user.email}</td>
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

export default function Show() {
    const { test } = usePage().props;
    const fileInput = useRef();
    const [uploading, setUploading] = useState(false);

    const handleDownload = () => {
        window.location.href = route("placement.download", test.id);
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

        router.post(route("placement.upload", test.id), formData, {
            onFinish: () => setUploading(false),
        });
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">
                Placement Test: {test.title}
            </h1>
            <p className="mb-2">
                <strong>Status:</strong> {test.status}
            </p>

            {test.status !== "completed" && (
                <div className="flex items-center gap-4 mt-6">
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
                        {uploading ? "Uploading..." : "Upload Filled Marksheet"}
                    </button>

                    <input
                        type="file"
                        ref={fileInput}
                        className="hidden"
                        onChange={submitUpload}
                        accept=".xlsx,.xls"
                    />
                </div>
            )}

            <div className="mt-10">
                <h2 className="text-lg font-semibold mb-3">
                    Registered Students
                </h2>
                <table className="w-full border text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-2 py-1">ID</th>
                            <th className="border px-2 py-1">Name</th>
                            <th className="border px-2 py-1">Email</th>
                            <th className="border px-2 py-1">Writing</th>
                            <th className="border px-2 py-1">Speaking</th>
                            <th className="border px-2 py-1">Listening</th>
                            <th className="border px-2 py-1">Reading</th>
                            <th className="border px-2 py-1">Final Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {test.results.map((result) => (
                            <tr key={result.id}>
                                <td className="border px-2 py-1">
                                    {result.student.id}
                                </td>
                                <td className="border px-2 py-1">
                                    {result.student.user.name}
                                </td>
                                <td className="border px-2 py-1">
                                    {result.student.user.email}
                                </td>
                                <td className="border px-2 py-1">
                                    {result.writing_score ?? "-"}
                                    <br />
                                    <span className="text-xs italic">
                                        {result.writing_comment}
                                    </span>
                                </td>
                                <td className="border px-2 py-1">
                                    {result.speaking_score ?? "-"}
                                    <br />
                                    <span className="text-xs italic">
                                        {result.speaking_comment}
                                    </span>
                                </td>
                                <td className="border px-2 py-1">
                                    {result.listening_score ?? "-"}
                                    <br />
                                    <span className="text-xs italic">
                                        {result.listening_comment}
                                    </span>
                                </td>
                                <td className="border px-2 py-1">
                                    {result.reading_score ?? "-"}
                                    <br />
                                    <span className="text-xs italic">
                                        {result.reading_comment}
                                    </span>
                                </td>
                                <td className="border px-2 py-1">
                                    {result.final_score ?? "-"}
                                    <br />
                                    <span className="text-xs italic">
                                        {result.final_comment}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
