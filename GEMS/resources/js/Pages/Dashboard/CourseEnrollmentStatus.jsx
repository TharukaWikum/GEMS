export default function CourseEnrollmentStatus({ summary }) {
    return (
        <div className="bg-white p-4 rounded shadow">
            <h4 className="text-lg font-semibold mb-2">Course Enrollment Status</h4>
            <ul className="space-y-1">
                {Object.entries(summary.students_by_course_status).map(([status, count], idx) => (
                    <li key={idx} className="flex justify-between">
                        <span>{status}</span>
                        <span className="font-medium">{count}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
