// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Head, usePage } from "@inertiajs/react";

// export default function Dashboard() {
//     const { summary } = usePage().props;

//     return (
//         <AuthenticatedLayout
//             header={
//                 <h2 className="text-xl font-semibold leading-tight text-gray-800">
//                     Dashboard
//                 </h2>
//             }
//         >
//             <Head title="Dashboard" />

//             <div className="py-12">
//                 <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

//                     <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
//                         <div className="p-6 text-gray-900">
//                             You're logged in!
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="py-12">
//                 <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
//                     {/* Summary Cards */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                     <div className="bg-white p-4 rounded shadow">
//                         <h4 className="text-gray-500 text-sm">Active Students</h4>
//                         <p className="text-2xl font-bold">{summary.active_students}</p>
//                     </div>
//                     <div className="bg-white p-4 rounded shadow">
//                         <h4 className="text-gray-500 text-sm">Active Staff</h4>
//                         <p className="text-2xl font-bold">{summary.active_staff}</p>
//                     </div>
//                     <div className="bg-white p-4 rounded shadow">
//                         <h4 className="text-gray-500 text-sm">Blocked Students</h4>
//                         <p className="text-2xl font-bold">{summary.blocked_students}</p>
//                     </div>
//                 </div>

//                 {/* Status Breakdown */}
//                 <div className="bg-white p-4 rounded shadow">
//                     <h4 className="text-lg font-semibold mb-2">Student Status Overview</h4>
//                     <ul className="space-y-1">
//                         {Object.entries(summary.students_by_status).map(([status, count], idx) => (
//                             <li key={idx} className="flex justify-between">
//                                 <span className="capitalize">{status.replaceAll('_', ' ')}</span>
//                                 <span className="font-medium">{count}</span>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>

//                 {/* Course-wise Student Count */}
//                 <div className="bg-white p-4 rounded shadow">
//                     <h4 className="text-lg font-semibold mb-2">Students by Course</h4>
//                     <ul className="space-y-1">
//                         {summary.students_by_course.map((course, idx) => (
//                             <li key={idx} className="flex justify-between">
//                                 <span>{course.course_name}</span>
//                                 <span className="font-medium">{course.count}</span>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>

//                 {/* Enrollment Status Summary */}
//                 <div className="bg-white p-4 rounded shadow">
//                     <h4 className="text-lg font-semibold mb-2">Course Enrollment Status</h4>
//                     <ul className="space-y-1">
//                         {Object.entries(summary.students_by_course_status).map(([status, count], idx) => (
//                             <li key={idx} className="flex justify-between">
//                                 <span>{status}</span>
//                                 <span className="font-medium">{count}</span>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link } from "@inertiajs/react";
import SummaryCards from "./Dashboard/SummaryCards";
import StudentStatusOverview from "./Dashboard/StudentStatusOverview";
import CourseStudentCount from "./Dashboard/CourseStudentCount";
import CourseEnrollmentStatus from "./Dashboard/CourseEnrollmentStatus";
import PaymentSummaryCard from "./Dashboard/PaymentSummaryCard";
import DuePaymentsTable from "./Dashboard/DuePaymentsTable";

export default function Dashboard() {
    const { summary, students_by_course_details } = usePage().props;

    console.log(students_by_course_details);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                    </div>

                    {/* Cards */}
                    <SummaryCards summary={summary} />
                    <StudentStatusOverview summary={summary} />
                    <CourseStudentCount summary={summary} />
                    {/* <CourseEnrollmentStatus summary={summary} /> */}
                    <PaymentSummaryCard payments={summary.payments_summary} />
                    <DuePaymentsTable duePayments={summary.due_payments} />
                    <Link
                        href={route("reports.payments.view")}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        View All Payments
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Head, usePage } from "@inertiajs/react";
// import StudentEnrollmentReport from "./Reports/StudentEnrollmentReport";

// export default function Dashboard() {
//     const { initialData, filters } = usePage().props;

//     return (
//         <AuthenticatedLayout
//             header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}
//         >
//             <Head title="Dashboard" />

//             <div className="py-12">
//                 <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
//                     <StudentEnrollmentReport initialData={initialData} filters={filters} />

//                     <div className="mt-4 overflow-hidden bg-white shadow-sm sm:rounded-lg">
//                         <div className="p-6 text-gray-900">You're logged in!</div>
//                     </div>
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }
