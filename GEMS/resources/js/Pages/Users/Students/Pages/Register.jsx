// import InputError from "@/Components/InputError";
// import InputLabel from "@/Components/InputLabel";
// import PrimaryButton from "@/Components/PrimaryButton";
// import TextInput from "@/Components/TextInput";
// import SelectInput from "@/Components/SelectInput";
// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Head, useForm } from "@inertiajs/react";

// export default function StudentForm({ auth, onSuccess }) {
//     const { data, setData, post, processing, errors, reset } = useForm({
//         name: "",
//         email: "",
//         dob: "",
//         gender: "",
//         nationality: "",
//         // nic: "",
//         preferred_course: "",
//         payment_method: "",
//         payment_receipt: null,
//         target_country: "",
//         target_score: "",
//     });

//     const submit = (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         Object.keys(data).forEach((key) => {
//             if (data[key] instanceof File) {
//                 formData.append(key, data[key]);
//             } else {
//                 formData.append(key, data[key] ?? "");
//             }
//         });

//         post(route("admin.students.store"), {
//             data: formData,
//             headers: { "Content-Type": "multipart/form-data" },
//             onSuccess: () => {
//                 reset();
//                 onSuccess && onSuccess(); // ✅ call modal close if provided
//             },
//         });
//     };

//     return (
//         // <AuthenticatedLayout
//         //     user={auth.user}
//         //     header={
//         //         <h2 className="font-semibold text-xl text-gray-800 leading-tight">
//         //             Add New Student
//         //         </h2>
//         //     }
//         // >
//         <div>
//             <Head title="Add Student" />

//             <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
//                 <form onSubmit={submit} encType="multipart/form-data">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                             <InputLabel htmlFor="name" value="Full Name" />
//                             <TextInput
//                                 id="name"
//                                 value={data.name}
//                                 onChange={(e) =>
//                                     setData("name", e.target.value)
//                                 }
//                                 className="mt-1 block w-full"
//                                 required
//                             />
//                             <InputError
//                                 message={errors.name}
//                                 className="mt-2"
//                             />
//                         </div>

//                         <div>
//                             <InputLabel htmlFor="email" value="Email" />
//                             <TextInput
//                                 id="email"
//                                 type="email"
//                                 value={data.email}
//                                 onChange={(e) =>
//                                     setData("email", e.target.value)
//                                 }
//                                 className="mt-1 block w-full"
//                                 required
//                             />
//                             <InputError
//                                 message={errors.email}
//                                 className="mt-2"
//                             />
//                         </div>

//                         <div>
//                             <InputLabel htmlFor="dob" value="Date of Birth" />
//                             <TextInput
//                                 id="dob"
//                                 type="date"
//                                 value={data.dob}
//                                 onChange={(e) => setData("dob", e.target.value)}
//                                 className="mt-1 block w-full"
//                                 required
//                             />
//                             <InputError message={errors.dob} className="mt-2" />
//                         </div>

//                         <div>
//                             <InputLabel value="Gender" />
//                             <SelectInput
//                                 name="gender"
//                                 value={data.gender}
//                                 onChange={(e) =>
//                                     setData("gender", e.target.value)
//                                 }
//                                 options={[
//                                     { value: "male", label: "Male" },
//                                     { value: "female", label: "Female" },
//                                 ]}
//                                 className="mt-1 block w-full"
//                                 required
//                             />
//                             <InputError
//                                 message={errors.gender}
//                                 className="mt-2"
//                             />
//                         </div>

//                         <div>
//                             <InputLabel
//                                 htmlFor="nationality"
//                                 value="Nationality"
//                             />
//                             <TextInput
//                                 id="nationality"
//                                 value={data.nationality}
//                                 onChange={(e) =>
//                                     setData("nationality", e.target.value)
//                                 }
//                                 className="mt-1 block w-full"
//                                 required
//                             />
//                             <InputError
//                                 message={errors.nationality}
//                                 className="mt-2"
//                             />
//                         </div>

//                         {/* <div>
//                             <InputLabel htmlFor="nic" value="NIC Number" />
//                             <TextInput
//                                 id="nic"
//                                 value={data.nic}
//                                 onChange={(e) => setData("nic", e.target.value)}
//                                 className="mt-1 block w-full"
//                                 required
//                             />
//                             <InputError message={errors.nic} className="mt-2" />
//                         </div> */}

