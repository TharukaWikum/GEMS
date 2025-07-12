// import React from "react";
// import { Head, usePage } from "@inertiajs/react";
// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

// export default function Index() {
//     const { exam, auth } = usePage().props;

//     return (
//         <AuthenticatedLayout
//             user={auth.user}
//             header={<h2 className="font-semibold text-xl text-gray-800">Exam Details</h2>}
//         >
//             <Head title="Course Exam Details" />

//             <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded space-y-4">
//                 <h3 className="text-xl font-bold">{exam.title}</h3>
//                 <p>{exam.description}</p>
//                 <p>
//                     <strong>Date:</strong> {exam.exam_date}
//                 </p>
//                 <p>
//                     <strong>Time:</strong> {exam.start_time} ({exam.duration_minutes} minutes)
//                 </p>
//                 <p>
//                     <strong>Status:</strong> {exam.status}
//                 </p>
//                 <p>
//                     <strong>Scheduled By:</strong> {exam.scheduled_by}
//                 </p>

//                 <div className="flex gap-4 mt-4">
//                     <a
//                         href={route("admin.course_exams.download", exam.id)}
//                         className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                     >
//                         Download Marksheet
//                     </a>

//                     <form
//                         method="POST"
//                         encType="multipart/form-data"
//                         action={route("admin.course_exams.upload", exam.id)}
//                     >
//                         <input type="file" name="file" className="mb-2" required />
//                         <button
//                             type="submit"
//                             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                         >
//                             Upload Marksheet
//                         </button>
//                     </form>
//                 </div>

//                 <h4 className="mt-6 font-semibold">Students</h4>
//                 <ul className="list-disc ml-6">
//                     {exam.students.map((student) => (
//                         <li key={student.id}>
//                             {student.name} ({student.email}) – Status: {student.status}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </AuthenticatedLayout>
//     );
// }


import React from "react";
import { Head, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ExamDetails from "./ExamDetails";
import MarksheetSection from "./MarksheetSection";
import StudentExamResultTable from "./StudentExamResultTable";

export default function Index() {
    const { exam, auth } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800">
                    Exam Details
                </h2>
            }
        >
            <Head title="Course Exam Details" />

            <div className="max-w-5xl mx-auto space-y-6 p-6">
                <ExamDetails exam={exam} />

                {exam.status !== "completed" && (
                    <MarksheetSection exam={exam} />
                )}

                <StudentExamResultTable students={exam.students} />
            </div>
        </AuthenticatedLayout>
    );
}

