import { Link } from "@inertiajs/react";

export default function CourseStudentCount({ summary }) {
    console.log("students_by_course", summary.students_by_course);
    return (
        <div className="bg-white p-4 rounded shadow mb-6">
            <h4 className="text-lg font-semibold mb-2">Students by Course</h4>
            {/* <Link
  href={route('reports.course.students.download')}
  className="inline-block px-4 py-2 mt-2 text-white bg-green-600 rounded hover:bg-green-700"
>
  Download Full Course Student Report
</Link> */}
<a
    href={route("reports.course.students.download")}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
>
     Download Full Course Student Report
</a>

            <ul className="space-y-1">
                {summary.students_by_course.map((course, idx) => (
                    <li key={idx} className="flex justify-between">
                        <Link
                            href={route('reports.course.details', course.id)}
                            className="text-blue-600 hover:underline"
                        >
                            {course.course_name}
                        </Link>
                        <span className="font-medium">{course.count}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
