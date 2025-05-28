// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Head } from "@inertiajs/react";
// import ViewStudents from "@/Pages/Users/Students/Pages/ViewStudents";
// import { Link } from "@inertiajs/react";

// export default function Index({ students, auth, staffList }) {
//     return (
//         <AuthenticatedLayout
//             header={
//                 <div className="flex justify-between items-center">
//                 <h2 className="text-xl font-semibold leading-tight text-gray-800">
//                     Students
//                 </h2>
//                 {auth.user.role === "admin" && (
//                     <Link
//                         href={route("admin.students.create")}
//                         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
//                     >
//                         + Add New Student
//                     </Link>
//                 )}
//             </div>

//             }
//         >
//             <Head title="Students" />
//             <div className="py-12">
//                 <div className="mx-auto sm:px-6 lg:px-8">
//                     <ViewStudents students={students} />
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }

import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ViewStudents from "@/Pages/Users/Students/Pages/ViewStudents";
import StudentForm from "@/Pages/Users/Students/Pages/Register";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Index({ students, auth }) {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Students
                    </h2>
                    {auth.user.role === "admin" && (
                        <button
                            onClick={openModal}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                        >
                            + Add New Student
                        </button>
                    )}
                </div>
            }
        >
            <Head title="Students" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <ViewStudents students={students} />
                </div>
            </div>

            {/* ✅ Modal with Student Form */}
            <Dialog
                open={modalOpen}
                onClose={closeModal}
                fullWidth
                maxWidth="md"
                TransitionComponent={Transition}
            >
                <div className="p-6 bg-white rounded">
                    <button
                        onClick={closeModal}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-3xl"
                    >
                        &times;
                    </button>
                    <h2 className="text-lg font-bold text-gray-800 mb-4">
                        Add New Student
                    </h2>
                    <StudentForm auth={auth} onSuccess={closeModal} />
                </div>
            </Dialog>
        </AuthenticatedLayout>
    );
}
