// import React from "react";
// import { useForm } from "@inertiajs/react";

// export default function ResubmitCoursePaymentForm({ application }) {
//   const { data, setData, post, processing, errors } = useForm({
//     application_id: application.id,
//     payment_type: application.payment_type || "full",
//     payment_method: "Online Transfer",
//     payment_receipt: null,
//   });

//   const submit = (e) => {
//     e.preventDefault();
//     post(route("student.courses.apply"), { forceFormData: true });
//   };

//   return (
//     <form onSubmit={submit} encType="multipart/form-data" className="border p-4 bg-gray-50 rounded">
//       <div className="mb-2">
//         <label className="block font-medium">Payment Method</label>
//         <select
//           className="w-full border rounded p-2"
//           value={data.payment_method}
//           onChange={(e) => setData("payment_method", e.target.value)}
//         >
//           <option value="Online Transfer">Online Transfer</option>
//           <option value="Bank Payment">Bank Payment</option>
//           <option value="Handover">Handover</option>
//         </select>
//       </div>

//       {data.payment_method !== "Handover" && (
//         <div className="mb-2">
//           <label className="block font-medium">Upload Receipt</label>
//           <input
//             type="file"
//             accept=".jpg,.jpeg,.png,.pdf"
//             className="w-full border p-2"
//             onChange={(e) => setData("payment_receipt", e.target.files[0])}
//           />
//           {errors.payment_receipt && (
//             <div className="text-red-600">{errors.payment_receipt}</div>
//           )}
//         </div>
//       )}

//       <button
//         type="submit"
//         className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         disabled={processing}
//       >
//         Resubmit Payment
//       </button>
//     </form>
//   );
// }



import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

function validateCoursePayment({ payment_method, payment_receipt }) {
  const errors = {};
  if (!payment_method) {
    errors.payment_method = "Payment method is required.";
  }
  if (
    (payment_method === "Online Transfer" || payment_method === "Bank Payment") &&
    !payment_receipt
  ) {
    errors.payment_receipt = "Payment receipt is required for this method.";
  }
  return errors;
}

export default function ResubmitCoursePaymentForm({ application }) {
  const [showModal, setShowModal] = useState(false);
  const [clientErrors, setClientErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    application_id: application.id,
    payment_type: application.payment_type || "full",
    payment_method: "Online Transfer",
    payment_receipt: null,
  });

  const handleFileChange = (e) => {
    setData("payment_receipt", e.target.files[0]);
    setClientErrors((prev) => ({ ...prev, payment_receipt: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateCoursePayment(data);
    setClientErrors(validation);
    if (Object.keys(validation).length > 0) return;
    post(route("student.courses.apply"), {
      forceFormData: true,
      onSuccess: () => {
        reset();
        setShowModal(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3500); // Hide after 3.5s
      },
    });
  };

  return (
    <div>
      {/* Success Notification */}
      {success && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded shadow-lg font-semibold animate-fade-in">
          Payment resubmitted successfully!
        </div>
      )}

      <PrimaryButton onClick={() => setShowModal(true)}>
        Resubmit Course Payment
      </PrimaryButton>

      <Modal show={showModal} maxWidth="sm" onClose={() => setShowModal(false)}>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="p-6 space-y-5"
        >
          <h2 className="text-lg font-bold text-gray-800 mb-2">
            Resubmit Course Payment
          </h2>

          <div>
            <InputLabel value={<span>Payment Method <span className="text-red-500">*</span></span>} />
            <select
              className="w-full border rounded p-2 mt-1"
              value={data.payment_method}
              onChange={(e) => {
                setData("payment_method", e.target.value);
                setClientErrors((prev) => ({ ...prev, payment_method: undefined }));
              }}
              required
            >
              <option value="Online Transfer">Online Transfer</option>
              <option value="Bank Payment">Bank Payment</option>
              <option value="Handover">Handover</option>
            </select>
            <InputError message={clientErrors.payment_method || errors.payment_method} className="mt-1" />
          </div>

          {(data.payment_method === "Online Transfer" || data.payment_method === "Bank Payment") && (
            <div>
              <InputLabel value={<span>Upload Receipt <span className="text-red-500">*</span></span>} />
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                className="w-full border rounded p-2 mt-1"
                onChange={handleFileChange}
                required
              />
              <InputError message={clientErrors.payment_receipt || errors.payment_receipt} className="mt-1" />
            </div>
          )}

          <div className="flex justify-end gap-2">
            <PrimaryButton type="submit" disabled={processing}>
              {processing ? "Submitting..." : "Resubmit Payment"}
            </PrimaryButton>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
