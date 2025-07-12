// import React from "react";
// import { useForm, usePage } from "@inertiajs/react";

// export default function AvailableCourses({ courses, applications }) {
//     const { data, setData, post, processing, errors } = useForm({
//         course_id: "",
//         payment_type: "full",
//         payment_method: "Online Transfer",
//         payment_receipt: null,
//     });

//     const hasActiveApplication = applications.some(app =>
//         ['pending', 'registered'].includes(app.status)
//     );

//     const submit = (e) => {
//         e.preventDefault();
//         post(route("student.courses.apply"), {
//             forceFormData: true,
//         });
//     };

//     return (
//         <div className="bg-white p-6 rounded shadow">
//             <h2 className="text-lg font-semibold mb-4">Apply for a Course</h2>

//             {hasActiveApplication ? (
//                 <div className="bg-yellow-100 p-4 rounded border border-yellow-300 text-yellow-700">
//                     <p>
//                         You already have an active course application. You cannot apply to another course until it's completed or rejected.
//                     </p>
//                 </div>
//             ) : (
//                 <form onSubmit={submit} encType="multipart/form-data">
//                     <div className="mb-4">
//                         <label className="block mb-1 font-medium">Select Course</label>
//                         <select
//                             className="w-full border rounded p-2"
//                             value={data.course_id}
//                             onChange={(e) => setData("course_id", e.target.value)}
//                         >
//                             <option value="">-- Select a Course --</option>
//                             {courses.map((course) => (
//                                 <option key={course.id} value={course.id}>
//                                     {course.name} ({course.duration} months) - Rs. {course.course_fee}
//                                 </option>
//                             ))}
//                         </select>
//                         {errors.course_id && <div className="text-red-600">{errors.course_id}</div>}
//                     </div>

//                     <div className="mb-4">
//                         <label className="block mb-1 font-medium">Payment Type</label>
//                         <select
//                             className="w-full border rounded p-2"
//                             value={data.payment_type}
//                             onChange={(e) => setData("payment_type", e.target.value)}
//                         >
//                             <option value="full">Full</option>
//                             <option value="installment">Installment</option>
//                         </select>
//                         {errors.payment_type && <div className="text-red-600">{errors.payment_type}</div>}
//                     </div>

//                     <div className="mb-4">
//                         <label className="block mb-1 font-medium">Payment Method</label>
//                         <select
//                             className="w-full border rounded p-2"
//                             value={data.payment_method}
//                             onChange={(e) => setData("payment_method", e.target.value)}
//                         >
//                             <option value="Online Transfer">Online Transfer</option>
//                             <option value="Bank Payment">Bank Payment</option>
//                             <option value="Handover">Handover</option>
//                         </select>
//                     </div>

//                     {data.payment_method !== "Handover" && (
//                         <div className="mb-4">
//                             <label className="block mb-1 font-medium">Upload Receipt</label>
//                             <input
//                                 type="file"
//                                 accept=".jpg,.jpeg,.png,.pdf"
//                                 className="w-full border p-2"
//                                 onChange={(e) => setData("payment_receipt", e.target.files[0])}
//                             />
//                             {errors.payment_receipt && <div className="text-red-600">{errors.payment_receipt}</div>}
//                         </div>
//                     )}

//                     <button
//                         type="submit"
//                         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                         disabled={processing}
//                     >
//                         Apply
//                     </button>
//                 </form>
//             )}
//         </div>
//     );
// }



// import React from "react";
// import { useForm } from "@inertiajs/react";

// export default function AvailableCourses({ courses, applications }) {
//     const { data, setData, post, processing, errors } = useForm({
//         course_id: "",
//         payment_type: "full",
//         payment_method: "Online Transfer",
//         payment_receipt: null,
//     });

//     const hasActiveApplication = applications.some(app =>
//         ['pending', 'registered'].includes(app.status)
//     );

//     const submit = (e) => {
//         e.preventDefault();
//         post(route("student.courses.apply"), {
//             forceFormData: true,
//         });
//     };

