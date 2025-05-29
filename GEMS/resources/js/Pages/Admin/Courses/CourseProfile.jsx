import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CourseDetails from "./CourseDetails";
import CourseStudentList from "./CourseStudentList";

export default function CourseProfile({ auth, course, students }) {
    return (
        <AuthenticatedLayout user={auth.user} header={
            <h2 className="text-xl font-semibold text-gray-800">Course Profile</h2>
        }>
            <Head title="Course Profile" />
            <div className="max-w-4xl mx-auto bg-white p-6 mt-6 shadow rounded-lg">
                <CourseDetails course={course} />
            </div>
            <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow mt-6 space-y-6">
                <CourseStudentList students={students} />
            </div>
        </AuthenticatedLayout>
    );
}
