// import React from 'react';
// import { Head } from '@inertiajs/react';

// export default function AllPayments({ payments }) {
//     console.log("payments",payments)
//   return (
//     <>
//       <Head title="All Payments" />
//       <div className="p-6">
//         <h1 className="text-2xl font-semibold mb-4">Complete Payment Report</h1>
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200">
//             <thead className="bg-gray-100 text-sm font-semibold">
//               <tr>
//                 <th className="px-4 py-2 border">Student</th>
//                 <th className="px-4 py-2 border">Email</th>
//                 <th className="px-4 py-2 border">Type</th>
//                 <th className="px-4 py-2 border">Amount</th>
//                 <th className="px-4 py-2 border">Method</th>
//                 <th className="px-4 py-2 border">Verified</th>
//                 <th className="px-4 py-2 border">Verified By</th>
//                 <th className="px-4 py-2 border">Verified At</th>
//                 <th className="px-4 py-2 border">Rejected</th>
//                 <th className="px-4 py-2 border">Rejected By</th>
//                 <th className="px-4 py-2 border">Rejection Reason</th>
//                 <th className="px-4 py-2 border">Course</th>
//                 <th className="px-4 py-2 border">Receipt</th>
//                 <th className="px-4 py-2 border">Created At</th>
//               </tr>
//             </thead>
//             <tbody className="text-sm">
//               {payments.map((p, idx) => (
//                 <tr key={idx} className="border-t">
//                   <td className="px-4 py-2 border">{p.student_name}</td>
//                   <td className="px-4 py-2 border">{p.email}</td>
//                   <td className="px-4 py-2 border">{p.type}</td>
//                   <td className="px-4 py-2 border">Rs. {parseFloat(p.amount).toFixed(2)}</td>
//                   <td className="px-4 py-2 border">{p.method}</td>
//                   <td className="px-4 py-2 border">{p.verified}</td>
//                   <td className="px-4 py-2 border">{p.verified_by}</td>
//                   <td className="px-4 py-2 border">{p.verified_at}</td>
//                   <td className="px-4 py-2 border">{p.rejected}</td>
//                   <td className="px-4 py-2 border">{p.rejected_by}</td>
//                   <td className="px-4 py-2 border">{p.rejection_reason}</td>
//                   <td className="px-4 py-2 border">{p.course}</td>
//                   <td className="px-4 py-2 border">{p.receipt ? 'Yes' : 'No'}</td>
//                   <td className="px-4 py-2 border">{p.created_at}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }

// import React, { useState, useMemo } from 'react';
// import { Head } from '@inertiajs/react';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CancelIcon from '@mui/icons-material/Cancel';
// import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

// const statusBadge = (p) => {
//   if (p.verified) {
//     return (
//       <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold text-xs">
//         <CheckCircleIcon fontSize="inherit" className="text-green-500" />
//         Verified
//       </span>
//     );
//   }
//   if (p.rejected) {
//     return (
//       <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-semibold text-xs">
//         <CancelIcon fontSize="inherit" className="text-red-500" />
//         Rejected
//       </span>
//     );
//   }
//   return (
//     <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-semibold text-xs">
//       <HourglassBottomIcon fontSize="inherit" className="text-yellow-500" />
//       Pending
//     </span>
//   );
// };

// function sortPayments(payments, sortKey, sortAsc) {
//   return [...payments].sort((a, b) => {
//     if (!a[sortKey] && !b[sortKey]) return 0;
//     if (!a[sortKey]) return 1;
//     if (!b[sortKey]) return -1;
//     if (a[sortKey] === b[sortKey]) return 0;
//     return sortAsc
//       ? String(a[sortKey]).localeCompare(String(b[sortKey]))
//       : String(b[sortKey]).localeCompare(String(a[sortKey]));
//   });
// }

// function PaymentTable({ title, payments, columns }) {
//   const [search, setSearch] = useState("");
//   const [sortKey, setSortKey] = useState(columns[0].key);
//   const [sortAsc, setSortAsc] = useState(true);

//   const filtered = useMemo(() => {
//     return payments.filter((p) =>
//       columns.some((col) =>
//         (p[col.key] || "")
//           .toString()
//           .toLowerCase()
//           .includes(search.toLowerCase())
//       )
//     );
//   }, [search, payments, columns]);

//   const sorted = useMemo(
//     () => sortPayments(filtered, sortKey, sortAsc),
//     [filtered, sortKey, sortAsc]
//   );

