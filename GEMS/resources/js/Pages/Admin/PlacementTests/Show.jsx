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

// import React, { useRef, useState } from "react";
// import { router, usePage } from "@inertiajs/react";

// export default function Show() {
//     const { test } = usePage().props;
//     const fileInput = useRef();
//     const [uploading, setUploading] = useState(false);

//     const handleDownload = () => {
//         window.location.href = route("placement.download", test.id);
//     };

//     const handleUpload = () => {
//         fileInput.current.click();
//     };

//     const submitUpload = (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         const formData = new FormData();
//         formData.append("file", file);

//         setUploading(true);

//         router.post(route("placement.upload", test.id), formData, {
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

//             {test.status !== "completed" && (
//                 <div className="flex items-center gap-4 mt-6">
//                     <button
//                         onClick={handleDownload}
//                         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                     >
//                         Download Marksheet
//                     </button>

//                     <button
//                         onClick={handleUpload}
//                         className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                         disabled={uploading}
//                     >
//                         {uploading ? "Uploading..." : "Upload Filled Marksheet"}
//                     </button>

//                     <input
//                         type="file"
//                         ref={fileInput}
//                         className="hidden"
//                         onChange={submitUpload}
//                         accept=".xlsx,.xls"
//                     />
//                 </div>
//             )}

//             <div className="mt-10">
//                 <h2 className="text-lg font-semibold mb-3">
//                     Registered Students
//                 </h2>
//                 <table className="w-full border text-sm">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th className="border px-2 py-1">ID</th>
//                             <th className="border px-2 py-1">Name</th>
//                             <th className="border px-2 py-1">Email</th>
//                             <th className="border px-2 py-1">Writing</th>
//                             <th className="border px-2 py-1">Speaking</th>
//                             <th className="border px-2 py-1">Listening</th>
//                             <th className="border px-2 py-1">Reading</th>
//                             <th className="border px-2 py-1">Final Score</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {test.results.map((result) => (
//                             <tr key={result.id}>
//                                 <td className="border px-2 py-1">
//                                     {result.student.id}
//                                 </td>
//                                 <td className="border px-2 py-1">
//                                     {result.student.user.name}
//                                 </td>
//                                 <td className="border px-2 py-1">
//                                     {result.student.user.email}
//                                 </td>
//                                 <td className="border px-2 py-1">
//                                     {result.writing_score ?? "-"}
//                                     <br />
//                                     <span className="text-xs italic">
//                                         {result.writing_comment}
//                                     </span>
//                                 </td>
//                                 <td className="border px-2 py-1">
//                                     {result.speaking_score ?? "-"}
//                                     <br />
//                                     <span className="text-xs italic">
//                                         {result.speaking_comment}
//                                     </span>
//                                 </td>
//                                 <td className="border px-2 py-1">
//                                     {result.listening_score ?? "-"}
//                                     <br />
//                                     <span className="text-xs italic">
//                                         {result.listening_comment}
//                                     </span>
//                                 </td>
//                                 <td className="border px-2 py-1">
//                                     {result.reading_score ?? "-"}
//                                     <br />
//                                     <span className="text-xs italic">
//                                         {result.reading_comment}
//                                     </span>
//                                 </td>
//                                 <td className="border px-2 py-1">
//                                     {result.final_score ?? "-"}
//                                     <br />
//                                     <span className="text-xs italic">
//                                         {result.final_comment}
//                                     </span>
//                                 </td>
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
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DownloadIcon from '@mui/icons-material/Download';
import UploadFileIcon from '@mui/icons-material/UploadFile';

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
    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Placement Test Details
          </h2>
        </div>
      }
    >
      <section className="max-w-5xl mx-auto mt-8 px-4">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            {test.title}
          </h1>
          <div className="mb-6 flex flex-wrap items-center gap-6">
            <div className="text-base text-gray-600">
              <strong>Status:</strong>{" "}
              <span className={`capitalize px-2 py-1 rounded font-semibold ${
                test.status === "completed"
                  ? "bg-green-100 text-green-700"
                  : test.status === "scheduled"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700"
              }`}>
                {test.status}
              </span>
            </div>
            {test.status !== "completed" && (
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition font-semibold"
                >
                  <DownloadIcon fontSize="small" />
                  Download Marksheet
                </button>
                <button
                  onClick={handleUpload}
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition font-semibold"
                  disabled={uploading}
                >
                  <UploadFileIcon fontSize="small" />
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
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Registered Students
            </h2>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full text-sm text-gray-700 bg-white">
                <thead>
                  <tr className="bg-gray-50 text-base">
                    <th className="p-4 font-semibold">ID</th>
                    <th className="p-4 font-semibold">Name</th>
                    <th className="p-4 font-semibold">Email</th>
                    <th className="p-4 font-semibold">Writing</th>
                    <th className="p-4 font-semibold">Speaking</th>
                    <th className="p-4 font-semibold">Listening</th>
                    <th className="p-4 font-semibold">Reading</th>
                    <th className="p-4 font-semibold">Final Score</th>
                  </tr>
                </thead>
                <tbody>
                  {test.results.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-gray-500 bg-gray-50">
                        No results available.
                      </td>
                    </tr>
                  ) : (
                    test.results.map((result) => (
                      <tr key={result.id} className="border-b last:border-none hover:bg-gray-50">
                        <td className="p-4 align-middle">{result.student.id}</td>
                        <td className="p-4 align-middle">{result.student.user.name}</td>
                        <td className="p-4 align-middle">{result.student.user.email}</td>
                        <td className="p-4 align-middle">
                          <div className="flex flex-col">
                            <span className="font-semibold text-base">{result.writing_score ?? "-"}</span>
                            {result.writing_comment && (
                              <span className="text-xs text-gray-500 italic mt-1">{result.writing_comment}</span>
                            )}
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex flex-col">
                            <span className="font-semibold text-base">{result.speaking_score ?? "-"}</span>
                            {result.speaking_comment && (
                              <span className="text-xs text-gray-500 italic mt-1">{result.speaking_comment}</span>
                            )}
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex flex-col">
                            <span className="font-semibold text-base">{result.listening_score ?? "-"}</span>
                            {result.listening_comment && (
                              <span className="text-xs text-gray-500 italic mt-1">{result.listening_comment}</span>
                            )}
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex flex-col">
                            <span className="font-semibold text-base">{result.reading_score ?? "-"}</span>
                            {result.reading_comment && (
                              <span className="text-xs text-gray-500 italic mt-1">{result.reading_comment}</span>
                            )}
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex flex-col">
                            <span className="font-bold text-lg text-green-700">{result.final_score ?? "-"}</span>
                            {result.final_comment && (
                              <span className="text-xs text-gray-500 italic mt-1">{result.final_comment}</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </AuthenticatedLayout>
  );
}
