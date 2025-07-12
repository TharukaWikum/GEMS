// import React, { useState } from 'react';
// import { useForm } from '@inertiajs/react';

// export default function ResubmitRegistrationPaymentForm({ rejected }) {
//   const form = useForm({
//     payment_method: '',
//     payment_receipt: null,
//   });

//   const handleFileChange = (e) => {
//     form.setData('payment_receipt', e.target.files[0]);
//   };

//   return (
//     <div className="bg-red-100 border border-red-400 p-6 rounded shadow">
//       <h2 className="text-lg font-bold text-red-700 mb-4">
//         Your registration payment was rejected.
//       </h2>
//       <p className="text-sm text-gray-700 mb-4">
//         Please resubmit your payment to continue with the registration process.
//       </p>

//       <form onSubmit={e => { e.preventDefault(); form.post('/student/resubmit-registration-payment') }} className="space-y-4">
//         <div>
//           <label className="block font-semibold">Payment Method</label>
//           <select
//             value={form.data.payment_method}
//             onChange={e => form.setData('payment_method', e.target.value)}
//             className="form-select w-full mt-1"
//             required
//           >
//             <option value="">Select Method</option>
//             <option value="Bank Payment">Bank Payment</option>
//             <option value="Online Transfer">Online Transfer</option>
//             <option value="Handover">Handover</option>
//           </select>
//           {form.errors.payment_method && <div className="text-sm text-red-600">{form.errors.payment_method}</div>}
//         </div>

//         {(form.data.payment_method === 'Bank Payment' || form.data.payment_method === 'Online Transfer') && (
//           <div>
//             <label className="block font-semibold">Upload Receipt</label>
//             <input type="file" onChange={handleFileChange} accept=".jpg,.png,.pdf" className="mt-1" />
//             {form.errors.payment_receipt && <div className="text-sm text-red-600">{form.errors.payment_receipt}</div>}
//           </div>
//         )}

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           disabled={form.processing}
//         >
//           Resubmit Payment
//         </button>
//       </form>
//     </div>
//   );
// }




import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

function validateResubmitPayment({ payment_method, payment_receipt }) {
  const errors = {};
  if (!payment_method) {
    errors.payment_method = "Payment method is required.";
  }
  if (
    (payment_method === "Bank Payment" || payment_method === "Online Transfer") &&
    !payment_receipt
  ) {
    errors.payment_receipt = "Payment receipt is required for this method.";
  }
  return errors;
}

export default function ResubmitRegistrationPaymentForm({ rejected }) {
  const [showModal, setShowModal] = useState(false);
  const [clientErrors, setClientErrors] = useState({});
  const form = useForm({
    payment_method: '',
    payment_receipt: null,
  });

  const handleFileChange = (e) => {
    form.setData('payment_receipt', e.target.files[0]);
    setClientErrors((prev) => ({ ...prev, payment_receipt: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateResubmitPayment(form.data);
    setClientErrors(errors);
    if (Object.keys(errors).length > 0) return;
    form.post('/student/resubmit-registration-payment', {
      onSuccess: () => setShowModal(false),
    });
  };

  return (
    <div>
      <PrimaryButton className='bg--500' onClick={() => setShowModal(true)}>
        Resubmit Registration Payment
      </PrimaryButton>

      <Modal show={showModal} maxWidth="sm" onClose={() => setShowModal(false)}>
        <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded shadow">
          <h2 className="text-lg font-bold text-red-700 mb-2 flex items-center gap-2">
            <span>Payment Rejected</span>
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            Your registration payment was rejected.<br />
            Please resubmit your payment to continue with the registration process.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <InputLabel value={<span>Payment Method <span className="text-red-500">*</span></span>} />
              <select
                value={form.data.payment_method}
                onChange={e => {
                  form.setData('payment_method', e.target.value);
                  setClientErrors((prev) => ({ ...prev, payment_method: undefined }));
                }}
                className="w-full border rounded px-3 py-2 mt-1"
                required
              >
                <option value="">Select Method</option>
                <option value="Bank Payment">Bank Payment</option>
                <option value="Online Transfer">Online Transfer</option>
                <option value="Handover">Handover</option>
              </select>
              <InputError message={clientErrors.payment_method || form.errors.payment_method} className="mt-1" />
            </div>

            {(form.data.payment_method === 'Bank Payment' || form.data.payment_method === 'Online Transfer') && (
              <div>
                <InputLabel value={<span>Upload Receipt <span className="text-red-500">*</span></span>} />
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".jpg,.png,.pdf"
                  className="mt-1 block w-full border rounded px-3 py-2"
                  required
                />
                <InputError message={clientErrors.payment_receipt || form.errors.payment_receipt} className="mt-1" />
              </div>
            )}

            <div className="flex justify-end gap-2">
              <PrimaryButton type="submit" disabled={form.processing}>
                {form.processing ? "Resubmitting..." : "Resubmit Payment"}
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
        </div>
      </Modal>
    </div>
  );
}
