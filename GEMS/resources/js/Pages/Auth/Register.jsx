// import InputError from '@/Components/InputError';
// import InputLabel from '@/Components/InputLabel';
// import PrimaryButton from '@/Components/PrimaryButton';
// import TextInput from '@/Components/TextInput';
// import GuestLayout from '@/Layouts/GuestLayout';
// import { Head, Link, useForm } from '@inertiajs/react';

// export default function Register() {
//     const { data, setData, post, processing, errors, reset } = useForm({
//         name: '',
//         email: '',
//         password: '',
//         password_confirmation: '',
//     });

//     const submit = (e) => {
//         e.preventDefault();

//         post(route('register'), {
//             onFinish: () => reset('password', 'password_confirmation'),
//         });
//     };

//     return (
//         <GuestLayout>
//             <Head title="Register" />

//             <form onSubmit={submit}>
//                 <div>
//                     <InputLabel htmlFor="name" value="Name" />

//                     <TextInput
//                         id="name"
//                         name="name"
//                         value={data.name}
//                         className="mt-1 block w-full"
//                         autoComplete="name"
//                         isFocused={true}
//                         onChange={(e) => setData('name', e.target.value)}
//                         required
//                     />

//                     <InputError message={errors.name} className="mt-2" />
//                 </div>

//                 <div className="mt-4">
//                     <InputLabel htmlFor="email" value="Email" />

//                     <TextInput
//                         id="email"
//                         type="email"
//                         name="email"
//                         value={data.email}
//                         className="mt-1 block w-full"
//                         autoComplete="username"
//                         onChange={(e) => setData('email', e.target.value)}
//                         required
//                     />

//                     <InputError message={errors.email} className="mt-2" />
//                 </div>

//                 <div className="mt-4">
//                     <InputLabel htmlFor="password" value="Password" />

//                     <TextInput
//                         id="password"
//                         type="password"
//                         name="password"
//                         value={data.password}
//                         className="mt-1 block w-full"
//                         autoComplete="new-password"
//                         onChange={(e) => setData('password', e.target.value)}
//                         required
//                     />

//                     <InputError message={errors.password} className="mt-2" />
//                 </div>

//                 <div className="mt-4">
//                     <InputLabel
//                         htmlFor="password_confirmation"
//                         value="Confirm Password"
//                     />

//                     <TextInput
//                         id="password_confirmation"
//                         type="password"
//                         name="password_confirmation"
//                         value={data.password_confirmation}
//                         className="mt-1 block w-full"
//                         autoComplete="new-password"
//                         onChange={(e) =>
//                             setData('password_confirmation', e.target.value)
//                         }
//                         required
//                     />

//                     <InputError
//                         message={errors.password_confirmation}
//                         className="mt-2"
//                     />
//                 </div>

//                 <div className="mt-4 flex items-center justify-end">
//                     <Link
//                         href={route('login')}
//                         className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                     >
//                         Already registered?
//                     </Link>

//                     <PrimaryButton className="ms-4" disabled={processing}>
//                         Register
//                     </PrimaryButton>
//                 </div>
//             </form>
//         </GuestLayout>
//     );
// }

// import InputError from '@/Components/InputError';
// import InputLabel from '@/Components/InputLabel';
// import PrimaryButton from '@/Components/PrimaryButton';
// import TextInput from '@/Components/TextInput';
// import GuestLayout from '@/Layouts/GuestLayout';
// import { Head, Link, useForm } from '@inertiajs/react';

// export default function Register() {
//     const { data, setData, post, processing, errors, reset } = useForm({
//         name: '',
//         email: '',
//         password: '',
//         password_confirmation: '',
//         dob: '',
//         gender: '',
//         nationality: '',
//         nic: '',
//         identification_document: null,
//         preferred_course: '',
//         payment_method: '',
//         payment_receipt: null,
//     });

//     // const submit = (e) => {
//     //     e.preventDefault();

//     //     const formData = new FormData();
//     //     Object.keys(data).forEach((key) => {
//     //         formData.append(key, data[key]);
//     //     });

//     //     console.log("Submitting Form Data:", Object.fromEntries(formData)); // Debugging Output

