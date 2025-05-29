// import { useForm } from "@inertiajs/react";
// import PrimaryButton from "@/Components/PrimaryButton";
// import InputLabel from "@/Components/InputLabel";
// import TextInput from "@/Components/TextInput";
// import InputError from "@/Components/InputError";
// import SelectInput from "@/Components/SelectInput";
// import dayjs from "dayjs";

// export default function AddCourseEnrollmentForm({ studentId, courses, onSuccess }) {
//     const { data, setData, post, processing, errors, reset } = useForm({
//         student_id: studentId,
//         course_id: "",
//         status: "Active",
//         start_date: "",
//     });

//     const submit = (e) => {
//     e.preventDefault();
//     post(route("admin.students.assignCourse", studentId), {
//         onSuccess: () => {
//             reset();
//             onSuccess && onSuccess();
//         },
//     });
// };

//     return (
//         <form onSubmit={submit} className="space-y-4 mt-6">
//             <div>
//                 <InputLabel value="Course" />
//                 <SelectInput
//                     value={data.course_id}
//                     onChange={(e) => setData("course_id", e.target.value)}
//                     options={courses.map((c) => ({ value: c.id, label: c.name }))}
//                     className="w-full"
//                     required
//                 />
//                 <InputError message={errors.course_id} className="mt-1" />
//             </div>

//             <div>
//                 <InputLabel value="Start Date" />
//                 <TextInput
//                     type="date"
//                     value={data.start_date}
//                     onChange={(e) => setData("start_date", e.target.value)}
//                     className="w-full"
//                     required
//                 />
//                 <InputError message={errors.start_date} className="mt-1" />
//             </div>

//             <div>
//                 <InputLabel value="Enrollment Status" />
//                 <SelectInput
//                     value={data.status}
//                     onChange={(e) => setData("status", e.target.value)}
//                     options={[
//                         { value: "Active", label: "Active" },
//                         { value: "Completed", label: "Completed" },
//                         { value: "Dropped", label: "Dropped" },
//                     ]}
//                     className="w-full"
//                 />
//             </div>

//             <div className="flex justify-end">
//                 <PrimaryButton disabled={processing}>Add Enrollment</PrimaryButton>
//             </div>
//         </form>
//     );
// }


import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import dayjs from "dayjs";

export default function AddCourseEnrollmentForm({ studentId, courses, onSuccess, onClose }) {
    const today = dayjs().format("YYYY-MM-DD");

    const { data, setData, post, processing, errors, reset } = useForm({
        student_id: studentId,
        course_id: "",
        status: "Active",
        start_date: today,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.students.assignCourse", studentId), {
            onSuccess: () => {
                reset();
                onSuccess?.();
                onClose?.(); // Close modal on success
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-4 mt-6">
            <div>
                <InputLabel value="Course" />
                <SelectInput
                    value={data.course_id}
                    onChange={(e) => setData("course_id", e.target.value)}
                    options={courses.map((c) => ({ value: c.id, label: c.name }))}
                    className="w-full"
                    required
                />
                <InputError message={errors.course_id} className="mt-1" />
            </div>

            <div>
                <InputLabel value="Start Date" />
                <TextInput
                    type="date"
                    value={data.start_date}
                    onChange={(e) => setData("start_date", e.target.value)}
                    className="w-full"
                    required
                />
                <InputError message={errors.start_date} className="mt-1" />
            </div>

            <div>
                <InputLabel value="Enrollment Status" />
                <SelectInput
                    value={data.status}
                    onChange={(e) => setData("status", e.target.value)}
                    options={[
                        { value: "Active", label: "Active" },
                        { value: "Completed", label: "Completed" },
                        { value: "Dropped", label: "Dropped" },
                    ]}
                    className="w-full"
                />
            </div>

            <div className="flex justify-end">
                <PrimaryButton disabled={processing}>Add Enrollment</PrimaryButton>
            </div>
        </form>
    );
}
