import React, { useState } from "react";
import { router } from "@inertiajs/react";

export default function ScheduleCourseExam({ courseId, students }) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        exam_date: "",
        start_time: "",
        duration_minutes: "",
        student_ids: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleStudentSelect = (id) => {
        setForm((prev) => {
            const selected = prev.student_ids.includes(id)
                ? prev.student_ids.filter((sid) => sid !== id)
                : [...prev.student_ids, id];
            return { ...prev, student_ids: selected };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(
            "/admin/course-exams",
            {
                ...form,
                course_id: courseId,
            },
            {
                preserveScroll: true,
                onSuccess: () =>
                    setForm({
                        title: "",
                        description: "",
                        exam_date: "",
                        start_time: "",
                        duration_minutes: "",
                        student_ids: [],
                    }),
                onError: (errors) => {
                    console.error("Validation errors:", errors);
                    alert("Validation failed: " + JSON.stringify(errors));
                },
            }
        );
    };

    return (
        <div className="mt-10 border p-6 rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">Schedule Course Exam</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Exam Title</label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block font-medium">Exam Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block font-medium">Exam Date</label>
                    <input
                        type="date"
                        name="exam_date"
                        value={form.exam_date}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block font-medium">Start Time</label>
                    <input
                        type="time"
                        name="start_time"
                        value={form.start_time}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block font-medium">Duration (minutes)</label>
                    <input
                        type="number"
                        name="duration_minutes"
                        value={form.duration_minutes}
                        onChange={handleChange}
                        required
                        min={1}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">Select Students</label>
                    <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto border p-3 rounded">
                        {students.map((student) => (
                            <label
                                key={student.id}
                                className="flex items-center space-x-2"
                            >
                                <input
                                    type="checkbox"
                                    checked={form.student_ids.includes(student.id)}
                                    onChange={() => handleStudentSelect(student.id)}
                                />
                                <span>
                                    {student.name} ({student.email})
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Schedule Exam
                </button>
            </form>
        </div>
    );
}
