import { useForm, Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";

export default function StaffForm({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        address: "",
        nic: "",
        contact_no: "",
        description: "",
        role: "", 
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.staff.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        // <AuthenticatedLayout
        //     user={auth.user}
        //     header={
        //         <h2 className="font-semibold text-xl text-gray-800 leading-tight">
        //             Add New Staff
        //         </h2>
        //     }
        // >
            <div>
            <Head title="Add Staff" />
            <div className="max-w-3xl mx-auto bg-white shadow p-6 rounded mt-10">
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <InputLabel value="Full Name" />
                            <TextInput
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                                className="w-full"
                            />
                            <InputError
                                message={errors.name}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <InputLabel value="Email" />
                            <TextInput
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                                className="w-full"
                            />
                            <InputError
                                message={errors.email}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <InputLabel value="Address" />
                            <TextInput
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                required
                                className="w-full"
                            />
                            <InputError
                                message={errors.address}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <InputLabel value="Role" />
                            <SelectInput
                                name="role"
                                value={data.role}
                                onChange={(e) =>
                                    setData("role", e.target.value)
                                }
                                options={[
                                    { value: "admin", label: "Admin" },
                                    { value: "teacher", label: "Teacher" },
                                    { value: "frontdesk", label: "Front Desk" },
                                ]}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError
                                message={errors.role}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel value="NIC" />
                            <TextInput
                                value={data.nic}
                                onChange={(e) => setData("nic", e.target.value)}
                                required
                                className="w-full"
                            />
                            <InputError message={errors.nic} className="mt-1" />
                        </div>
                        <div>
                            <InputLabel value="Contact No" />
                            <TextInput
                                value={data.contact_no}
                                onChange={(e) =>
                                    setData("contact_no", e.target.value)
                                }
                                required
                                className="w-full"
                            />
                            <InputError
                                message={errors.contact_no}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <InputLabel value="Description" />
                            <TextInput
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className="w-full"
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <PrimaryButton disabled={processing}>
                            Add Staff
                        </PrimaryButton>
                    </div>
                </form>
            </div>
            </div>
        // </AuthenticatedLayout> 
    );
}
