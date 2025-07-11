import React from "react";
import { useForm } from "@inertiajs/react";

export default function ResubmitCoursePaymentForm({ application }) {
  const { data, setData, post, processing, errors } = useForm({
    application_id: application.id,
    payment_type: application.payment_type || "full",
    payment_method: "Online Transfer",
    payment_receipt: null,
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("student.courses.apply"), { forceFormData: true });
  };

  return (
    <form onSubmit={submit} encType="multipart/form-data" className="border p-4 bg-gray-50 rounded">
      <div className="mb-2">
        <label className="block font-medium">Payment Method</label>
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
        <div className="mb-2">
          <label className="block font-medium">Upload Receipt</label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            className="w-full border p-2"
            onChange={(e) => setData("payment_receipt", e.target.files[0])}
          />
          {errors.payment_receipt && (
            <div className="text-red-600">{errors.payment_receipt}</div>
          )}
        </div>
      )}

      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={processing}
      >
        Resubmit Payment
      </button>
    </form>
  );
}
