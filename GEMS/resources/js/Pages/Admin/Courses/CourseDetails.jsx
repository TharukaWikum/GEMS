export default function CourseDetails({ course }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><strong>Name:</strong> {course.name}</div>
            <div><strong>Description:</strong> {course.description}</div>
            <div><strong>Fee:</strong> LKR {course.course_fee}</div>
            <div><strong>Duration:</strong> {course.duration} Days</div>
            <div><strong>Status:</strong> {course.status}</div>
            <div><strong>Conductor:</strong> {course.conductor_name}</div>
        </div>
    );
}
