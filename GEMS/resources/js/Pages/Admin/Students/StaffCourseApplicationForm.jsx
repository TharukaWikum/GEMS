import { useForm } from "@inertiajs/react";
import React from "react";

export default function StaffCourseApplicationForm({ studentId, courses, onClose }) {
    const { data, setData, post, processing, errors } = useForm({
        course_id: "",
        payment_type: "full",
        payment_method: "",
        receipt: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.students.course.apply", studentId), {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label>Course</label>
                <select
                    value={data.course_id}
                    onChange={(e) => setData("course_id", e.target.value)}
                    className="w-full border rounded px-3 py-2"
                >
                    <option value="">-- Select Course --</option>
                    {courses.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name} - {c.duration}
                        </option>
                    ))}
                </select>
                {errors.course_id && <div className="text-red-600">{errors.course_id}</div>}
            </div>

            <div className="mb-3">
                <label>Payment Type</label>
                <select
                    value={data.payment_type}
                    onChange={(e) => setData("payment_type", e.target.value)}
                    className="w-full border rounded px-3 py-2"
                >
                    <option value="full">Full Payment</option>
                    <option value="installment">Installment</option>
                </select>
            </div>

            <div className="mb-3">
                <label>Payment Method</label>
                <select
                    value={data.payment_method}
                    onChange={(e) => setData("payment_method", e.target.value)}
                    className="w-full border rounded px-3 py-2"
                >
                    <option value="">-- Select --</option>
                    <option value="Online Transfer">Online Transfer</option>
                    <option value="Bank Payment">Bank Payment</option>
                    <option value="Handover">Handover</option>
                </select>
                {errors.payment_method && <div className="text-red-600">{errors.payment_method}</div>}
            </div>

            {data.payment_method !== "Handover" && (
                <div className="mb-3">
                    <label>Receipt</label>
                    <input
                        type="file"
                        onChange={(e) => setData("receipt", e.target.files[0])}
                        className="w-full"
                    />
                    {errors.receipt && <div className="text-red-600">{errors.receipt}</div>}
                </div>
            )}

            <div className="flex justify-end mt-4">
                <button type="submit" disabled={processing} className="bg-blue-600 text-white px-4 py-2 rounded">
                    Submit
                </button>
            </div>
        </form>
    );
}
