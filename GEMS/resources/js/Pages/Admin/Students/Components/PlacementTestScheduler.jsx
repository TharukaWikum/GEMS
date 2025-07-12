import React, { useState } from "react";
import { router } from "@inertiajs/react";

export default function PlacementTestScheduler({ student, eligibleDates }) {
    const [scheduledDate, setScheduledDate] = useState("");
    const [processing, setProcessing] = useState(false);

    const handleSchedule = (e) => {
        e.preventDefault();
        if (!scheduledDate) return;
        setProcessing(true);

        router.post(route("admin.students.schedule-placement", student.student_id), {
            scheduled_date: scheduledDate,
        }, {
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <div className="mt-6 border-t pt-4">
            <h2 className="text-lg font-bold mb-2">Schedule/Reschedule Placement Test</h2>
            <form onSubmit={handleSchedule} className="flex flex-col gap-4 max-w-md">
                <label>
                    <span className="text-sm font-medium text-gray-700">Available Dates</span>
                    <select
                        className="mt-1 block w-full border rounded p-2"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        required
                    >
                        <option value="">-- Select a date --</option>
                        {eligibleDates.map((date) => (
                            <option key={date} value={date}>{date}</option>
                        ))}
                    </select>
                </label>
                <button
                    type="submit"
                    className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
                    disabled={processing}
                >
                    {processing ? "Scheduling..." : "Schedule Test"}
                </button>
            </form>
        </div>
    );
}