//     //     post(route('register'), {
//     //         data: formData,
//     //         headers: { 'Content-Type': 'multipart/form-data' },
//     //         onFinish: () => reset('password', 'password_confirmation'),
//     //     });
//     // };
//     const submit = (e) => {
//         e.preventDefault();

//         const formData = new FormData();

//         // Mock data for testing
//         const mockData = {
//             nationality: "Sri Lankan",
//             nic: "123456789V",
//             preferred_course: "IELTS Academic",
//             payment_method: "Bank Payment",
//         };

//         Object.keys(data).forEach((key) => {
//             if (data[key] instanceof FileList && data[key].length > 0) {
//                 formData.append(key, data[key][0]); // Handle file uploads
//             } else {
//                 formData.append(key, data[key] ?? mockData[key] ?? "Test Value"); // Fill null values
//             }
//         });

//         console.log("📤 Submitting Form Data:", Object.fromEntries(formData)); // Debugging Output

//         post(route('register'), {
//             data: formData,
//             headers: { 'Content-Type': 'multipart/form-data' },
//             onFinish: () => reset('password', 'password_confirmation'),
//         });
//     };

//     return (
//         <GuestLayout>
//             <Head title="Student Registration" />

//             <form onSubmit={submit} encType="multipart/form-data">
//                 {/* Name */}
//                 <div>
//                     <InputLabel htmlFor="name" value="Full Name" />
//                     <TextInput id="name" name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
//                     <InputError message={errors.name} className="mt-2" />
//                 </div>

//                 {/* Email */}
//                 <div className="mt-4">
//                     <InputLabel htmlFor="email" value="Email" />
//                     <TextInput id="email" type="email" name="email" value={data.email} onChange={(e) => setData('email', e.target.value)} required />
//                     <InputError message={errors.email} className="mt-2" />
//                 </div>

//                 {/* Password */}
//                 <div className="mt-4">
//                     <InputLabel htmlFor="password" value="Password" />
//                     <TextInput id="password" type="password" name="password" value={data.password} onChange={(e) => setData('password', e.target.value)} required />
//                     <InputError message={errors.password} className="mt-2" />
//                 </div>

//                 {/* Confirm Password */}
//                 <div className="mt-4">
//                     <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
//                     <TextInput id="password_confirmation" type="password" name="password_confirmation" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} required />
//                     <InputError message={errors.password_confirmation} className="mt-2" />
//                 </div>

//                 {/* Date of Birth */}
//                 <div className="mt-4">
//                     <InputLabel htmlFor="dob" value="Date of Birth" />
//                     <TextInput id="dob" type="date" name="dob" value={data.dob} onChange={(e) => setData('dob', e.target.value)} required />
//                     <InputError message={errors.dob} className="mt-2" />
//                 </div>

//                 {/* Gender */}
//                 <div className="mt-4">
//                     <InputLabel value="Gender" />
//                     <select name="gender" value={data.gender} onChange={(e) => setData('gender', e.target.value)} required>
//                         <option value="">Select Gender</option>
//                         <option value="male">Male</option>
//                         <option value="female">Female</option>
//                     </select>
//                     <InputError message={errors.gender} className="mt-2" />
//                 </div>

//                 {/* Identification Document */}
//                 <div className="mt-4">
//                     <InputLabel htmlFor="identification_document" value="Upload NIC/Passport" />
//                     <input type="file" id="identification_document" name="identification_document" onChange={(e) => setData('identification_document', e.target.files[0])} required />
//                     <InputError message={errors.identification_document} className="mt-2" />
//                 </div>

