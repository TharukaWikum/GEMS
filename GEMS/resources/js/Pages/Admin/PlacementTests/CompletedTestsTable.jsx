import React from "react";
import { Link } from "@inertiajs/react";

const CompletedTestsTable = ({ tests }) => (
    <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Completed Tests</h3>
        <table className="w-full border text-sm mb-4">
            <thead className="bg-gray-100">
                <tr>
                    <th className="border px-2 py-1">Title</th>
                    <th className="border px-2 py-1">Created At</th>
                    <th className="border px-2 py-1">Students</th>
                    <th className="border px-2 py-1">Action</th>
                </tr>
            </thead>
            <tbody>
                {tests.map((test) => (
                    <tr key={test.id}>
                        <td className="border px-2 py-1">{test.title}</td>
                        <td className="border px-2 py-1">{new Date(test.created_at).toLocaleDateString()}</td>
                        <td className="border px-2 py-1">{test.results_count}</td>
                        <td className="border px-2 py-1">
                            <Link
                                href={route("placement.show", test.id)}
                                className="text-blue-600 hover:underline"
                            >
                                View Details
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default CompletedTestsTable;