//   return (
//     <div className="mb-10 bg-white rounded-xl shadow-md p-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
//         <h2 className="text-xl font-bold text-gray-800">{title}</h2>
//         <input
//           type="text"
//           placeholder="Search..."
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//           className="border px-3 py-2 rounded w-full sm:w-64"
//         />
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full text-sm text-gray-700">
//           <thead>
//             <tr className="bg-gray-100 text-base">
//               {columns.map(col => (
//                 <th
//                   key={col.key}
//                   className="p-3 font-semibold cursor-pointer select-none"
//                   onClick={() => {
//                     if (sortKey === col.key) setSortAsc(a => !a);
//                     else {
//                       setSortKey(col.key);
//                       setSortAsc(true);
//                     }
//                   }}
//                 >
//                   {col.label}
//                   {sortKey === col.key ? (
//                     <span>{sortAsc ? " ▲" : " ▼"}</span>
//                   ) : null}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {sorted.length === 0 ? (
//               <tr>
//                 <td colSpan={columns.length} className="p-6 text-center text-gray-500 bg-gray-50">
//                   No records found.
//                 </td>
//               </tr>
//             ) : (
//               sorted.map((p, idx) => (
//                 <tr key={idx} className="border-b last:border-none">
//                   {columns.map(col => (
//                     <td className="p-3 align-middle" key={col.key}>
//                       {col.render ? col.render(p) : p[col.key] ?? "-"}
//                     </td>
//                   ))}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default function AllPayments({ payments }) {
//   // Separate payments by status
//   const verified = payments.filter(p => p.verified);
//   const rejected = payments.filter(p => p.rejected);
//   const pending = payments.filter(p => !p.verified && !p.rejected);

//   const columns = [
//     { key: "student_name", label: "Student" },
//     { key: "email", label: "Email" },
//     { key: "type", label: "Type" },
//     { key: "amount", label: "Amount", render: p => `Rs. ${parseFloat(p.amount).toFixed(2)}` },
//     { key: "method", label: "Method" },
//     { key: "status", label: "Status", render: statusBadge },
//     { key: "verified_by", label: "Verified By" },
//     { key: "verified_at", label: "Verified At" },
//     { key: "rejected_by", label: "Rejected By" },
//     { key: "rejection_reason", label: "Rejection Reason" },
//     { key: "course", label: "Course" },
//     { key: "receipt", label: "Receipt", render: p => p.receipt ? 'Yes' : 'No' },
//     { key: "created_at", label: "Created At" },
//   ];

//   return (
//     <>
//       <Head title="All Payments" />
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <h1 className="text-2xl font-bold mb-8 text-gray-800">Complete Payment Report</h1>
//         <PaymentTable
//           title="Verified Payments"
//           payments={verified}
//           columns={columns}
//         />
//         <PaymentTable
//           title="Rejected Payments"
//           payments={rejected}
//           columns={columns}
//         />
//         <PaymentTable
//           title="Pending Payments"
//           payments={pending}
//           columns={columns}
//         />
//       </div>
//     </>
//   );
// }



import React, { useMemo, useState } from "react";
import { Head } from "@inertiajs/react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";

// Helper: status badge
const statusBadge = (status) => {
    if (status === "verified")
        return (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold text-xs">
                <CheckCircleIcon
                    fontSize="inherit"
                    className="text-green-500"
                />{" "}
                Verified
            </span>
        );
    if (status === "rejected")
        return (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-semibold text-xs">
                <CancelIcon fontSize="inherit" className="text-red-500" />{" "}
                Rejected
            </span>
        );
    return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-semibold text-xs">
            <HourglassBottomIcon
                fontSize="inherit"
                className="text-yellow-500"
            />{" "}
            Pending
        </span>
    );
};

// Helper: format date
const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString.replace(/-/g, "/")); // Safari fix
    if (isNaN(date)) return dateString;
    return date.toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
};

// Helper: get month options from payments
const getMonthOptions = (payments) => {
    const months = Array.from(
        new Set(payments.map((p) => p.created_at?.slice(0, 7)).filter(Boolean))
    );
    return months.sort((a, b) => b.localeCompare(a));
};

function filterByMonth(payments, month) {
    if (!month) return payments;
    return payments.filter(
        (p) => p.created_at && p.created_at.startsWith(month)
    );
}

function filterBySearch(payments, search) {
    if (!search.trim()) return payments;
    const s = search.toLowerCase();
    return payments.filter(
        (p) =>
            (p.student_name || "").toLowerCase().includes(s) ||
            (p.email || "").toLowerCase().includes(s) ||
            (p.course || "").toLowerCase().includes(s)
    );
}

