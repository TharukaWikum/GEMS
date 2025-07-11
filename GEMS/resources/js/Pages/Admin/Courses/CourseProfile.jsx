import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import CourseDetails from "./CourseDetails";
import CourseStudentList from "./CourseStudentList";
import CourseMaterialUpload from "./CourseMaterialUpload";
import CourseMaterials from "./CourseMaterials";
import ScheduleCourseExam from "./ScheduleCourseExam";
import ExamDetails from "../CourseExams/ExamDetails";

export default function CourseProfile({ auth, course, students, exams, teachers}) {
    // console.log("course", course);
    // console.log("students", students);
    // console.log("courseDetails", courseDetails)
    // console.log("studentDetails", studentDetails)
    // console.log("exams", exams);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold text-gray-800">
                    Course Profile
                </h2>
            }
        >
            <Head title="Course Profile" />
            <div className="max-w-4xl mx-auto bg-white p-6 mt-6 shadow rounded-lg">
                <CourseDetails course={course} teachers={teachers}/>
            </div>
            <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow mt-6 space-y-6">
                <CourseStudentList students={students} />
            </div>
            <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow mt-6 space-y-6">
                <CourseMaterials courseId={course.id} />
            </div>
            <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow mt-6 space-y-6">
                <CourseMaterialUpload courseId={course.id} />
            </div>
            <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow mt-6 space-y-6">
                <ScheduleCourseExam courseId={course.id} students={students} />
            </div>
            {exams?.length > 0 && (
                <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow mt-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Scheduled Exams
                    </h3>
                    <ul className="space-y-2">
                        {exams.map((exam) => (
                            <li
                                key={exam.id}
                                className="border p-4 rounded hover:bg-gray-50"
                            >
                                <Link
                                    href={route("admin.exams.show", exam.id)}
                                    className="text-blue-600 font-semibold"
                                >
                                    {exam.title}
                                </Link>
                                <p className="text-sm text-gray-600">
                                    Scheduled on: {exam.exam_date} at{" "}
                                    {exam.start_time}
                                </p>
                                <p className="text-sm text-gray-600">
                                    By: {exam.scheduled_by}
                                </p>
                                <p className="text-sm text-gray-600">
                                    status: {exam.status}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