//                         <div>
//                             <InputLabel value="Preferred Course" />
//                             <SelectInput
//                                 name="preferred_course"
//                                 value={data.preferred_course}
//                                 onChange={(e) =>
//                                     setData("preferred_course", e.target.value)
//                                 }
//                                 options={[
//                                     {
//                                         value: "IELTS Academic",
//                                         label: "IELTS Academic",
//                                     },
//                                     {
//                                         value: "IELTS General",
//                                         label: "IELTS General",
//                                     },
//                                 ]}
//                                 className="mt-1 block w-full"
//                                 required
//                             />
//                             <InputError
//                                 message={errors.preferred_course}
//                                 className="mt-2"
//                             />
//                         </div>
//                         <div>
//                             <InputLabel
//                                 htmlFor="target_country"
//                                 value="Target Country"
//                             />
//                             <TextInput
//                                 id="target_country"
//                                 value={data.target_country}
//                                 onChange={(e) =>
//                                     setData("target_country", e.target.value)
//                                 }
//                                 className="mt-1 block w-full"
//                                 required
//                             />
//                             <InputError
//                                 message={errors.target_country}
//                                 className="mt-2"
//                             />
//                         </div>

//                         <div>
//                             <InputLabel
//                                 htmlFor="target_score"
//                                 value="Target Score (e.g., 6.5)"
//                             />
//                             <TextInput
//                                 id="target_score"
//                                 type="number"
//                                 step="0.5"
//                                 value={data.target_score}
//                                 onChange={(e) =>
//                                     setData("target_score", e.target.value)
//                                 }
//                                 className="mt-1 block w-full"
//                                 required
//                             />
//                             <InputError
//                                 message={errors.target_score}
//                                 className="mt-2"
//                             />
//                         </div>

//                         <div>
//                             <InputLabel value="Payment Method" />
//                             <SelectInput
//                                 name="payment_method"
//                                 value={data.payment_method}
//                                 onChange={(e) =>
//                                     setData("payment_method", e.target.value)
//                                 }
//                                 options={[
//                                     {
//                                         value: "Bank Payment",
//                                         label: "Bank Payment",
//                                     },
//                                     {
//                                         value: "Online Transfer",
//                                         label: "Online Transfer",
//                                     },
//                                     { value: "Handover", label: "Handover" },
//                                 ]}
//                                 className="mt-1 block w-full"
//                                 required
//                             />
//                             <InputError
//                                 message={errors.payment_method}
//                                 className="mt-2"
//                             />
//                         </div>
//                     </div>

//                     <div className="mt-6">
//                         <InputLabel
//                             htmlFor="payment_receipt"
//                             value="Upload Payment Receipt"
//                         />
//                         <input
//                             type="file"
//                             id="payment_receipt"
//                             onChange={(e) =>
//                                 setData("payment_receipt", e.target.files[0])
//                             }
//                             className="mt-1 block w-full"
//                             required
//                         />
//                         <InputError
//                             message={errors.payment_receipt}
//                             className="mt-2"
//                         />
//                     </div>

//                     <div className="mt-8 flex justify-end">
//                         <PrimaryButton disabled={processing}>
//                             Register Student
//                         </PrimaryButton>
//                     </div>
//                 </form>
//             </div>
//         </div>
//         // </AuthenticatedLayout>
//     );
// }

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

