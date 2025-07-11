import React from "react";

export default function PaymentSummaryCard({ payments }) {
    return (
        <div className="bg-white p-4 rounded shadow mb-6">
            <h4 className="text-lg font-semibold mb-2">Payment Summary</h4>
            <form
                action={route("reports.payments.download")}
                method="GET"
                target="_blank"
            >
                <input type="date" name="start_date" required />
                <input type="date" name="end_date" required />
                <button type="submit">Download Filtered Report</button>
            </form>

            <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                    <span>Total Yearly Income:</span>
                    <span className="font-semibold text-green-700">
                        Rs. {payments.total_yearly_income}
                    </span>
                </li>
                <li className="flex justify-between">
                    <span>Last Month Income:</span>
                    <span className="font-semibold text-blue-600">
                        Rs. {payments.last_month_income}
                    </span>
                </li>
                <li className="flex justify-between">
                    <span>This Month Expected:</span>
                    <span className="font-semibold text-yellow-600">
                        Rs. {payments.this_month_expected}
                    </span>
                </li>
                <li className="flex justify-between">
                    <span>Next Month Expected:</span>
                    <span className="font-semibold text-purple-600">
                        Rs. {payments.next_month_expected}
                    </span>
                </li>
                <li className="flex justify-between text-red-600">
                    <span>Overdue Count:</span>
                    <span className="font-semibold">
                        {payments.overdue_count}
                    </span>
                </li>
                <li className="flex justify-between text-red-600">
                    <span>Overdue Amount:</span>
                    <span className="font-semibold">
                        Rs. {payments.overdue_amount}
                    </span>
                </li>
            </ul>
        </div>
    );
}
