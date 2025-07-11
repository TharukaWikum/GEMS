import React from "react";

export default function ExamDetails({ exam }) {
    return (
        <div className="bg-white p-6 rounded shadow space-y-4">
            <h3 className="text-xl font-bold">{exam.title}</h3>
            <p>{exam.description}</p>
            <p>
                <strong>Date:</strong> {exam.exam_date}
            </p>
            <p>
                <strong>Time:</strong> {exam.start_time} ({exam.duration_minutes} minutes)
            </p>
            <p>
                <strong>Status:</strong> {exam.status}
            </p>
            <p>
                <strong>Scheduled By:</strong> {exam.scheduled_by}
            </p>
        </div>
    );
}
