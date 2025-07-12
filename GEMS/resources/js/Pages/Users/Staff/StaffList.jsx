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






// import { router } from '@inertiajs/react';
// import { useState } from 'react';

// // Helper for status color classes
// const statusColor = (status) => {
//   switch (status) {
//     case "active":
//       return "bg-green-100 text-green-700";
//     case "inactive":
//       return "bg-yellow-100 text-yellow-700";
//     case "blocked":
//       return "bg-red-100 text-red-700";
//     default:
//       return "bg-gray-100 text-gray-700";
//   }
// };

// export default function StaffList({ staffList = [] }) {
//   return (
//     <section className="max-w-7xl mx-auto mt-8 px-4">
//       <div className="bg-white shadow rounded-xl p-6">
//         <h2 className="text-2xl font-bold mb-4 text-gray-800">Staff List</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm text-gray-700">
//             <thead>
//               <tr className="bg-gray-100 text-base">
//                 <th className="p-3 font-semibold">Name</th>
//                 <th className="p-3 font-semibold">Email</th>
//                 <th className="p-3 font-semibold">Role</th>
//                 <th className="p-3 font-semibold">Status</th>
//                 <th className="p-3 font-semibold">Contact No</th>
//                 <th className="p-3 font-semibold">NIC</th>
//                 <th className="p-3 font-semibold">Address</th>
//                 <th className="p-3 font-semibold">Description</th>
//               </tr>
//             </thead>
//             <tbody>
//               {staffList.length > 0 ? (
//                 staffList.map((staff) => (
//                   <tr key={staff.id} className="border-b last:border-none">
//                     <td className="p-3 align-middle">{staff.name}</td>
//                     <td className="p-3 align-middle">{staff.email}</td>
//                     <td className="p-3 align-middle capitalize">{staff.role}</td>
//                     <td className="p-3 align-middle">
//                       <div className="relative">
//                         <select
//                           defaultValue={staff.status}
//                           className={`
//                             border border-gray-300 rounded px-3 py-1 text-sm font-medium pr-8
//                             focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition
//                             appearance-none
//                             ${statusColor(staff.status)}
//                           `}
//                           style={{ minWidth: 110 }}
//                           onChange={(e) => {
//                             const status = e.target.value;
//                             router.post(
//                               route("admin.staff.updateStatus", staff.id),
//                               { status },
//                               {
//                                 preserveScroll: true,
//                                 preserveState: true,
//                               }
//                             );
//                           }}
//                         >
//                           <option value="active" className="text-green-700 bg-green-50">Active</option>
//                           <option value="inactive" className="text-yellow-700 bg-yellow-50">Inactive</option>
//                           <option value="blocked" className="text-red-700 bg-red-50">Blocked</option>
//                         </select>
//                         {/* Dropdown icon */}
//                         <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
//                           ▼
//                         </span>
//                       </div>
//                       <span className="ml-2 text-xs text-blue-400 italic">(editable)</span>
//                     </td>
//                     <td className="p-3 align-middle">{staff.contact_no}</td>
//                     <td className="p-3 align-middle">{staff.nic}</td>
//                     <td className="p-3 align-middle">{staff.address}</td>
//                     <td className="p-3 align-middle">{staff.description}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="8" className="p-6 text-center text-gray-500 bg-gray-50">
//                     No staff found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </section>
//   );
// }



import { router } from '@inertiajs/react';
import { useState, useMemo } from 'react';

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

const columns = [
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "role", label: "Role", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "contact_no", label: "Contact No", sortable: true },
  { key: "nic", label: "NIC", sortable: true },
  { key: "address", label: "Address", sortable: true },
  { key: "description", label: "Description", sortable: false },
];

export default function StaffList({
  staffList = [],
  searchable = true,
  sortable = true,
}) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc");

  // Filter and sort staff
  const filteredStaff = useMemo(() => {
    let result = staffList;
    if (searchable && search.trim()) {
      const s = search.toLowerCase();
      result = result.filter(
        (staff) =>
          staff.name?.toLowerCase().includes(s) ||
          staff.email?.toLowerCase().includes(s) ||
          staff.role?.toLowerCase().includes(s) ||
          staff.nic?.toLowerCase().includes(s)
      );
    }
    if (sortable && sortKey) {
      result = [...result].sort((a, b) => {
        let aVal = a[sortKey] || "";
        let bVal = b[sortKey] || "";
        if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [staffList, search, sortKey, sortDir, searchable, sortable]);

  const handleSort = (key) => {
    if (!sortable) return;
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <section className="max-w-7xl mx-auto mt-8 px-4">
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Staff List</h2>
        {searchable && (
          <div className="mb-4 flex justify-end">
            <input
              type="text"
              placeholder="Search by name, email, role, or NIC"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded px-3 py-2 text-sm w-full max-w-xs"
            />
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-100 text-base">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`p-3 font-semibold ${sortable && col.sortable ? "cursor-pointer select-none" : ""}`}
                    onClick={() => col.sortable && handleSort(col.key)}
                  >
                    {col.label}
                    {sortable && col.sortable && sortKey === col.key && (
                      <span>{sortDir === "asc" ? " ▲" : " ▼"}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredStaff.length > 0 ? (
                filteredStaff.map((staff) => (
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
                  <td colSpan={columns.length} className="p-6 text-center text-gray-500 bg-gray-50">
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
