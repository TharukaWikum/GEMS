import React from "react";
import { useForm, Link } from "@inertiajs/react";

const ScheduledTestsTable = ({ tests }) => {
    const { post } = useForm();

    const handleMarkPending = (testId) => {
        if (confirm("Mark this test as pending?")) {
            post(route("placement.markPending", testId));
        }
    };

    return (
        <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">Scheduled Tests</h3>
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
                                    className="text-blue-600 hover:underline mr-2"
                                >
                                    View Details
                                </Link>

                                <button
                                    onClick={() => handleMarkPending(test.id)}
                                    className="text-yellow-600 hover:underline"
                                >
                                    Mark Pending
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ScheduledTestsTable;
