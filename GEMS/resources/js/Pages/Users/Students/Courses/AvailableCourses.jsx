import React from "react";
import { useForm, usePage } from "@inertiajs/react";

// export default function AvailableCourses({ courses, applications }) {
//     const { data, setData, post, processing, errors } = useForm({
//         course_id: "",
//         payment_type: "full",
//         payment_method: "Online Transfer",
//         payment_receipt: null,
//     });

//     const submit = (e) => {
//         e.preventDefault();
//         post(route("student.courses.apply"), {
//             forceFormData: true,
//         });
//     };

//     return (
//         <div className="bg-white p-6 rounded shadow">
//             <h2 className="text-lg font-semibold mb-4">Apply for a Course</h2>
//             <form onSubmit={submit} encType="multipart/form-data">
//                 <div className="mb-4">
//                     <label className="block mb-1 font-medium">
//                         Select Course
//                     </label>
//                     <select
//                         className="w-full border rounded p-2"
//                         value={data.course_id}
//                         onChange={(e) => setData("course_id", e.target.value)}
//                     >
//                         <option value="">-- Select a Course --</option>
//                         {courses.map((course) => (
//                             <option key={course.id} value={course.id}>
//                                 {course.name} ({course.duration} months) - Rs.{" "}
//                                 {course.course_fee}
//                             </option>
//                         ))}
//                     </select>
//                     {errors.course_id && (
//                         <div className="text-red-600">{errors.course_id}</div>
//                     )}
//                 </div>

//                 <div className="mb-4">
//                     <label className="block mb-1 font-medium">
//                         Payment Type
//                     </label>
//                     <select
//                         className="w-full border rounded p-2"
//                         value={data.payment_type}
//                         onChange={(e) =>
//                             setData("payment_type", e.target.value)
//                         }
//                     >
//                         <option value="full">Full</option>
//                         <option value="installment">Installment</option>
//                     </select>
//                     {errors.payment_type && (
//                         <div className="text-red-600">
//                             {errors.payment_type}
//                         </div>
//                     )}
//                 </div>
//                 <div className="mb-4">
//                     <label className="block mb-1 font-medium">
//                         Payment Method
//                     </label>
//                     <select
//                         className="w-full border rounded p-2"
//                         value={data.payment_method}
//                         onChange={(e) =>
//                             setData("payment_method", e.target.value)
//                         }
//                     >
//                         <option value="Online Transfer">Online Transfer</option>{" "}
//                         {/* ✅ match ENUM */}
//                         <option value="Bank Payment">Bank Payment</option>
//                         <option value="Handover">Handover</option>
//                     </select>
//                 </div>

//                 {/* Upload Receipt (optional) */}
//                 {data.payment_method !== "Handover" && (
//                     <div className="mb-4">
//                         <label className="block mb-1 font-medium">
//                             Upload Receipt
//                         </label>
//                         <input
//                             type="file"
//                             accept=".jpg,.jpeg,.png,.pdf"
//                             className="w-full border p-2"
//                             onChange={(e) =>
//                                 setData("payment_receipt", e.target.files[0])
//                             }
//                         />
//                         {errors.payment_receipt && (
//                             <div className="text-red-600">
//                                 {errors.payment_receipt}
//                             </div>
//                         )}
//                     </div>
//                 )}

//                 <button
//                     type="submit"
//                     className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                     disabled={processing}
//                 >
//                     Apply
//                 </button>
//             </form>
//         </div>
//     );
// }


export default function AvailableCourses({ courses, applications }) {
    const { data, setData, post, processing, errors } = useForm({
        course_id: "",
        payment_type: "full",
        payment_method: "Online Transfer",
        payment_receipt: null,
    });

    const hasActiveApplication = applications.some(app =>
        ['pending', 'registered'].includes(app.status)
    );

    const submit = (e) => {
        e.preventDefault();
        post(route("student.courses.apply"), {
            forceFormData: true,
        });
    };

    return (
        <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Apply for a Course</h2>

            {hasActiveApplication ? (
                <div className="bg-yellow-100 p-4 rounded border border-yellow-300 text-yellow-700">
                    <p>
                        You already have an active course application. You cannot apply to another course until it's completed or rejected.
                    </p>
                </div>
            ) : (
                <form onSubmit={submit} encType="multipart/form-data">
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Select Course</label>
                        <select
                            className="w-full border rounded p-2"
                            value={data.course_id}
                            onChange={(e) => setData("course_id", e.target.value)}
                        >
                            <option value="">-- Select a Course --</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.name} ({course.duration} months) - Rs. {course.course_fee}
                                </option>
                            ))}
                        </select>
                        {errors.course_id && <div className="text-red-600">{errors.course_id}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Payment Type</label>
                        <select
                            className="w-full border rounded p-2"
                            value={data.payment_type}
                            onChange={(e) => setData("payment_type", e.target.value)}
                        >
                            <option value="full">Full</option>
                            <option value="installment">Installment</option>
                        </select>
                        {errors.payment_type && <div className="text-red-600">{errors.payment_type}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Payment Method</label>
                        <select
                            className="w-full border rounded p-2"
                            value={data.payment_method}
                            onChange={(e) => setData("payment_method", e.target.value)}
                        >
                            <option value="Online Transfer">Online Transfer</option>
                            <option value="Bank Payment">Bank Payment</option>
                            <option value="Handover">Handover</option>
                        </select>
                    </div>

                    {data.payment_method !== "Handover" && (
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Upload Receipt</label>
                            <input
                                type="file"
                                accept=".jpg,.jpeg,.png,.pdf"
                                className="w-full border p-2"
                                onChange={(e) => setData("payment_receipt", e.target.files[0])}
                            />
                            {errors.payment_receipt && <div className="text-red-600">{errors.payment_receipt}</div>}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        disabled={processing}
                    >
                        Apply
                    </button>
                </form>
            )}
        </div>
    );
}
