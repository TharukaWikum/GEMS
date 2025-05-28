// import { Head } from "@inertiajs/react";
// import { useState } from "react";
// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import CourseForm from "./CourseForm";
// import CourseCard from "@/Components/CourseCard";

// export default function Index({ auth, teachers, courses }) {
//     const [showForm, setShowForm] = useState(false);

//     return (
//         <AuthenticatedLayout
//             user={auth.user}
//             header={
//                 <div className="flex justify-between items-center">
//                     <h2 className="font-semibold text-xl text-gray-800">Courses</h2>
//                     <button
//                         onClick={() => setShowForm(!showForm)}
//                         className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
//                     >
//                         {showForm ? "Cancel" : "+ Create Course"}
//                     </button>
//                 </div>
//             }
//         >
//             <Head title="Courses" />

//             <div className="max-w-5xl mx-auto px-4 py-6">
//                 {showForm && (
//                     <CourseForm teachers={teachers} onSuccess={() => setShowForm(false)} />
//                 )}

//                 {/* You can also list courses here below */}
//             </div>
//             <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
//                 {courses.length > 0 ? (
//                     courses.map((course) => (
//                         <CourseCard key={course.id} course={course} />
//                     ))
//                 ) : (
//                     <p className="text-gray-500 col-span-full text-center">No courses available.</p>
//                 )}
//             </div>
//         </AuthenticatedLayout>
//     );
// }




import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CourseForm from "./CourseForm";
import CourseCard from "@/Components/CourseCard";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Index({ auth, teachers, courses }) {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800">Courses</h2>
                    <button
                        onClick={openModal}
                        className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                    >
                        + Create Course
                    </button>
                </div>
            }
        >
            <Head title="Courses" />

            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))
                ) : (
                    <p className="text-gray-500 col-span-full text-center">No courses available.</p>
                )}
            </div>

            {/* ✅ Modal with Course Form */}
            <Dialog
                open={modalOpen}
                onClose={closeModal}
                fullWidth
                maxWidth="md"
                TransitionComponent={Transition}
            >
                <div className="relative p-6 bg-white rounded">
                 
                    <button
                        onClick={closeModal}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                    >
                        &times;
                    </button>

                    <h2 className="text-lg font-bold text-gray-800 mb-4">
                        Create New Course
                    </h2>
                    <CourseForm teachers={teachers} onSuccess={closeModal} />
                </div>
            </Dialog>
        </AuthenticatedLayout>
    );
}
