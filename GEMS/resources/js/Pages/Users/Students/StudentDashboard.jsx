import React from "react";
import Schedule from "./PlacementTest/Schedule";
import PlacementTestDetails from "./PlacementTest/PlacementTestDetails";
import { usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AvailableCourses from "./Courses/AvailableCourses";
import MyApplications from "./Courses/MyApplications";
import PayInstallment from "./Courses/PayInstallment";
import StudentPaymentHistory from "./Pages/StudentPaymentHistory";
import MyRegisteredCourseMaterials from "./Courses/MyRegisteredCourseMaterials";
import CourseExam from "./Courses/CourseExam";
import ResubmitRegistrationPaymentForm from "./Pages/ResubmitRegistrationPaymentForm";
import MyRegisteredCourses from "./Courses/MyRegisteredCourses";

export default function StudentDashboard() {
    const {
        auth,
        studentStatus,
        eligibleDates,
        placementTest,
        courses,
        applications,
        installments,
        payments,
        registeredCourses,
        examResults,
    } = usePage().props;

    console.log("examResults", examResults);

    // Extract current scheduled date if test exists
    const currentScheduledDate = placementTest?.date || null;
    console.log(registeredCourses);

    const hasRejectedReg = payments.some(
        (p) => p.type === "registration" && p.rejected
    );
    const hasAnyValidReg = payments.some(
        (p) => p.type === "registration" && !p.rejected
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Welcome, {auth.user.name} !
                    </h2>
                </div>
            }
        >
            <div className="p-6 space-y-6">
                {(studentStatus === "registered" ||
                    studentStatus === "placement_scheduled") && (
                    <Schedule
                        eligibleDates={eligibleDates}
                        currentScheduledDate={currentScheduledDate}
                    />
                )}

                {placementTest && <PlacementTestDetails test={placementTest} />}

                {studentStatus === "placement_completed" && (
                    <>
                        <AvailableCourses
                            courses={courses || []}
                            applications={applications || []}
                        />
                    </>
                )}
                {applications && applications.length > 0 && (
                    <MyApplications applications={applications} />
                )}
            </div>
            <div>
                {studentStatus === "course_assigned" &&
                    installments &&
                    installments.due > 0 && (
                        <PayInstallment application={installments} />
                    )}

                <StudentPaymentHistory payments={payments} />

                <div>
                    {payments.some(
                        (p) =>
                            p.type === "registration" &&
                            p.rejected &&
                            !p.verified
                    ) &&
                        !payments.some(
                            (p) =>
                                p.type === "registration" &&
                                !p.rejected &&
                                !p.verified
                        ) && <ResubmitRegistrationPaymentForm />}

                    {hasRejectedReg && !hasAnyValidReg && (
                        <ResubmitRegistrationPaymentForm />
                    )}
                </div>

                {registeredCourses?.length > 0 && (
                    <MyRegisteredCourses
                        registeredCourses={registeredCourses}
                    />
                )}

                <div>
                    <CourseExam examResults={examResults} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
