import { router } from "@inertiajs/react";

export default function CourseCard({ course }) {
    const handleView = () => {
        router.visit(route("admin.courses.profile", { id: course.id }));
    };
    return (
        <div className="bg-white rounded-lg shadow-md border hover:shadow-lg transition duration-200 p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {course.name}
            </h3>

            <p className="text-sm text-gray-600 mb-3">
                {course.description || "No description provided."}
            </p>

            <div className="text-sm text-gray-700 space-y-1">
                <p><strong>💰 Fee:</strong> LKR {course.course_fee}</p>
                <p><strong>📅 Duration:</strong> {course.duration}</p>
                <p><strong>👨‍🏫 Conductor:</strong> {course.conductor_name}</p>
                <p>
                    <strong>📌 Status:</strong>{" "}
                    <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                            course.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : course.status === "Inactive"
                                ? "bg-gray-100 text-gray-700"
                                : course.status === "Completed"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                        }`}
                    >
                        {course.status}
                    </span>
                </p>
            </div>
             <button
                onClick={handleView}
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
            >
                View Course
            </button>
        </div>
    );
}
