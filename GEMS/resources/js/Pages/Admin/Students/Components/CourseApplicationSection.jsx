import React from "react";
import StaffCourseApplicationForm from "../StaffCourseApplicationForm";

export default function CourseApplicationSection({ student, courses, applications }) {
    const hasAppliedOrRegistered = applications.some((app) =>
        ["pending", "registered"].includes(app.status)
    );

    if (!hasAppliedOrRegistered && student.student_status === "placement_completed") {
        return (
            <StaffCourseApplicationForm
                studentId={student.student_id}
                courses={courses}
                onClose={() => {}}
            />
        );
    }
    return null;
}