//     return (
//         <div className="max-w-5xl mx-auto py-8 space-y-10">
//             {/* All Courses Tiles */}
//             <section>
//                 <h2 className="text-2xl font-bold mb-4 text-gray-800">All Courses</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                     {courses.map(course => (
//                         <div
//                             key={course.id}
//                             className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col items-start border border-gray-100"
//                         >
//                             <h3 className="text-lg font-semibold text-blue-700 mb-2">{course.name}</h3>
//                             <p className="text-gray-600 mb-1">Duration: <span className="font-medium">{course.duration} months</span></p>
//                             <p className="text-gray-600 mb-4">Fee: <span className="font-semibold text-green-600">Rs. {course.course_fee}</span></p>
//                             <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
//                                 Course ID: {course.id}
//                             </span>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             {/* Application Form */}
//             <section>
//                 <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
//                     <h2 className="text-xl font-bold mb-6 text-gray-800">Apply for a Course</h2>
//                     {hasActiveApplication ? (
//                         <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-yellow-800 flex items-center space-x-3">
//                             <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
//                             </svg>
//                             <span>
//                                 You already have an active course application. You cannot apply to another course until it's completed or rejected.
//                             </span>
//                         </div>
//                     ) : (
//                         <form onSubmit={submit} encType="multipart/form-data" className="space-y-5">
//                             {/* Select Course */}
//                             <div>
//                                 <label className="block mb-2 text-gray-700 font-medium">Select Course</label>
//                                 <select
//                                     className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none ${errors.course_id ? 'border-red-500' : 'border-gray-300'}`}
//                                     value={data.course_id}
//                                     onChange={(e) => setData("course_id", e.target.value)}
//                                 >
//                                     <option value="">-- Select a Course --</option>
//                                     {courses.map((course) => (
//                                         <option key={course.id} value={course.id}>
//                                             {course.name} ({course.duration} months) - Rs. {course.course_fee}
//                                         </option>
//                                     ))}
//                                 </select>
//                                 {errors.course_id && <div className="text-red-600 mt-1 text-sm">{errors.course_id}</div>}
//                             </div>

//                             {/* Payment Type */}
//                             <div>
//                                 <label className="block mb-2 text-gray-700 font-medium">Payment Type</label>
//                                 <select
//                                     className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none ${errors.payment_type ? 'border-red-500' : 'border-gray-300'}`}
//                                     value={data.payment_type}
//                                     onChange={(e) => setData("payment_type", e.target.value)}
//                                 >
//                                     <option value="full">Full</option>
//                                     <option value="installment">Installment</option>
//                                 </select>
//                                 {errors.payment_type && <div className="text-red-600 mt-1 text-sm">{errors.payment_type}</div>}
//                             </div>

//                             {/* Payment Method */}
//                             <div>
//                                 <label className="block mb-2 text-gray-700 font-medium">Payment Method</label>
//                                 <select
//                                     className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none border-gray-300"
//                                     value={data.payment_method}
//                                     onChange={(e) => setData("payment_method", e.target.value)}
//                                 >
//                                     <option value="Online Transfer">Online Transfer</option>
//                                     <option value="Bank Payment">Bank Payment</option>
//                                     <option value="Handover">Handover</option>
//                                 </select>
//                             </div>

//                             {/* Payment Receipt */}
//                             {data.payment_method !== "Handover" && (
//                                 <div>
//                                     <label className="block mb-2 text-gray-700 font-medium">Upload Receipt</label>
//                                     <input
//                                         type="file"
//                                         accept=".jpg,.jpeg,.png,.pdf"
//                                         className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none ${errors.payment_receipt ? 'border-red-500' : 'border-gray-300'}`}
//                                         onChange={(e) => setData("payment_receipt", e.target.files[0])}
//                                     />
//                                     {errors.payment_receipt && <div className="text-red-600 mt-1 text-sm">{errors.payment_receipt}</div>}
//                                 </div>
//                             )}

//                             {/* Submit Button */}
//                             <button
//                                 type="submit"
//                                 className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
//                                 disabled={processing}
//                             >
//                                 {processing ? "Applying..." : "Apply"}
//                             </button>
//                         </form>
//                     )}
//                 </div>
//             </section>
//         </div>
//     );
// }


import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";

// Validation function for the course application form
function validateCourseApplication({ course_id, payment_type, payment_method, payment_receipt }) {
  const errors = {};
  if (!course_id) errors.course_id = "Please select a course.";
  if (!payment_type) errors.payment_type = "Please select a payment type.";
  if (!payment_method) errors.payment_method = "Please select a payment method.";
  if (
    (payment_method === "Bank Payment" || payment_method === "Online Transfer") &&
    !payment_receipt
  ) {
    errors.payment_receipt = "Please upload your payment receipt.";
  }
  return errors;
}

