import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function ResubmitRegistrationPaymentForm({ rejected }) {
  const form = useForm({
    payment_method: '',
    payment_receipt: null,
  });

  const handleFileChange = (e) => {
    form.setData('payment_receipt', e.target.files[0]);
  };

  return (
    <div className="bg-red-100 border border-red-400 p-6 rounded shadow">
      <h2 className="text-lg font-bold text-red-700 mb-4">
        Your registration payment was rejected.
      </h2>
      <p className="text-sm text-gray-700 mb-4">
        Please resubmit your payment to continue with the registration process.
      </p>

      <form onSubmit={e => { e.preventDefault(); form.post('/student/resubmit-registration-payment') }} className="space-y-4">
        <div>
          <label className="block font-semibold">Payment Method</label>
          <select
            value={form.data.payment_method}
            onChange={e => form.setData('payment_method', e.target.value)}
            className="form-select w-full mt-1"
            required
          >
            <option value="">Select Method</option>
            <option value="Bank Payment">Bank Payment</option>
            <option value="Online Transfer">Online Transfer</option>
            <option value="Handover">Handover</option>
          </select>
          {form.errors.payment_method && <div className="text-sm text-red-600">{form.errors.payment_method}</div>}
        </div>

        {(form.data.payment_method === 'Bank Payment' || form.data.payment_method === 'Online Transfer') && (
          <div>
            <label className="block font-semibold">Upload Receipt</label>
            <input type="file" onChange={handleFileChange} accept=".jpg,.png,.pdf" className="mt-1" />
            {form.errors.payment_receipt && <div className="text-sm text-red-600">{form.errors.payment_receipt}</div>}
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={form.processing}
        >
          Resubmit Payment
        </button>
      </form>
    </div>
  );
}
