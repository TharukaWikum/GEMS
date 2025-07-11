import { useForm } from '@inertiajs/react';

export default function CourseProfile({ course, teachers }) {
    const { data, setData, put, processing, errors } = useForm({
        course_fee: course.course_fee,
        status: course.status,
        conductor_id: course.conductor_id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.courses.update', course.id));
    };

    return (
        <div className="space-y-8">
            {/* Display Section */}
            <div className="bg-white p-6 rounded shadow">
                <h2 className="text-2xl font-bold mb-4">Course Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><strong>Name:</strong> {course.name}</div>
                    <div><strong>Description:</strong> {course.description}</div>
                    <div><strong>Type:</strong> {course.type}</div>
                    <div><strong>Duration:</strong> {course.duration}</div>
                    <div><strong>Conductor:</strong> {course.conductor_name}</div>
                </div>
            </div>

            {/* Update Form */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
                <h2 className="text-xl font-semibold mb-2">Update Course</h2>

                <div>
                    <label className="block font-medium">Course Fee (LKR)</label>
                    <input
                        type="number"
                        value={data.course_fee}
                        onChange={(e) => setData('course_fee', e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                    {errors.course_fee && <div className="text-red-500">{errors.course_fee}</div>}
                </div>

                <div>
                    <label className="block font-medium">Status</label>
                    <select
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                        className="w-full border p-2 rounded"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    {errors.status && <div className="text-red-500">{errors.status}</div>}
                </div>

                <div>
                    <label className="block font-medium">Instructor</label>
                    <select
                        value={data.conductor_id}
                        onChange={(e) => setData('conductor_id', e.target.value)}
                        className="w-full border p-2 rounded"
                    >
                        {teachers.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>
                                {teacher.name}
                            </option>
                        ))}
                    </select>
                    {errors.conductor_id && <div className="text-red-500">{errors.conductor_id}</div>}
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    disabled={processing}
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}
