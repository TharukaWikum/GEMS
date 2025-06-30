// import React, { useState } from 'react';
// import { router } from '@inertiajs/react';

// export default function Schedule({ eligibleDates = [] }) {
//     const [selectedDate, setSelectedDate] = useState('');
//     const [submitting, setSubmitting] = useState(false);

//     const handleSubmit = () => {
//         if (!selectedDate) return;
//         setSubmitting(true);
//         router.post(route('student.placement.schedule.submit'), {
//             scheduled_date: selectedDate,
//         }, {
//             onFinish: () => setSubmitting(false),
//         });
//     };

//     return (
//         <div className="bg-white p-6 shadow rounded-md">
//             <h2 className="text-lg font-semibold mb-4">Schedule Your Placement Test</h2>
//             {eligibleDates.length === 0 ? (
//                 <p className="text-gray-600">No available dates to schedule. Please check back later.</p>
//             ) : (
//                 <div className="flex items-center space-x-4">
//                     <select
//                         className="border px-3 py-2 rounded"
//                         value={selectedDate}
//                         onChange={(e) => setSelectedDate(e.target.value)}
//                     >
//                         <option value="">Select a date</option>
//                         {eligibleDates.map(date => (
//                             <option key={date} value={date}>{date}</option>
//                         ))}
//                     </select>

//                     <button
//                         onClick={handleSubmit}
//                         disabled={!selectedDate || submitting}
//                         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                     >
//                         {submitting ? 'Scheduling...' : 'Schedule'}
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }

import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function Schedule({ eligibleDates = [], currentScheduledDate}) {
    const [selectedDate, setSelectedDate] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [showRescheduleForm, setShowRescheduleForm] = useState(false);

    const handleSubmit = () => {
        if (!selectedDate) return;
        setSubmitting(true);
        router.post(route('student.placement.schedule.submit'), {
            scheduled_date: selectedDate,
        }, {
            onFinish: () => {
                setSubmitting(false);
                setShowRescheduleForm(false);
                setSelectedDate('');
            },
        });
    };

    const renderForm = () => (
        <div className="flex items-center space-x-4 mt-4">
            <select
                className="border px-3 py-2 rounded"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
            >
                <option value="">Select a date</option>
                {eligibleDates.map(date => (
                    <option key={date} value={date}>{date}</option>
                ))}
            </select>

            <button
                onClick={handleSubmit}
                disabled={!selectedDate || submitting}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                {submitting
                    ? (currentScheduledDate ? 'Rescheduling...' : 'Scheduling...')
                    : (currentScheduledDate ? 'Reschedule' : 'Schedule')}
            </button>
        </div>
    );

    return (
        <div className="bg-white p-6 shadow rounded-md">
            <h2 className="text-lg font-semibold mb-4">
                {currentScheduledDate ? 'Reschedule Your Placement Test' : 'Schedule Your Placement Test'}
            </h2>

            {currentScheduledDate ? (
                <>
                    <p className="text-sm text-gray-600">
                        Currently scheduled for: <span className="font-medium">{currentScheduledDate}</span>
                    </p>

                    {!showRescheduleForm && (
                        <button
                            onClick={() => setShowRescheduleForm(true)}
                            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                        >
                            Reschedule
                        </button>
                    )}

                    {showRescheduleForm && renderForm()}
                </>
            ) : (
                eligibleDates.length > 0
                    ? renderForm()
                    : <p className="text-gray-600">No available dates to schedule. Please check back later.</p>
            )}
        </div>
    );
}
