import React from 'react';
import { useForm } from '@inertiajs/react';

export default function PayInstallment({ application }) {
    const perInstallment = application.full_amount / application.duration_months;
    const remainingInstallments = (application.full_amount - application.paid) / perInstallment;

    const { data, setData, post, processing, errors } = useForm({
        application_id: application.application_id,
        amount: perInstallment,
        payment_method: 'Online Transfer',
        receipt: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('student.installments.pay'), {
            forceFormData: true,
        });
    };

    return (
        <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">
                Pay Installment{application.course_name ? ` for: ${application.course_name}` : ''}
            </h2>

            <p className="mb-4 text-sm text-gray-700">
                Total: Rs. {application.full_amount} <br />
                Paid: Rs. {application.paid} <br />
                Due: Rs. {application.due} <br />
                Next Payment Due Date: {application.next_due_date} <br />
                Installments Remaining: {Math.ceil(remainingInstallments)} <br />
                <strong>Installment Amount: Rs. {perInstallment.toFixed(2)}</strong>
            </p>

            <form onSubmit={submit} encType="multipart/form-data">
                <input type="hidden" name="amount" value={perInstallment} />

                <div className="mb-4">
                    <label className="block font-medium">Payment Method</label>
                    <select
                        className="w-full border p-2"
                        value={data.payment_method}
                        onChange={(e) => setData('payment_method', e.target.value)}
                    >
                        <option value="Online Transfer">Online Transfer</option>
                        <option value="Bank Payment">Bank Payment</option>
                        <option value="Handover">Handover</option>
                    </select>
                </div>

                {data.payment_method !== 'Handover' && (
                    <div className="mb-4">
                        <label className="block font-medium">Receipt</label>
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={(e) => setData('receipt', e.target.files[0])}
                        />
                        {errors.receipt && <div className="text-red-600">{errors.receipt}</div>}
                    </div>
                )}

                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    disabled={processing}
                >
                    Pay Rs. {perInstallment.toFixed(2)} Installment
                </button>
            </form>
        </div>
    );
}
