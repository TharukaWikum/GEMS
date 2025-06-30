import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function StudentStatusDetail({ status, students }) {
    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800">Students in {status.replaceAll('_', ' ')}</h2>}>
            <Head title={`Students - ${status}`} />
            <div className="p-6 bg-white shadow rounded">
                {students.length === 0 ? (
                    <p>No students found.</p>
                ) : (
                    <table className="w-full text-sm table-auto">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Email</th>
                                <th className="border px-4 py-2">Target Country</th>
                                <th className="border px-4 py-2">Target Score</th>
                                <th className="border px-4 py-2">Preferred Course</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((s, i) => (
                                <tr key={i}>
                                    <td className="border px-4 py-2">{s.name}</td>
                                    <td className="border px-4 py-2">{s.email}</td>
                                    <td className="border px-4 py-2">{s.target_country}</td>
                                    <td className="border px-4 py-2">{s.target_score}</td>
                                    <td className="border px-4 py-2">{s.preferred_course}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
