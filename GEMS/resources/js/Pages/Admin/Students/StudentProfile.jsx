import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import StudentDetails from "@/Pages/Users/Students/Pages/StudentDetails";
import AddCourseEnrollmentForm from "./AddCourseEnrollmentForm";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// export default function StudentProfile({ auth, student,courses }) {
//     return (
//         <AuthenticatedLayout user={auth.user} header={
//             <h2 className="text-xl font-semibold text-gray-800">Student Profile</h2>
//         }>
//             <Head title="Student Profile" />
//             <div className="max-w-4xl mx-auto bg-white p-6 mt-6 shadow rounded-lg">
//                 <StudentDetails student={student} />
//             </div>
//             <div className="max-w-4xl mx-auto bg-white p-6 mt-6 shadow rounded-lg">
//                 <AddCourseEnrollmentForm
//                     studentId={student.id}
//                     courses={courses}
//                 />
//             </div>
//         </AuthenticatedLayout>
//     );
// }

export default function StudentProfile({ auth, student, courses }) {
    const [open, setOpen] = useState(false);

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800">Student Profile</h2>}>
            <div className="mt-3 p-4 max-w-4xl mx-auto bg-white shadow rounded">
                {/* Student Info */}
                <div className="mb-4">
                    <StudentDetails student={student} />
                </div>

                {/* Button */}
                <button
                    onClick={openModal}
                    className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                >
                    + Add Enrollment
                </button>

                {/* ✅ Modal with AddCourseEnrollmentForm */}
                <Dialog open={open} onClose={closeModal} fullWidth maxWidth="md" TransitionComponent={Transition}>
                    <div className="relative p-6 bg-white rounded">
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                        >
                            &times;
                        </button>

                        <h2 className="text-lg font-bold text-gray-800 mb-4">Add Course Enrollment</h2>
                        <AddCourseEnrollmentForm
                            studentId={student.id}
                            courses={courses}
                            onClose={closeModal}
                            onSuccess={() => {
                                // Optional: show toast or reload data
                            }}
                        />
                    </div>
                </Dialog>
            </div>
        </AuthenticatedLayout>
    );
}