//                 <div className="mt-4 flex items-center justify-end">
//                     <Link href={route('login')} className="text-sm text-gray-600 underline hover:text-gray-900">
//                         Already registered?
//                     </Link>
//                     <PrimaryButton className="ms-4" disabled={processing}>Register</PrimaryButton>
//                 </div>
//             </form>
//         </GuestLayout>
//     );
// }

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        dob: "",
        gender: "",
        nationality: "",
        // nic: "",
        // identification_document: null,
        preferred_course: "",
        payment_method: "",
        payment_receipt: null,
    });

    // const [identificationFile, setIdentificationFile] = useState(null);
    // const [paymentReceiptFile, setPaymentReceiptFile] = useState(null);

    const submit = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
    
        // Append all fields to FormData
        Object.keys(data).forEach((key) => {
            if (data[key] instanceof File) {
                formData.append(key, data[key]); // Append files correctly
            } else {
                formData.append(key, data[key] ?? "");
            }
        });
    
        console.log("📤 Submitting Form Data:", Object.fromEntries(formData));
    
        post(route("register"), {
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Student Registration" />

            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-white text-center mb-6">
                    Student Registration
                </h2>

                <form onSubmit={submit} encType="multipart/form-data">
                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div>
                            <InputLabel htmlFor="name" value="Full Name" />
                            <TextInput
                                className="mt-1 block w-full"
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                className="mt-1 block w-full"
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                className="mt-1 block w-full"
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                            />
                            <TextInput
                                className="mt-1 block w-full"
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                required
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <InputLabel htmlFor="dob" value="Date of Birth" />
                            <TextInput
                                className="mt-1 block w-full"
                                id="dob"
                                type="date"
                                name="dob"
                                value={data.dob}
                                onChange={(e) => setData("dob", e.target.value)}
                                required
                            />
                            <InputError message={errors.dob} className="mt-2" />
                        </div>

                        {/* Gender */}
                        <div>
                            <InputLabel value="Gender" />
                            <SelectInput
                                className="mt-1 block w-full"
                                name="gender"
                                value={data.gender}
                                onChange={(e) =>
                                    setData("gender", e.target.value)
                                }
                                options={[
                                    { value: "male", label: "Male" },
                                    { value: "female", label: "Female" },
                                ]}
                                required
                            />
                            <InputError
                                message={errors.gender}
                                className="mt-2"
                            />
                        </div>

                        {/* Nationality */}
                        <div>
                            <InputLabel
                                htmlFor="nationality"
                                value="Nationality"
                            />
                            <TextInput
                                className="mt-1 block w-full"
                                id="nationality"
                                name="nationality"
                                value={data.nationality}
                                onChange={(e) =>
                                    setData("nationality", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.nationality}
                                className="mt-2"
                            />
                        </div>

                        {/* NIC */}
                        {/* <div>
                            <InputLabel htmlFor="nic" value="NIC Number" />
                            <TextInput
                                className="mt-1 block w-full"
                                id="nic"
                                name="nic"
                                value={data.nic}
                                onChange={(e) => setData("nic", e.target.value)}
                                required
                            />
                            <InputError message={errors.nic} className="mt-2" />
                        </div> */}

                        {/* Preferred Course */}
                        <div>
                            <InputLabel value="Preferred Course" />
                            <SelectInput
                                className="mt-1 block w-full"
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
                                required
                            />
                            <InputError
                                message={errors.preferred_course}
                                className="mt-2"
                            />
                        </div>

                        {/* Payment Method */}
                        <div>
                            <InputLabel value="Payment Method" />
                            <SelectInput
                                className="mt-1 block w-full"
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
                                required
                            />
                            <InputError
                                message={errors.payment_method}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    {/* Full-Width File Uploads */}
                    {/* <div className="mt-6">
                        <InputLabel
                            htmlFor="identification_document"
                            value="Upload NIC/Passport"
                        />
                        <input
                            type="file"
                            id="identification_document"
                            onChange={(e) =>
                                setData(
                                    "identification_document",
                                    e.target.files[0]
                                )
                            }
                            required
                        />
                        <InputError
                            message={errors.identification_document}
                            className="mt-2"
                        />
                    </div> */}

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="payment_receipt"
                            value="Upload Payment Receipt"
                        />
                        <input
                            type="file"
                            id="payment_receipt"
                            onChange={(e) =>
                                setData("payment_receipt", e.target.files[0])
                            }
                            required
                        />
                        <InputError
                            message={errors.payment_receipt}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-8 flex justify-between">
                        <Link
                            href={route("login")}
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            Already registered?
                        </Link>
                        <PrimaryButton disabled={processing}>
                            Register
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
