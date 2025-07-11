// import { router } from '@inertiajs/react';

// export default function StaffList({ staffList = [] }) {
//     console.log("first", staffList);

//     return (
//         <div className="bg-white overflow-hidden shadow-sm rounded-lg p-6">
//             <div className="text-2xl font-semibold m-2 mb-3">Staff List</div>
//             <table className="min-w-full text-sm text-left border border-gray-300">
//                 <thead className="bg-gray-100">
//                     <tr>
//                         <th className="border px-4 py-2">Name</th>
//                         <th className="border px-4 py-2">Email</th>
//                         <th className="border px-4 py-2">Role</th>
//                         <th className="border px-4 py-2">Status</th>
//                         <th className="border px-4 py-2">Contact No</th>
//                         <th className="border px-4 py-2">NIC</th>
//                         <th className="border px-4 py-2">Address</th>
//                         <th className="border px-4 py-2">Description</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {staffList.length > 0 ? (
//                         staffList.map((staff, index) => (
//                             <tr key={index} className="text-center">
//                                 <td className="border px-4 py-2">{staff.name}</td>
//                                 <td className="border px-4 py-2">{staff.email}</td>
//                                 <td className="border px-4 py-2 capitalize">{staff.role}</td>
//                                 <td className="border px-4 py-2">
//                                     <select
//                                         defaultValue={staff.status}
//                                         className="border rounded p-1 text-sm"
//                                         onChange={(e) => {
//                                             const status = e.target.value;
//                                             router.post(
//                                                 route("admin.staff.updateStatus", staff.id),
//                                                 { status },
//                                                 {
//                                                     preserveScroll: true,
//                                                     preserveState: true,
//                                                 }
//                                             );
//                                         }}
//                                     >
//                                         <option value="active">Active</option>
//                                         <option value="inactive">Inactive</option>
//                                         <option value="blocked">Blocked</option>
//                                     </select>
//                                 </td>
//                                 <td className="border px-4 py-2">{staff.contact_no}</td>
//                                 <td className="border px-4 py-2">{staff.nic}</td>
//                                 <td className="border px-4 py-2">{staff.address}</td>
//                                 <td className="border px-4 py-2">{staff.description}</td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="8" className="text-center py-4">
//                                 No staff found.
//                             </td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// }


import { router } from '@inertiajs/react';
import { useState } from 'react';

// Helper for status color classes
const statusColor = (status) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-700";
    case "inactive":
      return "bg-yellow-100 text-yellow-700";
    case "blocked":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function StaffList({ staffList = [] }) {
  return (
    <section className="max-w-7xl mx-auto mt-8 px-4">
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Staff List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-100 text-base">
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Email</th>
                <th className="p-3 font-semibold">Role</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold">Contact No</th>
                <th className="p-3 font-semibold">NIC</th>
                <th className="p-3 font-semibold">Address</th>
                <th className="p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              {staffList.length > 0 ? (
                staffList.map((staff) => (
                  <tr key={staff.id} className="border-b last:border-none">
                    <td className="p-3 align-middle">{staff.name}</td>
                    <td className="p-3 align-middle">{staff.email}</td>
                    <td className="p-3 align-middle capitalize">{staff.role}</td>
                    <td className="p-3 align-middle">
                      <div className="relative">
                        <select
                          defaultValue={staff.status}
                          className={`
                            border border-gray-300 rounded px-3 py-1 text-sm font-medium pr-8
                            focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition
                            appearance-none
                            ${statusColor(staff.status)}
                          `}
                          style={{ minWidth: 110 }}
                          onChange={(e) => {
                            const status = e.target.value;
                            router.post(
                              route("admin.staff.updateStatus", staff.id),
                              { status },
                              {
                                preserveScroll: true,
                                preserveState: true,
                              }
                            );
                          }}
                        >
                          <option value="active" className="text-green-700 bg-green-50">Active</option>
                          <option value="inactive" className="text-yellow-700 bg-yellow-50">Inactive</option>
                          <option value="blocked" className="text-red-700 bg-red-50">Blocked</option>
                        </select>
                        {/* Dropdown icon */}
                        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                          ▼
                        </span>
                      </div>
                      <span className="ml-2 text-xs text-blue-400 italic">(editable)</span>
                    </td>
                    <td className="p-3 align-middle">{staff.contact_no}</td>
                    <td className="p-3 align-middle">{staff.nic}</td>
                    <td className="p-3 align-middle">{staff.address}</td>
                    <td className="p-3 align-middle">{staff.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-6 text-center text-gray-500 bg-gray-50">
                    No staff found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
