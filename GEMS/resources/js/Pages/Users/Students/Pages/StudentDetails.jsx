// export default function StudentDetails({ student }) {
//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div><strong>Name:</strong> {student.name}</div>
//             <div><strong>Email:</strong> {student.email}</div>
//             <div><strong>Status:</strong> {student.status}</div>
//             <div><strong>DOB:</strong> {student.dob}</div>
//             <div><strong>Gender:</strong> {student.gender}</div>
//             <div><strong>Nationality:</strong> {student.nationality}</div>
//             <div><strong>Required Course:</strong> {student.preferred_course}</div>
//             <div><strong>Payment Method:</strong> {student.payment_method}</div>
//             <div><strong>Student Status:</strong> {student.student_status}</div>
//             {student.payment_receipt && (
//                 <div className="col-span-2">
//                     <strong>Payment Receipt:</strong><br />
//                     {student.payment_receipt.endsWith(".pdf") ? (
//                         <iframe src={student.payment_receipt} className="w-full h-[400px]" />
//                     ) : (
//                         <img src={student.payment_receipt} className="w-full max-h-[400px] rounded" />
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// }



import React from "react";

// Helper for status badge colors
const statusBadge = (status) => {
  let color = "bg-gray-100 text-gray-700";
  if (status === "active") color = "bg-green-100 text-green-700";
  else if (status === "inactive") color = "bg-yellow-100 text-yellow-700";
  else if (status === "blocked") color = "bg-red-100 text-red-700";
  return (
    <span className={`inline-block px-3 py-0.5 rounded-full font-semibold text-xs capitalize ${color}`}>
      {status}
    </span>
  );
};

export default function StudentDetails({ student }) {
  return (
    <section className="max-w-7xl mx-auto mt-8 px-4">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Student Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-base text-gray-700">
          <div>
            <span className="font-semibold">Name:</span> {student.name}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {student.email}
          </div>
          <div>
            <span className="font-semibold">Status:</span> {statusBadge(student.status)}
          </div>
          <div>
            <span className="font-semibold">DOB:</span> {student.dob}
          </div>
          <div>
            <span className="font-semibold">Gender:</span> {student.gender}
          </div>
          <div>
            <span className="font-semibold">Nationality:</span> {student.nationality}
          </div>
          <div>
            <span className="font-semibold">Required Course:</span> {student.preferred_course}
          </div>
          <div>
            <span className="font-semibold">Payment Method:</span> {student.payment_method}
          </div>
          <div>
            <span className="font-semibold">Student Status:</span> {student.student_status}
          </div>
          {student.payment_receipt && (
            <div className="col-span-1 md:col-span-2 mt-4">
              <span className="font-semibold block mb-2">Payment Receipt:</span>
              {student.payment_receipt.endsWith(".pdf") ? (
                <iframe
                  src={student.payment_receipt}
                  className="w-full h-[400px] border rounded"
                  title="Payment Receipt"
                />
              ) : (
                <img
                  src={student.payment_receipt}
                  alt="Payment Receipt"
                  className="w-full max-h-[400px] rounded object-contain border"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
