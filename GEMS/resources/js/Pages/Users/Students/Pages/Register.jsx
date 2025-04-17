import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function StudentForm({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        dob: "",
        gender: "",
        nationality: "",
        nic: "",
        preferred_course: "",
        payment_method: "",
        payment_receipt: null,
    });

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (data[key] instanceof File) {
                formData.append(key, data[key]);
            } else {
                formData.append(key, data[key] ?? "");
            }
        });

        post(route("admin.students.store"), {
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Add New Student
            </h2>
        }>
            <Head title="Add Student" />

            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
                <form onSubmit={submit} encType="multipart/form-data">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <InputLabel htmlFor="name" value="Full Name" />
                            <TextInput
                                id="name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="dob" value="Date of Birth" />
                            <TextInput
                                id="dob"
                                type="date"
                                value={data.dob}
                                onChange={(e) => setData("dob", e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.dob} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel value="Gender" />
                            <SelectInput
                                name="gender"
                                value={data.gender}
                                onChange={(e) => setData("gender", e.target.value)}
                                options={[
                                    { value: "male", label: "Male" },
                                    { value: "female", label: "Female" },
                                ]}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.gender} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="nationality" value="Nationality" />
                            <TextInput
                                id="nationality"
                                value={data.nationality}
                                onChange={(e) => setData("nationality", e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.nationality} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="nic" value="NIC Number" />
                            <TextInput
                                id="nic"
                                value={data.nic}
                                onChange={(e) => setData("nic", e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.nic} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel value="Preferred Course" />
                            <SelectInput
                                name="preferred_course"
                                value={data.preferred_course}
                                onChange={(e) =>
                                    setData("preferred_course", e.target.value)
                                }
                                options={[
                                    {
                                        value: "IELTS Academic",
                                        label: "IELTS Academic",
                                    },
                                    {
                                        value: "IELTS General",
                                        label: "IELTS General",
                                    },
                                ]}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError
                                message={errors.preferred_course}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel value="Payment Method" />
                            <SelectInput
                                name="payment_method"
                                value={data.payment_method}
                                onChange={(e) =>
                                    setData("payment_method", e.target.value)
                                }
                                options={[
                                    { value: "Bank Payment", label: "Bank Payment" },
                                    { value: "Online Transfer", label: "Online Transfer" },
                                    { value: "Handover", label: "Handover" },
                                ]}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError
                                message={errors.payment_method}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="payment_receipt" value="Upload Payment Receipt" />
                        <input
                            type="file"
                            id="payment_receipt"
                            onChange={(e) => setData("payment_receipt", e.target.files[0])}
                            className="mt-1 block w-full"
                            required
                        />
                        <InputError
                            message={errors.payment_receipt}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-8 flex justify-end">
                        <PrimaryButton disabled={processing}>Register Student</PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
