// import { useState } from "react";
// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Head } from "@inertiajs/react";

// export default function Index({ students }) {
//     const [modalOpen, setModalOpen] = useState(false);
//     const [selectedDocument, setSelectedDocument] = useState(null);

//     // Function to open the modal with the document
//     const openModal = (documentUrl) => {
//         setSelectedDocument(documentUrl);
//         setModalOpen(true);
//     };
//     return (
//         <AuthenticatedLayout
//             header={
//                 <h2 className="text-xl font-semibold leading-tight text-gray-800">
//                     Student List
//                 </h2>
//             }
//         >
//             <Head title="Students" />

//             <div className="py-12">
//                 <div className="mx-auto sm:px-6 lg:px-8">
//                     <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
//                         <table className="min-w-full bg-white border border-gray-200">
//                             <thead>
//                                 <tr className="bg-gray-100">
//                                     <th className="border px-4 py-2">Name</th>
//                                     <th className="border px-4 py-2">Email</th>
//                                     <th className="border px-4 py-2">Account Status</th>
//                                     <th className="border px-4 py-2">DOB</th>
//                                     <th className="border px-4 py-2">Gender</th>
//                                     <th className="border px-4 py-2">
//                                         Nationality
//                                     </th>
//                                     <th className="border px-4 py-2">NIC</th>
//                                     <th className="border px-4 py-2">Course</th>
//                                     <th className="border px-4 py-2">
//                                         Payment Method
//                                     </th>
//                                     <th className="border px-4 py-2">
//                                         Student Status
//                                     </th>
//                                     <th className="border px-4 py-2">
//                                         Documents
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {students.length > 0 ? (
//                                     students.map((student, index) => (
//                                         <tr key={index} className="text-center">
//                                             <td className="border px-4 py-2">
//                                                 {student.name}
//                                             </td>
//                                             <td className="border px-4 py-2">
//                                                 {student.email}
//                                             </td>
//                                             <td className="border px-4 py-2">
//                                                 {student.status}
//                                             </td>
//                                             <td className="border px-4 py-2">
//                                                 {student.dob}
//                                             </td>
//                                             <td className="border px-4 py-2">
//                                                 {student.gender}
//                                             </td>
//                                             <td className="border px-4 py-2">
//                                                 {student.nationality}
//                                             </td>
//                                             <td className="border px-4 py-2">
//                                                 {student.nic}
//                                             </td>
//                                             <td className="border px-4 py-2">
//                                                 {student.preferred_course}
//                                             </td>
//                                             <td className="border px-4 py-2">
//                                                 {student.payment_method}
//                                             </td>
//                                             <td className="border px-4 py-2">
//                                                 {student.student_status}
//                                             </td>
//                                             {/* <td className="border px-4 py-2">
//                                                 {student.identification_document &&
//                                                     (student.identification_document.endsWith(
//                                                         ".pdf"
//                                                     ) ? (
//                                                         <a
//                                                             href={
//                                                                 student.identification_document
//                                                             }
//                                                             target="_blank"
//                                                             className="text-blue-500 hover:underline"
//                                                         >
//                                                             View ID (PDF)
//                                                         </a>
//                                                     ) : (
//                                                         <img
//                                                             src={
//                                                                 student.identification_document
//                                                             }
//                                                             alt="ID Document"
//                                                             className="h-16 w-16 object-cover rounded"
//                                                         />
//                                                     ))}
//                                                 {" | "}
//                                                 {student.payment_receipt &&
//                                                     (student.payment_receipt.endsWith(
//                                                         ".pdf"
//                                                     ) ? (
//                                                         <a
//                                                             href={
//                                                                 student.payment_receipt
//                                                             }
//                                                             target="_blank"
//                                                             className="text-blue-500 hover:underline"
//                                                         >
//                                                             View Receipt (PDF)
//                                                         </a>
//                                                     ) : (
//                                                         <img
//                                                             src={
//                                                                 student.payment_receipt
//                                                             }
//                                                             alt="Payment Receipt"
//                                                             className="h-16 w-16 object-cover rounded"
//                                                         />
//                                                     ))}
//                                             </td> */}
//                                             <td className="border p-2">
//                                                 {student.payment_receipt && (
//                                                     <button
//                                                         onClick={() =>
//                                                             openModal(
//                                                                 student.payment_receipt
//                                                             )
//                                                         }
//                                                         className="text-green-500 hover:underline"
//                                                     >
//                                                         View Receipt
//                                                     </button>
//                                                 )}
//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td
//                                             colSpan="11"
//                                             className="text-center py-4"
//                                         >
//                                             No students found.
//                                         </td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                         <div>
//                             {/* Modal for Viewing Document */}
//                             {modalOpen && (
//                                 <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
//                                     <div className="bg-white p-4 rounded-lg shadow-lg max-w-3xl">
//                                         <button
//                                             className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
//                                             onClick={() => setModalOpen(false)}
//                                         >
//                                             ✖
//                                         </button>
//                                         <div className="mt-4">
//                                             {selectedDocument.endsWith(
//                                                 ".pdf"
//                                             ) ? (
//                                                 <iframe
//                                                     src={selectedDocument}
//                                                     className="w-full h-[500px]"
//                                                     title="Document"
//                                                 />
//                                             ) : (
//                                                 <img
//                                                     src={selectedDocument}
//                                                     alt="Document Preview"
//                                                     className="w-full h-auto rounded-lg"
//                                                 />
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ViewStudents from "@/Pages/Users/Students/Pages/ViewStudents";
import { Link } from "@inertiajs/react";
import StaffList from "@/Pages/Users/Staff/StaffList";

export default function Index({ students, auth, staffList }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Students
                </h2>
                {auth.user.role === "admin" && (
                    <Link
                        href={route("admin.students.create")}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                    >
                        + Add New Student
                    </Link>
                )}
            </div>
                
            }
        >
            <Head title="Students" />
            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <ViewStudents students={students} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
