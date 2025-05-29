export default function CourseStudentList({ students }) {
    return (
        <div className="mt-8 bg-white p-4 shadow rounded">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Enrolled Students</h3>
            <table className="min-w-full border border-gray-200 text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Start Date</th>
                        <th className="border px-4 py-2">End Date</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length > 0 ? (
                        students.map((student, idx) => (
                            <tr key={idx} className="text-center">
                                <td className="border px-4 py-2">{student.name}</td>
                                <td className="border px-4 py-2">{student.email}</td>
                                <td className="border px-4 py-2">{student.status}</td>
                                <td className="border px-4 py-2">{student.start_date}</td>
                                <td className="border px-4 py-2">{student.end_date}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-4">No students enrolled yet.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
