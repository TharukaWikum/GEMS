// import { Head, Link } from "@inertiajs/react";
// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import StaffList from "@/Pages/Users/Staff/StaffList"; // ✅ import component

// export default function Index({ auth, staffList }) {
//     return (
//         <AuthenticatedLayout
//             user={auth.user}
//             header={
//                 <div className="flex justify-between items-center">
//                     <h2 className="font-semibold text-xl text-gray-800">Staff List</h2>
//                     {auth.user.role === 'admin' && (
//                         <Link
//                             href={route('admin.staff.create')}
//                             className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
//                         >
//                             + Add Staff
//                         </Link>
//                     )}
//                 </div>
//             }
//         >
//             <Head title="Staff" />

//             <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <StaffList staffList={staffList} />
//             </div>
//         </AuthenticatedLayout>
//     );
// }

import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import StaffList from "@/Pages/Users/Staff/StaffList";
import StaffForm from "@/Pages/Users/Staff/Pages/StaffForm"; // Reuse existing form
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Index({ auth, staffList }) {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800">
                        Staff List
                    </h2>
                    {auth.user.role === "admin" && (
                        <button
                            onClick={openModal}
                            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                        >
                            + Add Staff
                        </button>
                    )}
                </div>
            }
        >
            <Head title="Staff" />

            <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <StaffList staffList={staffList} />
            </div>

            {/* Staff Registration Modal */}
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
                        Add New Staff
                    </h2>
                    <StaffForm auth={auth} onSuccess={closeModal} />
                </div>
            </Dialog>
        </AuthenticatedLayout>
    );
}
