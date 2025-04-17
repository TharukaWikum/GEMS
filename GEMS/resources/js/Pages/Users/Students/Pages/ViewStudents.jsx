import { useState } from "react";

export default function ViewStudents({ students }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);

    const openModal = (documentUrl) => {
        setSelectedDocument(documentUrl);
        setModalOpen(true);
    };

    return (
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
            <div className="text-2xl font-semibold m-2 mb-3">Student List</div>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100 text-sm">
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Account Status</th>
                        <th className="border px-4 py-2">DOB</th>
                        <th className="border px-4 py-2">Gender</th>
                        <th className="border px-4 py-2">Nationality</th>
                        <th className="border px-4 py-2">NIC</th>
                        <th className="border px-4 py-2">Course</th>
                        <th className="border px-4 py-2">Payment Method</th>
                        <th className="border px-4 py-2">Student Status</th>
                        <th className="border px-4 py-2">Documents</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length > 0 ? (
                        students.map((student, index) => (
                            <tr key={index} className="text-center text-sm">
                                <td className="border px-4 py-2">{student.name}</td>
                                <td className="border px-4 py-2">{student.email}</td>
                                <td className="border px-4 py-2">{student.status}</td>
                                <td className="border px-4 py-2">{student.dob}</td>
                                <td className="border px-4 py-2">{student.gender}</td>
                                <td className="border px-4 py-2">{student.nationality}</td>
                                <td className="border px-4 py-2">{student.nic}</td>
                                <td className="border px-4 py-2">{student.preferred_course}</td>
                                <td className="border px-4 py-2">{student.payment_method}</td>
                                <td className="border px-4 py-2">{student.student_status}</td>
                                <td className="border p-2">
                                    {student.payment_receipt && (
                                        <button
                                            onClick={() =>
                                                openModal(student.payment_receipt)
                                            }
                                            className="text-green-500 hover:underline"
                                        >
                                            View Receipt
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="11" className="text-center py-4">
                                No students found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg max-w-3xl w-full relative">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                            onClick={() => setModalOpen(false)}
                        >
                            ✖
                        </button>
                        <div className="mt-4">
                            {selectedDocument.endsWith(".pdf") ? (
                                <iframe
                                    src={selectedDocument}
                                    className="w-full h-[500px]"
                                    title="Document"
                                />
                            ) : (
                                <img
                                    src={selectedDocument}
                                    alt="Document Preview"
                                    className="w-full h-auto rounded-lg"
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
