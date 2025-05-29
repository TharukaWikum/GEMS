export default function StudentDetails({ student }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><strong>Name:</strong> {student.name}</div>
            <div><strong>Email:</strong> {student.email}</div>
            <div><strong>Status:</strong> {student.status}</div>
            <div><strong>DOB:</strong> {student.dob}</div>
            <div><strong>Gender:</strong> {student.gender}</div>
            <div><strong>Nationality:</strong> {student.nationality}</div>
            <div><strong>Required Course:</strong> {student.preferred_course}</div>
            <div><strong>Payment Method:</strong> {student.payment_method}</div>
            <div><strong>Student Status:</strong> {student.student_status}</div>
            {student.payment_receipt && (
                <div className="col-span-2">
                    <strong>Payment Receipt:</strong><br />
                    {student.payment_receipt.endsWith(".pdf") ? (
                        <iframe src={student.payment_receipt} className="w-full h-[400px]" />
                    ) : (
                        <img src={student.payment_receipt} className="w-full max-h-[400px] rounded" />
                    )}
                </div>
            )}
        </div>
    );
}
