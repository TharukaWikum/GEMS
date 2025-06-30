// import React from "react";
// import { router } from "@inertiajs/react";

// const VerifyRegistration = ({ pendingPayments }) => {
//     const handleVerify = (id) => {
//         if (confirm("Are you sure you want to verify this payment?")) {
//             router.post(`/admin/payments/${id}/verify`);
//         }
//     };

//     return (
//         <div className="p-6">
//             <h1 className="text-xl font-bold mb-4">
//                 Pending Registration Payments
//             </h1>
//             <table className="table-auto w-full border">
//                 <thead>
//                     <tr className="bg-gray-200">
//                         <th className="p-2 border">Student</th>
//                         <th className="p-2 border">Email</th>
//                         <th className="p-2 border">Amount</th>
//                         <th className="p-2 border">Method</th>
//                         <th className="p-2 border">receipt</th>
//                         <th className="p-2 border">Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {pendingPayments.map((payment) => (
//                         <tr key={payment.id} className="border">
//                             <td className="p-2">{payment.student.user.name}</td>
//                             <td className="p-2">
//                                 {payment.student.user.email}
//                             </td>
//                             <td className="p-2">{payment.amount}</td>
//                             <td className="p-2">{payment.method}</td>
//                             <td className="p-2">
//                                 {" "}
//                                 {payment.method === "Online Transfer" &&
//                                     payment.receipt && (
//                                         <a
//                                             href={`/storage/${payment.receipt}`}
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                             className="text-blue-500 underline"
//                                         >
//                                             View Receipt
//                                         </a>
//                                     )}
//                             </td>
//                             <td className="p-2">
//                                 <button
//                                     className="bg-green-500 text-white px-4 py-1 rounded"
//                                     onClick={() => handleVerify(payment.id)}
//                                 >
//                                     Verify
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default VerifyRegistration;

// resources/js/Pages/Admin/Payments/VerifyRegistration.jsx
// import React, { useState } from "react";
// import { router } from "@inertiajs/react";

// const VerifyRegistration = ({ pendingPayments }) => {
//     const handleVerify = (id) => {
//         if (confirm("Verify this payment?")) {
//             router.post(`/admin/payments/${id}/verify`);
//         }
//     };

//     const [rejectingId, setRejectingId] = useState(null);
//     const [reason, setReason] = useState("");

//     const handleReject = (id) => {
//         setRejectingId(id);
//     };

//     const submitRejection = () => {
//         router.post(`/payments/${rejectingId}/reject`, { reason });
//         setRejectingId(null);
//         setReason("");
//     };

//     return (
//         <div>
//             <h2 className="text-xl font-bold mb-4">
//                 Verify Registration Payments
//             </h2>
//             <table className="table-auto w-full border">
//                 <thead>
//                     <tr className="bg-gray-200">
//                         <th className="p-2 border">Student</th>
//                         <th className="p-2 border">Email</th>
//                         <th className="p-2 border">Amount</th>
//                         <th className="p-2 border">Method</th>
//                         <th className="p-2 border">Receipt</th>
//                         <th className="p-2 border">Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {pendingPayments.map((payment) => (
//                         <tr key={payment.id}>
//                             <td className="p-2 border">
//                                 {payment.student.user.name}
//                             </td>
//                             <td className="p-2 border">
//                                 {payment.student.user.email}
//                             </td>
//                             <td className="p-2 border">{payment.amount}</td>
//                             <td className="p-2 border">{payment.method}</td>
//                             <td className="p-2 border">
//                                 {payment.receipt ? (
//                                     <a
//                                         href={`/storage/${payment.receipt}`}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="text-blue-500 underline"
//                                     >
//                                         View
//                                     </a>
//                                 ) : (
//                                     "N/A"
//                                 )}
//                             </td>
//                             <td className="p-2 border">
//                                 <button
//                                     onClick={() => handleVerify(payment.id)}
//                                     className="bg-green-600 text-white px-3 py-1 rounded"
//                                 >
//                                     Verify
//                                 </button>
//                                 <button
//                                     className="bg-red-600 text-white px-3 py-1 rounded mr-2"
//                                     onClick={() => handleReject(payment.id)}
//                                 >
//                                     Reject
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default VerifyRegistration;


// import React, { useState } from "react";
// import { router } from "@inertiajs/react";
// import Modal from "@/Components/Modal";
// import TextInput from "@/Components/TextInput";
// import InputLabel from "@/Components/InputLabel";
// import InputError from "@/Components/InputError";
// import PrimaryButton from "@/Components/PrimaryButton";

// const VerifyRegistration = ({ pendingPayments }) => {
//     const [rejectingId, setRejectingId] = useState(null);
//     const [reason, setReason] = useState("");
//     const [errors, setErrors] = useState({});

//     const handleVerify = (id) => {
//         if (confirm("Verify this payment?")) {
//             router.post(`/admin/payments/${id}/verify`);
//         }
//     };

//     const openRejectModal = (id) => {
//         setRejectingId(id);
//         setReason("");
//         setErrors({});
//     };

//     const closeRejectModal = () => {
//         setRejectingId(null);
//         setReason("");
//         setErrors({});
//     };

//     const submitRejection = (e) => {
//         e.preventDefault();
//         router.post(
//             `/payments/${rejectingId}/reject`,
//             { reason },
//             {
//                 onSuccess: () => closeRejectModal(),
//                 onError: (err) => setErrors(err),
//             }
//         );
//     };

