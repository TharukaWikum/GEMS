import { router } from "@inertiajs/react";
import { useState } from "react";
import { Link } from "@inertiajs/react";

export default function ViewStudents({ students }) {
    console.log("students",students)
    return (
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
            <div className="text-2xl font-semibold m-2 mb-3">Student List</div>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100 text-sm">
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Account Status</th>
                        <th className="border px-4 py-2">Student Status</th>
                        <th className="border px-4 py-2">Course</th>
                        <th className="border px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length > 0 ? (
                        students.map((student, index) => (
                            <tr key={index} className="text-center text-sm">
                                <td className="border px-4 py-2">
                                    {student.name}
                                </td>
                                <td className="border px-4 py-2">
                                    {student.email}
                                </td>
                                {/* <td className="border px-4 py-2">
                                    {student.status}
                                </td> */}
                                <td className="border px-4 py-2">
    <form
        onChange={(e) => {
            router.post(
                route("admin.students.updateStatus", { id: student.id }),
                { status: e.target.value },
                {
                    preserveScroll: true,
                    only: ["students"],
                }
            );
        }}
    >
        <select
            defaultValue={student.status}
            className="border rounded px-2 py-1 text-sm"
        >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blocked">Blocked</option>
        </select>
    </form>
</td>

                                <td className="border px-4 py-2">
                                    {student.student_status}
                                </td>
                                <td className="border px-4 py-2">
                                    {student.preferred_course}
                                </td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() =>
                                            router.visit(
                                                route(
                                                    "admin.students.profile",
                                                    { id: student.id }
                                                )
                                            )
                                        }
                                        className="text-blue-600 hover:underline"
                                    >
                                        View Profile
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center py-4">
                                No students found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
