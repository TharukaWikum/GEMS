import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from '@inertiajs/react';

export default function CourseStudentDetail() {
    const { course_name, students } = usePage().props;

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold">Students in {course_name}</h2>}
        >
            <Head title={`Students in ${course_name}`} />
            <div className="overflow-x-auto p-6 bg-white rounded shadow mt-6">
                <table className="min-w-full text-sm text-left border">
                    <thead className="bg-gray-100 font-semibold">
                        <tr>
                            <th className="px-3 py-2">Name</th>
                            <th className="px-3 py-2">Email</th>
                            <th className="px-3 py-2">Target Country</th>
                            <th className="px-3 py-2">Preferred Course</th>
                            <th className="px-3 py-2">Registered Date</th>
                            <th className="px-3 py-2">Placement Score</th>
                            <th className="px-3 py-2">Course Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, i) => (
                            <tr key={i} className="border-t">
                                <td className="px-3 py-2">{student.name}</td>
                                <td className="px-3 py-2">{student.email}</td>
                                <td className="px-3 py-2">{student.target_country}</td>
                                <td className="px-3 py-2">{student.preferred_course}</td>
                                <td className="px-3 py-2">{student.registered_date}</td>
                                <td className="px-3 py-2">{student.placement_score}</td>
                                <td className="px-3 py-2">{student.course_status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="mt-4">
                    <Link href={route('dashboard')} className="text-blue-600 hover:underline">
                        ← Back to Dashboard
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