function sortPayments(payments, sortKey, sortDir) {
    if (!sortKey) return payments;
    return [...payments].sort((a, b) => {
        let aVal = a[sortKey] || "";
        let bVal = b[sortKey] || "";
        if (sortKey === "amount") {
            aVal = parseFloat(aVal);
            bVal = parseFloat(bVal);
        }
        if (sortKey === "created_at" || sortKey === "verified_at") {
            aVal = new Date(aVal.replace(/-/g, "/"));
            bVal = new Date(bVal.replace(/-/g, "/"));
        }
        if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
        return 0;
    });
}

// Payment status detection
function getStatus(p) {
    if (p.verified === "Yes") return "verified";
    if (p.rejected === "Yes") return "rejected";
    return "pending";
}

// Payment summary
function getSummary(payments) {
    const total = payments.length;
    const verified = payments.filter((p) => getStatus(p) === "verified");
    const rejected = payments.filter((p) => getStatus(p) === "rejected");
    const pending = payments.filter((p) => getStatus(p) === "pending");
    const sum = (arr) => arr.reduce((a, b) => a + parseFloat(b.amount || 0), 0);
    return {
        total,
        verified: verified.length,
        rejected: rejected.length,
        pending: pending.length,
        sumAll: sum(payments),
        sumVerified: sum(verified),
        sumRejected: sum(rejected),
        sumPending: sum(pending),
    };
}

