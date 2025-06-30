export default function SummaryCards({ summary }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded shadow">
                <h4 className="text-gray-500 text-sm">Active Students</h4>
                <p className="text-2xl font-bold">{summary.active_students}</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
                <h4 className="text-gray-500 text-sm">Active Staff</h4>
                <p className="text-2xl font-bold">{summary.active_staff}</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
                <h4 className="text-gray-500 text-sm">Blocked Students</h4>
                <p className="text-2xl font-bold">{summary.blocked_students}</p>
            </div>
        </div>
    );
}
