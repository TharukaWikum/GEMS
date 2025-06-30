// import React from 'react';
// import Schedule from './PlacementTest/Schedule';
// import PlacementTestDetails from './PlacementTest/PlacementTestDetails';
// import { usePage } from '@inertiajs/react';
// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

// export default function StudentDashboard() {
//     const { auth, studentStatus, eligibleDates, placementTest } = usePage().props;
//      console.log("eligibleDates",eligibleDates)

//     return (
//         <AuthenticatedLayout
//                     user={auth.user}
//                     header={
//                         <div className="flex justify-between items-center">
//                             <h2 className="text-xl font-semibold leading-tight text-gray-800">
//                                 Welcome, {auth.user.name} !
//                             </h2>
//                         </div>
//                     }
//                 >
//                     <div className="p-6">

//             {studentStatus === 'registered' && (
//                 <Schedule eligibleDates={eligibleDates} />
               
//             )}

//             <PlacementTestDetails test={placementTest} />

//             {/* Add other conditional blocks for different statuses here */}
//         </div>
//                 </AuthenticatedLayout>
        
//     );
// }


import React from 'react';
import Schedule from './PlacementTest/Schedule';
import PlacementTestDetails from './PlacementTest/PlacementTestDetails';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AvailableCourses from './Courses/AvailableCourses';
import MyApplications from './Courses/MyApplications';
import PayInstallment from './Courses/PayInstallment';
import StudentPaymentHistory from './Pages/StudentPaymentHistory';
import MyRegisteredCourseMaterials from './Courses/MyRegisteredCourseMaterials';


export default function StudentDashboard() {
    const { auth, studentStatus, eligibleDates, placementTest, courses, applications, installments,payments,registeredCourses } = usePage().props;

    // Extract current scheduled date if test exists
    const currentScheduledDate = placementTest?.date || null;
    console.log(registeredCourses)

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
            {(studentStatus === 'registered' || studentStatus === 'placement_scheduled') && (
                <Schedule
                    eligibleDates={eligibleDates}
                    currentScheduledDate={currentScheduledDate}
                />
            )}

            {placementTest && <PlacementTestDetails test={placementTest} />}

            {studentStatus === 'placement_completed' && (
                <>
                    <AvailableCourses courses={courses || []} />
                    <MyApplications applications={applications || []} />
                </>
            )}
        </div>
        <div>
            {studentStatus === 'course_assigned' && installments && installments.due > 0 && (
    <PayInstallment application={installments} />

)}

<StudentPaymentHistory payments={payments} />

{registeredCourses?.length > 0 && (
  <div className="space-y-4">
    {registeredCourses.map((course) => (
      <div key={course.id} className="p-4 bg-white rounded shadow">
        <h3 className="text-lg font-bold">{course.name}</h3>
        <p>{course.description}</p>
        <p><strong>Fee:</strong> Rs. {course.course_fee}</p>
        <p><strong>Duration:</strong> {course.duration}</p>
        <p><strong>Type:</strong> {course.type}</p>
        <p><strong>Conductor:</strong> {course.conductor_name}</p>

        <h4 className="font-semibold mt-3">Materials:</h4>
        {Array.isArray(course.materials) && course.materials.length > 0 ? (
          <ul className="list-disc ml-5">
            {course.materials.map((mat) => (
              <li key={mat.id}>
                <a
                  href={`/storage/${mat.file_path}`}
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {mat.title} ({mat.type})
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No materials available.</p>
        )}
      </div>
    ))}
  </div>
)}



        </div>
    </AuthenticatedLayout>
);
}
