// import React from "react";

// export default function PaymentSummaryCard({ payments }) {
//     return (
//         <div className="bg-white p-4 rounded shadow mb-6">
//             <h4 className="text-lg font-semibold mb-2">Payment Summary</h4>
//             <form
//                 action={route("reports.payments.download")}
//                 method="GET"
//                 target="_blank"
//             >
//                 <input type="date" name="start_date" required />
//                 <input type="date" name="end_date" required />
//                 <button type="submit">Download Filtered Report</button>
//             </form>

//             <ul className="space-y-2 text-sm">
//                 <li className="flex justify-between">
//                     <span>Total Yearly Income:</span>
//                     <span className="font-semibold text-green-700">
//                         Rs. {payments.total_yearly_income}
//                     </span>
//                 </li>
//                 <li className="flex justify-between">
//                     <span>Last Month Income:</span>
//                     <span className="font-semibold text-blue-600">
//                         Rs. {payments.last_month_income}
//                     </span>
//                 </li>
//                 <li className="flex justify-between">
//                     <span>This Month Expected:</span>
//                     <span className="font-semibold text-yellow-600">
//                         Rs. {payments.this_month_expected}
//                     </span>
//                 </li>
//                 <li className="flex justify-between">
//                     <span>Next Month Expected:</span>
//                     <span className="font-semibold text-purple-600">
//                         Rs. {payments.next_month_expected}
//                     </span>
//                 </li>
//                 <li className="flex justify-between text-red-600">
//                     <span>Overdue Count:</span>
//                     <span className="font-semibold">
//                         {payments.overdue_count}
//                     </span>
//                 </li>
//                 <li className="flex justify-between text-red-600">
//                     <span>Overdue Amount:</span>
//                     <span className="font-semibold">
//                         Rs. {payments.overdue_amount}
//                     </span>
//                 </li>
//             </ul>
//         </div>
//     );
// }


import React from "react";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export default function PaymentSummaryCard({ payments }) {
  return (
    <section className="max-w-7xl mx-auto mb-8 px-4">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h4 className="text-xl font-bold mb-6 text-gray-800">Payment Summary</h4>
        <form
          action={route("reports.payments.download")}
          method="GET"
          target="_blank"
          className="flex flex-wrap gap-3 mb-8 items-end"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input type="date" name="start_date" required className="border rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input type="date" name="end_date" required className="border rounded px-3 py-2 text-sm" />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded font-semibold hover:bg-blue-700 transition"
          >
            Download Filtered Report
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex items-center gap-3 bg-green-50 rounded-lg p-4 shadow-sm">
            <AttachMoneyIcon className="text-green-600" />
            <div>
              <div className="text-xs text-gray-500">Total Yearly Income</div>
              <div className="text-lg font-bold text-green-700">
                Rs. {payments.total_yearly_income}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-4 shadow-sm">
            <TrendingUpIcon className="text-blue-600" />
            <div>
              <div className="text-xs text-gray-500">Last Month Income</div>
              <div className="text-lg font-bold text-blue-700">
                Rs. {payments.last_month_income}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-yellow-50 rounded-lg p-4 shadow-sm">
            <TrendingFlatIcon className="text-yellow-600" />
            <div>
              <div className="text-xs text-gray-500">This Month Expected</div>
              <div className="text-lg font-bold text-yellow-700">
                Rs. {payments.this_month_expected}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-purple-50 rounded-lg p-4 shadow-sm">
            <TrendingUpIcon className="text-purple-600" />
            <div>
              <div className="text-xs text-gray-500">Next Month Expected</div>
              <div className="text-lg font-bold text-purple-700">
                Rs. {payments.next_month_expected}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-red-50 rounded-lg p-4 shadow-sm">
            <WarningAmberIcon className="text-red-600" />
            <div>
              <div className="text-xs text-red-600 font-semibold">Overdue Count</div>
              <div className="text-lg font-bold text-red-700">
                {payments.overdue_count}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-red-50 rounded-lg p-4 shadow-sm">
            <WarningAmberIcon className="text-red-600" />
            <div>
              <div className="text-xs text-red-600 font-semibold">Overdue Amount</div>
              <div className="text-lg font-bold text-red-700">
                Rs. {payments.overdue_amount}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
