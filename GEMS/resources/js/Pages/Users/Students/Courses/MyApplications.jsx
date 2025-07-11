import React from "react";
import ResubmitCoursePaymentForm from "./ResubmitCoursePaymentForm"; // 🔁 import this component

export default function MyApplications({ applications }) {
    const pendingApps = applications.filter((app) => app.status === "pending");
    const registeredApps = applications.filter(
        (app) => app.status === "registered"
    );
    const completedApps = applications.filter(
        (app) => app.status === "completed"
    );

    return (
        <div className="bg-white p-6 rounded shadow mt-8">
            <h2 className="text-lg font-semibold mb-4">
                My Course Applications
            </h2>
            <table className="w-full border mb-6">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">Course</th>
                        <th className="p-2 border">Payment Type</th>
                        <th className="p-2 border">Amount Paid</th>
                        <th className="p-2 border">Full Amount</th>
                        <th className="p-2 border">Due Date</th>
                        <th className="p-2 border">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((app) => (
                        <React.Fragment key={app.id}>
                            <tr>
                                <td className="p-2 border">
                                    {app.course.name}
                                </td>
                                <td className="p-2 border capitalize">
                                    {app.payment_type}
                                </td>
                                <td className="p-2 border">
                                    Rs. {app.amount_paid}
                                </td>
                                <td className="p-2 border">
                                    Rs. {app.full_amount}
                                </td>
                                <td className="p-2 border">
                                    {app.next_payment_due_date ?? "N/A"}
                                </td>
                                <td className="p-2 border capitalize">
                                    <span
                                        className={`px-2 py-1 rounded text-white text-xs ${
                                            app.status === "registered"
                                                ? "bg-green-500"
                                                : app.status === "pending"
                                                ? "bg-yellow-500"
                                                : app.status === "cancelled"
                                                ? "bg-red-500"
                                                : "bg-gray-500"
                                        }`}
                                    >
                                        {app.status}
                                    </span>
                                </td>
                            </tr>

                            {/* ✅ Conditional row for resubmitting initial payment */}
                            {app.status === "cancelled" &&
                                app.payments?.some(
                                    (p) =>
                                        p.type === "course" &&
                                        p.rejected &&
                                        !p.verified
                                ) &&
                                !app.payments?.some(
                                    (p) =>
                                        p.type === "course" &&
                                        !p.rejected &&
                                        !p.verified
                                ) && (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="p-4 bg-red-50 border text-center"
                                        >
                                            <p className="text-red-600 font-medium mb-2">
                                                Your initial course payment was
                                                rejected.
                                            </p>
                                            <ResubmitCoursePaymentForm
                                                application={app}
                                            />
                                        </td>
                                    </tr>
                                )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
