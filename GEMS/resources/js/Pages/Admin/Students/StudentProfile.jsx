import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import StudentDetails from "@/Pages/Users/Students/Pages/StudentDetails";

export default function StudentProfile({ auth, student }) {
    return (
        <AuthenticatedLayout user={auth.user} header={
            <h2 className="text-xl font-semibold text-gray-800">Student Profile</h2>
        }>
            <Head title="Student Profile" />
            <div className="max-w-4xl mx-auto bg-white p-6 mt-6 shadow rounded-lg">
                <StudentDetails student={student} />
            </div>
        </AuthenticatedLayout>
    );
}