//     return (
//         <div>
//             <h2 className="text-xl font-bold mb-4">
//                 Verify Registration Payments
//             </h2>

//             <table className="table-auto w-full border">
//                 <thead>
//                     <tr className="bg-gray-200">
//                         <th className="p-2 border">Student</th>
//                         <th className="p-2 border">Email</th>
//                         <th className="p-2 border">Amount</th>
//                         <th className="p-2 border">Method</th>
//                         <th className="p-2 border">Receipt</th>
//                         <th className="p-2 border">Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {pendingPayments.map((payment) => (
//                         <tr key={payment.id}>
//                             <td className="p-2 border">
//                                 {payment.student.user.name}
//                             </td>
//                             <td className="p-2 border">
//                                 {payment.student.user.email}
//                             </td>
//                             <td className="p-2 border">{payment.amount}</td>
//                             <td className="p-2 border">{payment.method}</td>
//                             <td className="p-2 border">
//                                 {payment.receipt ? (
//                                     <a
//                                         href={`/storage/${payment.receipt}`}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="text-blue-500 underline"
//                                     >
//                                         View
//                                     </a>
//                                 ) : (
//                                     "N/A"
//                                 )}
//                             </td>
//                             <td className="p-2 border space-x-2">
//                                 <button
//                                     onClick={() => handleVerify(payment.id)}
//                                     className="bg-green-600 text-white px-3 py-1 rounded"
//                                 >
//                                     Verify
//                                 </button>
//                                 <button
//                                     onClick={() => openRejectModal(payment.id)}
//                                     className="bg-red-600 text-white px-3 py-1 rounded"
//                                 >
//                                     Reject
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {/* Rejection Modal */}
//             <Modal show={rejectingId !== null} onClose={closeRejectModal}>
//                 <form onSubmit={submitRejection} className="p-6">
//                     <h2 className="text-lg font-semibold text-gray-800 mb-4">
//                         Reject Payment
//                     </h2>

//                     <div className="mb-4">
//                         <InputLabel htmlFor="reason" value="Rejection Reason" />
//                         <TextInput
//                             id="reason"
//                             name="reason"
//                             className="mt-1 block w-full"
//                             value={reason}
//                             onChange={(e) => setReason(e.target.value)}
//                             required
//                         />
//                         <InputError message={errors.reason} className="mt-2" />
//                     </div>

//                     <div className="mt-6 flex justify-end space-x-3">
//                         <button
//                             type="button"
//                             onClick={closeRejectModal}
//                             className="px-4 py-2 bg-gray-500 text-white rounded"
//                         >
//                             Cancel
//                         </button>
//                         <PrimaryButton type="submit">Submit Rejection</PrimaryButton>
//                     </div>
//                 </form>
//             </Modal>
//         </div>
//     );
// };

// export default VerifyRegistration;



// File: PendingPaymentsTable.jsx

import React, { useState } from "react";
import { router } from "@inertiajs/react";

export default function PendingPaymentsTable({ payments }) {
    const [rejectingId, setRejectingId] = useState(null);
    const [reason, setReason] = useState("");

    const handleVerify = (id) => {
        if (confirm("Verify this payment?")) {
            router.post(`/admin/payments/${id}/verify`);
        }
    };

    const handleReject = (id) => {
        setRejectingId(id);
    };

    const submitRejection = () => {
        if (!reason.trim()) return alert("Please provide a reason.");
        router.post(`/admin/payments/${rejectingId}/reject`, { reason });
        setRejectingId(null);
        setReason("");
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-3">Pending Payments</h2>
            <table className="w-full table-auto border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">Student</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Type</th>
                        <th className="border p-2">Amount</th>
                        <th className="border p-2">Method</th>
                        <th className="border p-2">Receipt</th>
                        <th className="border p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment.id}>
                            <td className="border p-2">{payment.student.user.name}</td>
                            <td className="border p-2">{payment.student.user.email}</td>
                            <td className="border p-2 capitalize">{payment.type}</td>
                            <td className="border p-2">{payment.amount}</td>
                            <td className="border p-2">{payment.method}</td>
                            <td className="border p-2">
                                {payment.receipt ? (
                                    <a
                                        href={`/storage/${payment.receipt}`}
                                        target="_blank"
                                        className="text-blue-500 underline"
                                    >
                                        View
                                    </a>
                                ) : "N/A"}
                            </td>
                            <td className="border p-2 space-x-2">
                                <button
                                    onClick={() => handleVerify(payment.id)}
                                    className="bg-green-600 text-white px-3 py-1 rounded"
                                >
                                    Verify
                                </button>
                                <button
                                    onClick={() => handleReject(payment.id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {rejectingId && (
                <div className="mt-4 bg-gray-100 p-4 rounded shadow">
                    <h3 className="font-semibold text-lg">Reject Payment</h3>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-full border rounded mt-2 p-2"
                        placeholder="Enter reason for rejection..."
                    />
                    <div className="mt-2 space-x-2">
                        <button
                            onClick={submitRejection}
                            className="bg-red-600 text-white px-4 py-1 rounded"
                        >
                            Submit
                        </button>
                        <button
                            onClick={() => {
                                setRejectingId(null);
                                setReason("");
                            }}
                            className="bg-gray-500 text-white px-4 py-1 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