// Validation function for student registration
function validateStudent(data) {
    const errors = {};
    // Full Name
    if (!data.name?.trim()) errors.name = "Full Name is required.";
    // Email
    if (!data.email?.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        errors.email = "Email must be a valid email address.";
    // Date of Birth (must be at least 15 years old)
    if (!data.dob) errors.dob = "Date of Birth is required.";
    else {
        const today = new Date();
        const dob = new Date(data.dob);
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
        if (age < 15) errors.dob = "You must be at least 15 years old.";
    }
    // Gender
    if (!data.gender) errors.gender = "Gender is required.";
    // Nationality
    if (!data.nationality?.trim())
        errors.nationality = "Nationality is required.";
    // Preferred Course
    if (!data.preferred_course)
        errors.preferred_course = "Preferred Course is required.";
    // Target Country
    if (!data.target_country?.trim())
        errors.target_country = "Target Country is required.";
    // Target Score
    if (!data.target_score?.toString().trim())
        errors.target_score = "Target Score is required.";
    // Payment Method
    if (!data.payment_method)
        errors.payment_method = "Payment Method is required.";
    // Payment Receipt
    if (
        (data.payment_method === "Bank Payment" ||
            data.payment_method === "Online Transfer") &&
        !data.payment_receipt
    ) {
        errors.payment_receipt = "Payment Receipt is required.";
    }
    return errors;
}

export default function StudentForm({ auth, onSuccess }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        dob: "",
        gender: "",
        nationality: "",
        preferred_course: "",
        payment_method: "",
        payment_receipt: null,
        target_country: "",
        target_score: "",
    });
    const [clientErrors, setClientErrors] = useState({});

    const submit = (e) => {
        e.preventDefault();

        // Client-side validation
        const validationErrors = validateStudent(data);
        setClientErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

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
            onSuccess: () => {
                reset();
                setClientErrors({});
                onSuccess && onSuccess();
            },
        });
    };

    return (
        <div>
            <Head title="Add Student" />
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
                <form onSubmit={submit} encType="multipart/form-data">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <InputLabel
                                htmlFor="name"
                                value={
                                    <span>
                                        Full Name{" "}
                                        <span className="text-red-500">*</span>
                                    </span>
                                }
                            />
                            <TextInput
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError
                                message={clientErrors.name || errors.name}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="email"
                                value={
                                    <span>
                                        Email{" "}
                                        <span className="text-red-500">*</span>
                                    </span>
                                }
                            />
                            <TextInput
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError
                                message={clientErrors.email || errors.email}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="dob"
                                value={
                                    <span>
                                        Date of Birth{" "}
                                        <span className="text-red-500">*</span>
                                    </span>
                                }
                            />
                            <TextInput
                                id="dob"
                                type="date"
                                value={data.dob}
                                onChange={(e) => setData("dob", e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError
                                message={clientErrors.dob || errors.dob}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel
                                value={
                                    <span>
                                        Gender{" "}
                                        <span className="text-red-500">*</span>
                                    </span>
                                }
                            />
                            <SelectInput
                                name="gender"
                                value={data.gender}
                                onChange={(e) =>
                                    setData("gender", e.target.value)
                                }
                                options={[
                                    { value: "male", label: "Male" },
                                    { value: "female", label: "Female" },
                                ]}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError
                                message={clientErrors.gender || errors.gender}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="nationality"
                                value={
                                    <span>
                                        Nationality{" "}
                                        <span className="text-red-500">*</span>
                                    </span>
                                }
                            />
                            <TextInput
                                id="nationality"
                                value={data.nationality}
                                onChange={(e) =>
                                    setData("nationality", e.target.value)
                                }
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError
                                message={
                                    clientErrors.nationality ||
                                    errors.nationality
                                }
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel
                                value={
                                    <span>
                                        Preferred Course{" "}
                                        <span className="text-red-500">*</span>
                                    </span>
                                }
                            />
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
                                message={
                                    clientErrors.preferred_course ||
                                    errors.preferred_course
                                }
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="target_country"
                                value={
                                    <span>
                                        Target Country{" "}
                                        <span className="text-red-500">*</span>
                                    </span>
                                }
                            />
                            <TextInput
                                id="target_country"
                                value={data.target_country}
                                onChange={(e) =>
                                    setData("target_country", e.target.value)
                                }
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError
                                message={
                                    clientErrors.target_country ||
                                    errors.target_country
                                }
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="target_score"
                                value={
                                    <span>
                                        Target Score (e.g., 6.5){" "}
                                        <span className="text-red-500">*</span>
                                    </span>
                                }
                            />
                            <TextInput
                                id="target_score"
                                type="number"
                                step="0.5"
                                value={data.target_score}
                                onChange={(e) =>
                                    setData("target_score", e.target.value)
                                }
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError
                                message={
                                    clientErrors.target_score ||
                                    errors.target_score
                                }
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel
                                value={
                                    <span>
                                        Payment Method{" "}
                                        <span className="text-red-500">*</span>
                                    </span>
                                }
                            />
                            <SelectInput
                                name="payment_method"
                                value={data.payment_method}
                                onChange={(e) =>
                                    setData("payment_method", e.target.value)
                                }
                                options={[
                                    {
                                        value: "Bank Payment",
                                        label: "Bank Payment",
                                    },
                                    {
                                        value: "Online Transfer",
                                        label: "Online Transfer",
                                    },
                                    { value: "Handover", label: "Handover" },
                                ]}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError
                                message={
                                    clientErrors.payment_method ||
                                    errors.payment_method
                                }
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        {(data.payment_method === "Bank Payment" ||
                            data.payment_method === "Online Transfer") && (
                            <div className="mt-6">
                                <InputLabel
                                    htmlFor="payment_receipt"
                                    value={
                                        <span>
                                            Upload Payment Receipt{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </span>
                                    }
                                />
                                <input
                                    type="file"
                                    id="payment_receipt"
                                    onChange={(e) =>
                                        setData(
                                            "payment_receipt",
                                            e.target.files[0]
                                        )
                                    }
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError
                                    message={
                                        clientErrors.payment_receipt ||
                                        errors.payment_receipt
                                    }
                                    className="mt-2"
                                />
                            </div>
                        )}
                    </div>

                    <div className="mt-8 flex justify-end">
                        <PrimaryButton disabled={processing}>
                            Register Student
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
