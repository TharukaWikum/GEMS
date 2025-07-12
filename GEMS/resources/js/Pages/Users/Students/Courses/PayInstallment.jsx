// import React from 'react';
// import { useForm } from '@inertiajs/react';

// export default function PayInstallment({ application }) {
//     const perInstallment = application.full_amount / application.duration_months;
//     const remainingInstallments = (application.full_amount - application.paid) / perInstallment;

//     const { data, setData, post, processing, errors } = useForm({
//         application_id: application.application_id,
//         amount: perInstallment,
//         payment_method: 'Online Transfer',
//         receipt: null,
//     });

//     const submit = (e) => {
//         e.preventDefault();
//         post(route('student.installments.pay'), {
//             forceFormData: true,
//         });
//     };

//     return (
//         <div className="bg-white p-6 rounded shadow">
//             <h2 className="text-lg font-semibold mb-4">
//                 Pay Installment{application.course_name ? ` for: ${application.course_name}` : ''}
//             </h2>

//             <p className="mb-4 text-sm text-gray-700">
//                 Total: Rs. {application.full_amount} <br />
//                 Paid: Rs. {application.paid} <br />
//                 Due: Rs. {application.due} <br />
//                 Next Payment Due Date: {application.next_due_date} <br />
//                 Installments Remaining: {Math.ceil(remainingInstallments)} <br />
//                 <strong>Installment Amount: Rs. {perInstallment.toFixed(2)}</strong>
//             </p>

//             <form onSubmit={submit} encType="multipart/form-data">
//                 <input type="hidden" name="amount" value={perInstallment} />

//                 <div className="mb-4">
//                     <label className="block font-medium">Payment Method</label>
//                     <select
//                         className="w-full border p-2"
//                         value={data.payment_method}
//                         onChange={(e) => setData('payment_method', e.target.value)}
//                     >
//                         <option value="Online Transfer">Online Transfer</option>
//                         <option value="Bank Payment">Bank Payment</option>
//                         <option value="Handover">Handover</option>
//                     </select>
//                 </div>

//                 {data.payment_method !== 'Handover' && (
//                     <div className="mb-4">
//                         <label className="block font-medium">Receipt</label>
//                         <input
//                             type="file"
//                             accept=".jpg,.jpeg,.png,.pdf"
//                             onChange={(e) => setData('receipt', e.target.files[0])}
//                         />
//                         {errors.receipt && <div className="text-red-600">{errors.receipt}</div>}
//                     </div>
//                 )}

//                 <button
//                     type="submit"
//                     className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                     disabled={processing}
//                 >
//                     Pay Rs. {perInstallment.toFixed(2)} Installment
//                 </button>
//             </form>
//         </div>
//     );
// }


import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PaymentIcon from '@mui/icons-material/Payment';

function validateInstallment({ payment_method, receipt }) {
  const errors = {};
  if (!payment_method) errors.payment_method = "Payment method is required.";
  if (
    (payment_method === "Online Transfer" || payment_method === "Bank Payment") &&
    !receipt
  ) {
    errors.receipt = "Receipt is required for this method.";
  }
  return errors;
}

export default function PayInstallment({ application }) {
  const perInstallment = application.full_amount / application.duration_months;
  const remainingInstallments = (application.full_amount - application.paid) / perInstallment;

  const [showModal, setShowModal] = useState(false);
  const [clientErrors, setClientErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    application_id: application.application_id,
    amount: perInstallment,
    payment_method: 'Online Transfer',
    receipt: null,
  });

  const handleFileChange = (e) => {
    setData('receipt', e.target.files[0]);
    setClientErrors((prev) => ({ ...prev, receipt: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateInstallment(data);
    setClientErrors(validation);
    if (Object.keys(validation).length > 0) return;
    post(route('student.installments.pay'), {
      forceFormData: true,
      onSuccess: () => {
        setSuccess(true);
        reset();
        setTimeout(() => setSuccess(false), 3500);
        setShowModal(false);
      },
    });
  };

  return (
    <div>
      {/* Success Notification */}
      {success && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded shadow-lg font-semibold animate-fade-in">
          Installment paid successfully!
        </div>
      )}

      <PrimaryButton onClick={() => setShowModal(true)}>
        Pay Installment
      </PrimaryButton>

      <Modal show={showModal} maxWidth="sm" onClose={() => setShowModal(false)}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <PaymentIcon className="text-blue-600" />
            <h2 className="text-lg font-bold text-gray-800">
              Pay Installment{application.course_name ? ` for: ${application.course_name}` : ''}
            </h2>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div><span className="font-semibold">Total:</span> Rs. {application.full_amount}</div>
              <div><span className="font-semibold">Paid:</span> Rs. {application.paid}</div>
              <div><span className="font-semibold">Due:</span> Rs. {application.due}</div>
              <div><span className="font-semibold">Next Due Date:</span> {application.next_due_date}</div>
              <div><span className="font-semibold">Installments Remaining:</span> {Math.ceil(remainingInstallments)}</div>
              <div className="font-bold text-blue-700">
                Installment Amount: Rs. {perInstallment.toFixed(2)}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
            <input type="hidden" name="amount" value={perInstallment} />

            <div>
              <InputLabel value={<span>Payment Method <span className="text-red-500">*</span></span>} />
              <select
                className="w-full border rounded p-2 mt-1"
                value={data.payment_method}
                onChange={(e) => {
                  setData('payment_method', e.target.value);
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

            {(data.payment_method === 'Online Transfer' || data.payment_method === 'Bank Payment') && (
              <div>
                <InputLabel value={<span>Upload Receipt <span className="text-red-500">*</span></span>} />
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="w-full border rounded p-2 mt-1"
                  onChange={handleFileChange}
                  required
                />
                <InputError message={clientErrors.receipt || errors.receipt} className="mt-1" />
              </div>
            )}

            <div className="flex justify-end gap-2">
              <PrimaryButton type="submit" disabled={processing}>
                {processing ? "Paying..." : `Pay Rs. ${perInstallment.toFixed(2)} Installment`}
              </PrimaryButton>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