function PaymentTable({
    payments,
    columns,
    status,
    defaultSort = "created_at",
    defaultDir = "desc",
    title,
    paginated = false, // <-- Add this prop (default true)
    pageSize = 5, // <-- Add this prop (default 10)
}) {
    const [search, setSearch] = useState("");
    const [month, setMonth] = useState("");
    const [sortKey, setSortKey] = useState(defaultSort);
    const [sortDir, setSortDir] = useState(defaultDir);

    const [page, setPage] = useState(1);

    const monthOptions = useMemo(() => getMonthOptions(payments), [payments]);
    const filtered = useMemo(() => {
        let arr = filterByMonth(payments, month);
        arr = filterBySearch(arr, search);
        arr = sortPayments(arr, sortKey, sortDir);
        return arr;
    }, [payments, search, month, sortKey, sortDir]);

    // Pagination logic
    const paginatedRows = paginated
        ? filtered.slice((page - 1) * pageSize, page * pageSize)
        : filtered;

    const handleSort = (key) => {
        if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        else {
            setSortKey(key);
            setSortDir("asc");
        }
    };

    // Reset page to 1 when filters/search change
    React.useEffect(() => {
        setPage(1);
    }, [search, month, sortKey, sortDir]);

    return (
        <div className="mb-8 bg-white rounded-xl shadow-md p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                <h2 className="text-lg font-bold text-gray-800">{title}</h2>
                <div className="flex flex-wrap gap-2">
                    <input
                        type="text"
                        placeholder="Search by name/email/course"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border rounded px-3 py-1 text-sm"
                    />
                    <select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="border rounded px-3 py-1 text-sm"
                    >
                        <option value="">All Months</option>
                        {monthOptions.map((m) => (
                            <option key={m} value={m}>
                                {m}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-gray-700">
                    <thead>
                        <tr className="bg-gray-100 text-base">
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className="p-3 font-semibold cursor-pointer select-none"
                                    onClick={() =>
                                        col.sortable && handleSort(col.key)
                                    }
                                    style={
                                        col.sortable
                                            ? { textDecoration: "underline" }
                                            : {}
                                    }
                                >
                                    {col.label}
                                    {col.sortable && sortKey === col.key && (
                                        <span>
                                            {sortDir === "asc" ? " ▲" : " ▼"}
                                        </span>
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* {filtered.length === 0 ? ( */}
                        {paginatedRows.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="p-6 text-center text-gray-500 bg-gray-50"
                                >
                                    No payments found.
                                </td>
                            </tr>
                        ) : (
                            paginatedRows.map((p, idx) => (
                                <tr
                                    key={idx}
                                    className="border-b last:border-none"
                                >
                                    {columns.map((col) => (
                                        <td
                                            key={col.key}
                                            className="p-3 align-middle"
                                        >
                                            {col.render
                                                ? col.render(p)
                                                : p[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {paginated && (
                <Pagination
                    page={page}
                    pageSize={pageSize}
                    total={filtered.length}
                    onPageChange={setPage}
                />
            )}
        </div>
    );
}

export default function AllPayments({ payments }) {
    // Split payments by status
    const verified = payments.filter((p) => getStatus(p) === "verified");
    const rejected = payments.filter((p) => getStatus(p) === "rejected");
    const pending = payments.filter((p) => getStatus(p) === "pending");
    const summary = getSummary(payments);

    // Columns for each table
    const baseColumns = [
        { key: "student_name", label: "Student", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "type", label: "Type", sortable: true },
        {
            key: "amount",
            label: "Amount",
            sortable: true,
            render: (p) => `Rs. ${parseFloat(p.amount).toFixed(2)}`,
        },
        { key: "method", label: "Method", sortable: true },
        { key: "course", label: "Course", sortable: true },
        {
            key: "created_at",
            label: "Created At",
            sortable: true,
            render: (p) => formatDate(p.created_at),
        },
    ];

    const verifiedColumns = [
        ...baseColumns,
        {
            key: "verified_at",
            label: "Verified At",
            sortable: true,
            render: (p) => formatDate(p.verified_at),
        },
        {
            key: "receipt",
            label: "Receipt",
            render: (p) => (p.receipt ? "Yes" : "No"),
        },
        {
            key: "status",
            label: "Status",
            render: () => statusBadge("verified"),
        },
    ];

    const rejectedColumns = [
        ...baseColumns,
        { key: "rejection_reason", label: "Rejection Reason" },
        { key: "rejected_by", label: "Rejected By" },
        {
            key: "receipt",
            label: "Receipt",
            render: (p) => (p.receipt ? "Yes" : "No"),
        },
        {
            key: "status",
            label: "Status",
            render: () => statusBadge("rejected"),
        },
    ];

    const pendingColumns = [
        ...baseColumns,
        {
            key: "receipt",
            label: "Receipt",
            render: (p) => (p.receipt ? "Yes" : "No"),
        },
        {
            key: "status",
            label: "Status",
            render: () => statusBadge("pending"),
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800">
                    Payment Details
                </h2>
            }
        >
            <>
                <Head title="All Payments" />
                <section className="max-w-7xl mx-auto px-4 py-8">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                            <span className="text-gray-500 text-sm mb-1">
                                Total Payments
                            </span>
                            <span className="text-3xl font-bold text-gray-800">
                                {summary.total}
                            </span>
                            <span className="text-xs text-gray-500 mt-1">
                                Rs. {summary.sumAll.toLocaleString()}
                            </span>
                        </div>
                        <div className="bg-green-50 rounded-xl shadow p-6 flex flex-col items-center">
                            <span className="text-green-700 text-sm mb-1">
                                Verified
                            </span>
                            <span className="text-3xl font-bold text-green-700">
                                {summary.verified}
                            </span>
                            <span className="text-xs text-green-700 mt-1">
                                Rs. {summary.sumVerified.toLocaleString()}
                            </span>
                        </div>
                        <div className="bg-red-50 rounded-xl shadow p-6 flex flex-col items-center">
                            <span className="text-red-700 text-sm mb-1">
                                Rejected
                            </span>
                            <span className="text-3xl font-bold text-red-700">
                                {summary.rejected}
                            </span>
                            <span className="text-xs text-red-700 mt-1">
                                Rs. {summary.sumRejected.toLocaleString()}
                            </span>
                        </div>
                        <div className="bg-yellow-50 rounded-xl shadow p-6 flex flex-col items-center">
                            <span className="text-yellow-700 text-sm mb-1">
                                Pending
                            </span>
                            <span className="text-3xl font-bold text-yellow-700">
                                {summary.pending}
                            </span>
                            <span className="text-xs text-yellow-700 mt-1">
                                Rs. {summary.sumPending.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* Verified Payments Table */}
                    <PaymentTable
                        payments={verified}
                        columns={verifiedColumns}
                        status="verified"
                        title="Verified Payments"
                        paginated={false} // or omit for default
                        pageSize={5} // optional
                    />

                    {/* Rejected Payments Table */}
                    <PaymentTable
                        payments={rejected}
                        columns={rejectedColumns}
                        status="rejected"
                        title="Rejected Payments"
                    />

                    {/* Pending Payments Table */}
                    <PaymentTable
                        payments={pending}
                        columns={pendingColumns}
                        status="pending"
                        title="Pending Payments"
                    />
                </section>
            </>
        </AuthenticatedLayout>
    );
}
