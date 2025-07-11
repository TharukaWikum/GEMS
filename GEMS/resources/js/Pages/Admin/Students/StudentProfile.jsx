import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";
import StudentDetails from "@/Pages/Users/Students/Pages/StudentDetails";
import AddCourseEnrollmentForm from "./AddCourseEnrollmentForm";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import StaffCourseApplicationForm from "./StaffCourseApplicationForm";
import StaffInstallmentPaymentForm from "./StaffInstallmentPaymentForm";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function StudentProfile({
    auth,
    student,
    courses,
    enrollments,
    applications,
    payments,
    eligibleDates= [],
    examResults = [],
}) {
    const [open, setOpen] = useState(false);

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    console.log("eligibleDates", eligibleDates);

    const hasAppliedOrRegistered = applications.some((app) =>
        ["pending", "registered"].includes(app.status)
    );

    console.log("hasAppliedOrRegistered",hasAppliedOrRegistered)
    console.log("student_status",student.student_status)

    // Find a registered course application with installment type
    const registeredInstallmentApp = applications.find(
        (app) =>
            app.status === "registered" && app.payment_type === "installment"
    );

    // Calculate total paid so far
    const totalPaid = payments
        .filter(
            (p) =>
                p.application_id === registeredInstallmentApp?.id && !p.rejected
        )
        .reduce((sum, p) => sum + p.amount, 0);

    // Check if fully paid
    const isFullyPaid =
        totalPaid >= (registeredInstallmentApp?.full_amount || 0);

    //placement test
    const [scheduledDate, setScheduledDate] = useState("");
    const [processing, setProcessing] = useState(false);

    const handleSchedule = (e) => {
        e.preventDefault();
        if (!scheduledDate) return;

        setProcessing(true);
        router.post(
            route("admin.students.schedule-placement", student.student_id),
            {
                scheduled_date: scheduledDate,
            },
            {
                onFinish: () => setProcessing(false),
            }
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800">
                    Student Profile
                </h2>
            }
        >
            <div className="mt-3 p-4 max-w-4xl mx-auto bg-white shadow rounded">
                {/* Student Info */}
                <div className="mb-4">
                    <StudentDetails student={student} />
                </div>

                <div>
                    {(student.student_status === "registered" ||
                        student.student_status === "placement_scheduled") && (
                        <div className="mt-6 border-t pt-4">
                            <h2 className="text-lg font-bold mb-2">
                                Schedule/Reschedule Placement Test
                            </h2>
                            <form
                                onSubmit={handleSchedule}
                                className="flex flex-col gap-4 max-w-md"
                            >
                                <label className="block">
                                    <span className="text-sm font-medium text-gray-700">
                                        Available Dates
                                    </span>
                                    <select
                                        className="mt-1 block w-full border rounded p-2"
                                        value={scheduledDate}
                                        onChange={(e) =>
                                            setScheduledDate(e.target.value)
                                        }
                                        required
                                    >
                                        <option value="">
                                            -- Select a date --
                                        </option>
                                        {eligibleDates.map((date) => (
                                            <option key={date} value={date}>
                                                {date}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
                                    disabled={processing}
                                >
                                    {processing
                                        ? "Scheduling..."
                                        : "Schedule Test"}
                                </button>
                            </form>
                        </div>
                    )}
                </div>

                {!hasAppliedOrRegistered && student.student_status === "placement_completed" && (
                    <StaffCourseApplicationForm
                        studentId={student.student_id}
                        courses={courses}
                        onClose={closeModal}
                    />
                )}

                {registeredInstallmentApp && !isFullyPaid && (
                    <StaffInstallmentPaymentForm
                        studentId={student.student_id}
                        application={registeredInstallmentApp}
                    />
                )}
                <div>
                    <div className="mt-6">
    <h3 className="text-lg font-semibold mb-2">
        Course Exams & Results
    </h3>
    {examResults.length > 0 ? (
        examResults.map((exam) => (
            <div
                key={exam.exam_id}
                className="bg-white p-4 rounded shadow mb-6"
            >
                <h3 className="text-xl font-bold mb-2">
                    {exam.exam_title}
                </h3>
                <p className="text-gray-600 mb-1">
                    <strong>Course:</strong> {exam.course_name}
                </p>
                <p className="text-gray-600 mb-1">
                    <strong>Date:</strong> {exam.exam_date}
                </p>
                <p className="text-gray-600 mb-3">
                    <strong>Status:</strong> {exam.status}
                </p>

                {exam.results.map((result, i) => (
                    <div key={i} className="mt-2 text-sm text-gray-700 space-y-1">
                        <p><strong>Writing:</strong> {result.writing_score} ({result.writing_comment})</p>
                        <p><strong>Speaking:</strong> {result.speaking_score} ({result.speaking_comment})</p>
                        <p><strong>Listening:</strong> {result.listening_score} ({result.listening_comment})</p>
                        <p><strong>Reading:</strong> {result.reading_score} ({result.reading_comment})</p>
                        <p><strong>Final Score:</strong> {result.final_score} ({result.final_comment})</p>
                    </div>
                ))}
            </div>
        ))
    ) : (
        <p className="text-sm text-gray-500">
            No exams assigned to this student.
        </p>
    )}
</div>


                    <div>
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-2">
                                Course Applications & Payments
                            </h3>
                            {applications.length > 0 ? (
                                <table className="w-full table-auto text-sm border">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="p-2 border">
                                                Course
                                            </th>
                                            <th className="p-2 border">
                                                Payment Type
                                            </th>
                                            <th className="p-2 border">
                                                Amount Paid
                                            </th>
                                            <th className="p-2 border">
                                                Status
                                            </th>
                                            <th className="p-2 border">
                                                Next Due
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {applications.map((app) => (
                                            <tr key={app.id}>
                                                <td className="p-2 border">
                                                    {app.course?.name}
                                                </td>
                                                <td className="p-2 border capitalize">
                                                    {app.payment_type}
                                                </td>
                                                <td className="p-2 border">
                                                    Rs. {app.amount_paid}
                                                </td>
                                                <td className="p-2 border capitalize">
                                                    {app.status}
                                                </td>
                                                <td className="p-2 border">
                                                    {app.next_payment_due_date ||
                                                        "N/A"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-sm text-gray-500">
                                    No applications found.
                                </p>
                            )}
                        </div>

                        <div>
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-2">
                                    All Payments
                                </h3>
                                {payments.length > 0 ? (
                                    <table className="w-full text-sm table-auto border">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="p-2 border">
                                                    Type
                                                </th>
                                                <th className="p-2 border">
                                                    Amount
                                                </th>
                                                <th className="p-2 border">
                                                    Method
                                                </th>
                                                <th className="p-2 border">
                                                    Status
                                                </th>
                                                <th className="p-2 border">
                                                    Date
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {payments.map((pay) => (
                                                <tr key={pay.id}>
                                                    <td className="p-2 border">
                                                        {pay.type}
                                                    </td>
                                                    <td className="p-2 border">
                                                        Rs. {pay.amount}
                                                    </td>
                                                    <td className="p-2 border">
                                                        {pay.method}
                                                    </td>
                                                    <td className="p-2 border">
                                                        {pay.verified
                                                            ? "Verified"
                                                            : pay.rejected
                                                            ? "Rejected"
                                                            : "Pending"}
                                                    </td>
                                                    <td className="p-2 border">
                                                        {pay.created_at}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-sm text-gray-500">
                                        No payments available.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Button */}
                {/* <button
                    onClick={openModal}
                    className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                >
                    + Add Enrollment
                </button>

                <Dialog open={open} onClose={closeModal} fullWidth maxWidth="md" TransitionComponent={Transition}>
                    <div className="relative p-6 bg-white rounded">
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                        >
                            &times;
                        </button>

                        <h2 className="text-lg font-bold text-gray-800 mb-4">Add Course Enrollment</h2>
                        <AddCourseEnrollmentForm
                            studentId={student.id}
                            courses={courses}
                            onClose={closeModal}
                            onSuccess={() => {
                                // Optional: show toast or reload data
                            }}
                        />
                    </div>
                </Dialog> */}
            </div>
        </AuthenticatedLayout>
    );
}
