import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import PrimaryButton from "@/Components/PrimaryButton";

export default function CourseForm({ teachers, onSuccess }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        description: "",
        course_fee: "",
        duration: "",
        conductor_id: "",
        status: "Active",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("admin.courses.store"), {
            nSuccess: () => {
                reset();
                onSuccess && onSuccess(); // ✅ closes modal after submit
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-4 mt-6">
            <div>
                <InputLabel value="Course Name" />
                <TextInput
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    className="w-full"
                    required
                />
                <InputError message={errors.name} className="mt-1" />
            </div>

            <div>
                <InputLabel value="Description" />
                <TextInput
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    className="w-full"
                />
            </div>

            <div>
                <InputLabel value="Course Fee (LKR)" />
                <TextInput
                    type="number"
                    value={data.course_fee}
                    onChange={(e) => setData("course_fee", e.target.value)}
                    className="w-full"
                    required
                />
                <InputError message={errors.course_fee} className="mt-1" />
            </div>

            <div>
                {/* <InputLabel value="Duration" />
                <TextInput value={data.duration} onChange={(e) => setData("duration", e.target.value)} className="w-full" required />
                <InputError message={errors.duration} className="mt-1" /> */}
                <div>
                    <InputLabel value="Duration" />
                    <SelectInput
                        value={data.duration}
                        onChange={(e) => setData("duration", e.target.value)}
                        options={[
                            { value: "30", label: "1 Month" },
                            { value: "61", label: "2 Months" },
                            { value: "92", label: "3 Months" },
                        ]}
                        className="w-full"
                    />
                </div>
            </div>

            <div>
                <InputLabel value="Conductor (Teacher)" />
                <SelectInput
                    value={data.conductor_id}
                    onChange={(e) => setData("conductor_id", e.target.value)}
                    options={teachers.map((t) => ({
                        value: t.id,
                        label: t.name,
                    }))}
                    className="w-full"
                    required
                />
                <InputError message={errors.conductor_id} className="mt-1" />
            </div>

            <div>
                <InputLabel value="Status" />
                <SelectInput
                    value={data.status}
                    onChange={(e) => setData("status", e.target.value)}
                    options={[
                        { value: "Active", label: "Active" },
                        { value: "Inactive", label: "Inactive" },
                        { value: "Completed", label: "Completed" },
                        { value: "Cancelled", label: "Cancelled" },
                    ]}
                    className="w-full"
                />
            </div>

            <div className="flex justify-end">
                <PrimaryButton disabled={processing}>
                    Create Course
                </PrimaryButton>
            </div>
        </form>
    );
}
