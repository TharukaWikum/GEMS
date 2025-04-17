import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import StaffList from "@/Pages/Users/Staff/StaffList"; // ✅ import component

export default function Index({ auth, staffList }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800">Staff List</h2>
                    {auth.user.role === 'admin' && (
                        <Link
                            href={route('admin.staff.create')}
                            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                        >
                            + Add Staff
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Staff" />

            <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <StaffList staffList={staffList} />
            </div>
        </AuthenticatedLayout>
    );
}
