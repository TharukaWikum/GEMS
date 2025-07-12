// export default function SummaryCards({ summary }) {
//     return (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//             <div className="bg-white p-4 rounded shadow">
//                 <h4 className="text-gray-500 text-sm">Active Students</h4>
//                 <p className="text-2xl font-bold">{summary.active_students}</p>
//             </div>
//             <div className="bg-white p-4 rounded shadow">
//                 <h4 className="text-gray-500 text-sm">Active Staff</h4>
//                 <p className="text-2xl font-bold">{summary.active_staff}</p>
//             </div>
//             <div className="bg-white p-4 rounded shadow">
//                 <h4 className="text-gray-500 text-sm">Blocked Students</h4>
//                 <p className="text-2xl font-bold">{summary.blocked_students}</p>
//             </div>
//         </div>
//     );
// }



import React from "react";
import GroupIcon from '@mui/icons-material/Group';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BlockIcon from '@mui/icons-material/Block';

export default function SummaryCards({ summary }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
        <div className="bg-green-100 text-green-700 rounded-full p-3">
          <GroupIcon fontSize="medium" />
        </div>
        <div>
          <h4 className="text-gray-500 text-sm font-semibold">Active Students</h4>
          <p className="text-3xl font-bold text-gray-800">{summary.active_students}</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
        <div className="bg-blue-100 text-blue-700 rounded-full p-3">
          <SupervisorAccountIcon fontSize="medium" />
        </div>
        <div>
          <h4 className="text-gray-500 text-sm font-semibold">Active Staff</h4>
          <p className="text-3xl font-bold text-gray-800">{summary.active_staff}</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
        <div className="bg-red-100 text-red-700 rounded-full p-3">
          <BlockIcon fontSize="medium" />
        </div>
        <div>
          <h4 className="text-gray-500 text-sm font-semibold">Blocked Students</h4>
          <p className="text-3xl font-bold text-gray-800">{summary.blocked_students}</p>
        </div>
      </div>
    </div>
  );
}
