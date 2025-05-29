export default function StaffList({ staffList = [] }) {
    return (
        <div className="bg-white overflow-hidden shadow-sm rounded-lg p-6">
            <div className="text-2xl font-semibold m-2 mb-3">Staff List</div>
            <table className="min-w-full text-sm text-left border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Role</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Contact No</th>
                        <th className="border px-4 py-2">Address</th>
                        <th className="border px-4 py-2">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {staffList.length > 0 ? (
                        staffList.map((staff, index) => (
                            <tr key={index} className="text-center">
                                <td className="border px-4 py-2">{staff.name}</td>
                                <td className="border px-4 py-2">{staff.email}</td>
                                <td className="border px-4 py-2 capitalize">{staff.role}</td>
                                <td className="border px-4 py-2">{staff.status}</td>
                                <td className="border px-4 py-2">{staff.contact_no}</td>
                                <td className="border px-4 py-2">{staff.address}</td>
                                <td className="border px-4 py-2">{staff.description}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center py-4">
                                No staff found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