export default function AvailableCourses({ courses, applications }) {
  const [showModal, setShowModal] = useState(false);
  const [clientErrors, setClientErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    course_id: "",
    payment_type: "full",
    payment_method: "Online Transfer",
    payment_receipt: null,
  });

  const hasActiveApplication = applications.some(app =>
    ['pending', 'registered'].includes(app.status)
  );

  const openModal = () => {
    setShowModal(true);
    setClientErrors({});
    reset("course_id", "payment_type", "payment_method", "payment_receipt");
  };

  const closeModal = () => {
    setShowModal(false);
    setClientErrors({});
    reset("course_id", "payment_type", "payment_method", "payment_receipt");
  };

  const submit = (e) => {
    e.preventDefault();
    const validationErrors = validateCourseApplication(data);
    setClientErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    post(route("student.courses.apply"), {
      forceFormData: true,
      onSuccess: () => {
        setSuccess(true);
        setShowModal(false);
        reset();
        setTimeout(() => setSuccess(false), 3500); // Hide notification after 3.5s
      },
    });
  };

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-10">
      {/* All Courses Tiles */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">All Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.map(course => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col items-start border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-blue-700 mb-2">{course.name}</h3>
              <p className="text-gray-600 mb-1">
                Duration: <span className="font-medium">{course.duration} months</span>
              </p>
              <p className="text-gray-600 mb-4">
                Fee: <span className="font-semibold text-green-600">Rs. {course.course_fee}</span>
              </p>
              <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                Course ID: {course.id}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Success Notification */}
      {success && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded shadow-lg font-semibold animate-fade-in">
          Application submitted successfully!
        </div>
      )}

      {/* Application Modal Trigger */}
      <section>
        <div className="flex justify-end">
          <PrimaryButton onClick={openModal} disabled={hasActiveApplication}>
            Apply for a Course
          </PrimaryButton>
        </div>
        <Modal show={showModal} maxWidth="md" onClose={closeModal}>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Apply for a Course</h2>
            {hasActiveApplication ? (
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-yellow-800 flex items-center space-x-3 mb-2">
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
                <span>
                  You already have an active course application. You cannot apply to another course until it's completed or rejected.
                </span>
              </div>
            ) : (
              <form onSubmit={submit} encType="multipart/form-data" className="space-y-5">
                {/* Select Course */}
                <div>
                  <label className="block mb-2 text-gray-700 font-medium">
                    Select Course <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none ${clientErrors.course_id || errors.course_id ? 'border-red-500' : 'border-gray-300'}`}
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
                  {(clientErrors.course_id || errors.course_id) && (
                    <div className="text-red-600 mt-1 text-sm">{clientErrors.course_id || errors.course_id}</div>
                  )}
                </div>

                {/* Payment Type */}
                <div>
                  <label className="block mb-2 text-gray-700 font-medium">
                    Payment Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none ${clientErrors.payment_type || errors.payment_type ? 'border-red-500' : 'border-gray-300'}`}
                    value={data.payment_type}
                    onChange={(e) => setData("payment_type", e.target.value)}
                  >
                    <option value="full">Full</option>
                    <option value="installment">Installment</option>
                  </select>
                  {(clientErrors.payment_type || errors.payment_type) && (
                    <div className="text-red-600 mt-1 text-sm">{clientErrors.payment_type || errors.payment_type}</div>
                  )}
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block mb-2 text-gray-700 font-medium">
                    Payment Method <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none ${clientErrors.payment_method || errors.payment_method ? 'border-red-500' : 'border-gray-300'}`}
                    value={data.payment_method}
                    onChange={(e) => setData("payment_method", e.target.value)}
                  >
                    <option value="Online Transfer">Online Transfer</option>
                    <option value="Bank Payment">Bank Payment</option>
                    <option value="Handover">Handover</option>
                  </select>
                  {(clientErrors.payment_method || errors.payment_method) && (
                    <div className="text-red-600 mt-1 text-sm">{clientErrors.payment_method || errors.payment_method}</div>
                  )}
                </div>

                {/* Payment Receipt */}
                {data.payment_method !== "Handover" && (
                  <div>
                    <label className="block mb-2 text-gray-700 font-medium">
                      Upload Receipt <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none ${clientErrors.payment_receipt || errors.payment_receipt ? 'border-red-500' : 'border-gray-300'}`}
                      onChange={(e) => setData("payment_receipt", e.target.files[0])}
                    />
                    {(clientErrors.payment_receipt || errors.payment_receipt) && (
                      <div className="text-red-600 mt-1 text-sm">{clientErrors.payment_receipt || errors.payment_receipt}</div>
                    )}
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-end gap-2">
                  <PrimaryButton type="submit" disabled={processing}>
                    {processing ? "Applying..." : "Apply"}
                  </PrimaryButton>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </Modal>
      </section>
    </div>
  );
}

