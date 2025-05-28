import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CourseDetails from "./CourseDetails";

export default function CourseProfile({ auth, course }) {
    return (
        <AuthenticatedLayout user={auth.user} header={
            <h2 className="text-xl font-semibold text-gray-800">Course Profile</h2>
        }>
            <Head title="Course Profile" />
            <div className="max-w-4xl mx-auto bg-white p-6 mt-6 shadow rounded-lg">
                <CourseDetails course={course} />
            </div>
        </AuthenticatedLayout>
    );
}
