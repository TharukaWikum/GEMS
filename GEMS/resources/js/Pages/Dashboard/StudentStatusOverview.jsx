import { Link } from "@inertiajs/react";

export default function StudentStatusOverview({ summary }) {
    return (
        <div className="bg-white p-4 rounded shadow mb-6">
            <h4 className="text-lg font-semibold mb-2">
                Student Status Overview
            </h4>
            <a
    href={route("reports.student.status.all.pdf")}
    target="_blank"
    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
>
    Download Full Student Status PDF
</a>
            {/* Reports */}
            <ul className="space-y-1">
                {Object.entries(summary.students_by_status).map(
                ([status, count], idx) => (
                    <li key={idx} className="flex justify-between">
                        <Link
                            href={route(
                                "reports.student.status.details",
                                status
                            )}
                            className="text-blue-600 hover:underline capitalize"
                        >
                            {status.replaceAll("_", " ")}
                        </Link>
                        <span className="font-medium">{count}</span>
                    </li>
                )
            )}
            </ul>
        </div>
    );
}
