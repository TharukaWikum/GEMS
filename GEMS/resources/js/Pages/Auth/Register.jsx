

// import InputError from "@/Components/InputError";
// import InputLabel from "@/Components/InputLabel";
// import PrimaryButton from "@/Components/PrimaryButton";
// import TextInput from "@/Components/TextInput";
// import SelectInput from "@/Components/SelectInput";
// import GuestLayout from "@/Layouts/GuestLayout";
// import { Head, Link, useForm } from "@inertiajs/react";
// import { useState } from "react";
// import validateRegister from "@/validations/registerValidation";

// export default function Register() {
//     const { data, setData, post, processing, errors, reset } = useForm({
//         name: "",
//         email: "",
//         password: "",
//         password_confirmation: "",
//         dob: "",
//         gender: "",
//         nationality: "",
//         // nic: "",
//         // identification_document: null,
//         preferred_course: "",
//         payment_method: "",
//         payment_receipt: null,
//         target_country: "",
//         target_score: "",
//     });

//      const [clientErrors, setClientErrors] = useState({});

//     const submit = (e) => {
//         e.preventDefault();

        

//         // Run client-side validation
//         const validationErrors = validateRegister(data);
//         setClientErrors(validationErrors);

//         if (Object.keys(validationErrors).length > 0) {
//             // Focus the first invalid field if desired
//             return;
//         }

//         const formData = new FormData();
//         // Append all fields to FormData
//         Object.keys(data).forEach((key) => {
//             if (data[key] instanceof File) {
//                 formData.append(key, data[key]); // Append files correctly
//             } else {
//                 formData.append(key, data[key] ?? "");
//             }
//         });

//         console.log("📤 Submitting Form Data:", Object.fromEntries(formData));

//         post(route("register"), {
//             data: formData,
//             headers: { "Content-Type": "multipart/form-data" },
//             onFinish: () => reset("password", "password_confirmation"),
//         });
//     };

//     return (
//         <GuestLayout>
//             <Head title="Student Registration" />

//             <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
//                 <h2 className="text-2xl font-semibold text-gray-700 dark:text-white text-center mb-6">
//                     Student Registration
//                 </h2>

//                 <form onSubmit={submit} encType="multipart/form-data">
//                     {/* Grid Layout */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {/* Full Name */}
//                         <div>
//                             <InputLabel htmlFor="name" value="Full Name" />
//                             <TextInput
//                                 className="mt-1 block w-full"
//                                 id="name"
//                                 name="name"
//                                 value={data.name}
//                                 onChange={(e) =>
//                                     setData("name", e.target.value)
//                                 }
//                                 required
//                             />
//                             <InputError
//                                  message={clientErrors.name || errors.name}
//                                 className="mt-2"
//                             />
//                         </div>

//                         {/* Email */}
//                         <div>
//                             <InputLabel htmlFor="email" value="Email" />
//                             <TextInput
//                                 className="mt-1 block w-full"
//                                 id="email"
//                                 type="email"
//                                 name="email"
//                                 value={data.email}
//                                 onChange={(e) =>
//                                     setData("email", e.target.value)
//                                 }
//                                 required
//                             />
//                             <InputError
//                                  message={clientErrors.email || errors.email}
//                                 className="mt-2"
//                             />
//                         </div>

//                         {/* Password */}
//                         <div>
//                             <InputLabel htmlFor="password" value="Password" />
//                             <TextInput
//                                 className="mt-1 block w-full"
//                                 id="password"
//                                 type="password"
//                                 name="password"
//                                 value={data.password}
//                                 onChange={(e) =>
//                                     setData("password", e.target.value)
//                                 }
//                                 required
//                             />
//                             <InputError
                               
//                                 message={clientErrors.password || errors.password}
                                
//                                 className="mt-2"
//                             />
//                         </div>

//                         {/* Confirm Password */}
//                         <div>
//                             <InputLabel
//                                 htmlFor="password_confirmation"
//                                 value="Confirm Password"
//                             />
//                             <TextInput
//                                 className="mt-1 block w-full"
//                                 id="password_confirmation"
//                                 type="password"
//                                 name="password_confirmation"
//                                 value={data.password_confirmation}
//                                 onChange={(e) =>
//                                     setData(
//                                         "password_confirmation",
//                                         e.target.value
//                                     )
//                                 }
//                                 required
//                             />
//                             <InputError
                                
//                                  message={clientErrors.password_confirmation || errors.password_confirmation}
//                                 className="mt-2"
//                             />
//                         </div>

//                         {/* Date of Birth */}
//                         <div>
//                             <InputLabel htmlFor="dob" value="Date of Birth" />
//                             <TextInput
//                                 className="mt-1 block w-full"
//                                 id="dob"
//                                 type="date"
//                                 name="dob"
//                                 value={data.dob}
//                                 onChange={(e) => setData("dob", e.target.value)}
//                                 required
//                             />
//                             <InputError  message={clientErrors.dob || errors.dob}className="mt-2" />
//                         </div>

//                         {/* Gender */}
//                         <div>
//                             <InputLabel value="Gender" />
//                             <SelectInput
//                                 className="mt-1 block w-full"
//                                 name="gender"
//                                 value={data.gender}
//                                 onChange={(e) =>
//                                     setData("gender", e.target.value)
//                                 }
//                                 options={[
//                                     { value: "male", label: "Male" },
//                                     { value: "female", label: "Female" },
//                                 ]}
//                                 required
//                             />
//                             <InputError
                                
//                                  message={clientErrors.gender || errors.gender}
//                                 className="mt-2"
//                             />
//                         </div>

//                         {/* Nationality */}
//                         <div>
//                             <InputLabel
//                                 htmlFor="nationality"
//                                 value="Nationality"
//                             />
//                             <TextInput
//                                 className="mt-1 block w-full"
//                                 id="nationality"
//                                 name="nationality"
//                                 value={data.nationality}
//                                 onChange={(e) =>
//                                     setData("nationality", e.target.value)
//                                 }
//                                 required
//                             />
//                             <InputError
//                                 message={clientErrors.nationality ||errors.nationality}
//                                 className="mt-2"
//                             />
//                         </div>

//                         {/* NIC */}
//                         {/* <div>
//                             <InputLabel htmlFor="nic" value="NIC Number" />
//                             <TextInput
//                                 className="mt-1 block w-full"
//                                 id="nic"
//                                 name="nic"
//                                 value={data.nic}
//                                 onChange={(e) => setData("nic", e.target.value)}
//                                 required
//                             />
//                             <InputError message={errors.nic} className="mt-2" />
//                         </div> */}

//                         {/* Preferred Course */}
//                         <div>
//                             <InputLabel value="Preferred Course" />
//                             <SelectInput
//                                 className="mt-1 block w-full"
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
//                                 required
//                             />
//                             <InputError
//                                 message={clientErrors.preferred_course ||errors.preferred_course}
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
                               
//                                 message={clientErrors.target_country || errors.target_country}
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
                                
//                                 message={clientErrors.target_score || errors.target_score}
//                                 className="mt-2"
//                             />
//                         </div>

//                         {/* Payment Method */}
//                         <div>
//                             <InputLabel value="Payment Method" />
//                             <SelectInput
//                                 className="mt-1 block w-full"
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
//                                 required
//                             />
//                             <InputError
//                                 message={clientErrors.payment_method || errors.payment_method}
//                                 className="mt-2"
//                             />
//                         </div>
//                     </div>
//                     {data.payment_method !== "Handover" && (
//                         <div className="mt-6">
//                             <InputLabel
//                                 htmlFor="payment_receipt"
//                                 value="Upload Payment Receipt"
//                             />
//                             <input
//                                 type="file"
//                                 id="payment_receipt"
//                                 onChange={(e) =>
//                                     setData(
//                                         "payment_receipt",
//                                         e.target.files[0]
//                                     )
//                                 }
//                                 required={[
//                                     "Bank Payment",
//                                     "Online Transfer",
//                                 ].includes(data.payment_method)}
//                                 className="mt-1 block w-full"
//                             />
//                             <InputError
//                                 message={clientErrors.payment_receipt || errors.payment_receipt}
//                                 className="mt-2"
//                             />
//                         </div>
//                     )}

//                     <div className="mt-8 flex justify-between">
//                         <Link
//                             href={route("login")}
//                             className="text-sm text-gray-600 hover:text-gray-900"
//                         >
//                             Already registered?
//                         </Link>
//                         <PrimaryButton disabled={processing}>
//                             Register
//                         </PrimaryButton>
//                     </div>
//                 </form>
//             </div>
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
import validateRegister from "@/validations/registerValidation";
import PaymentIcon from "@mui/icons-material/Payment";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
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

        const validationErrors = validateRegister(data);
        setClientErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (data[key] instanceof File) {
                formData.append(key, data[key]);
            } else {
                formData.append(key, data[key] ?? "");
            }
        });

        post(route("register"), {
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Student Registration" />

            

            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
                    Student Registration
                </h2>

                <form onSubmit={submit} encType="multipart/form-data">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div>
                            <InputLabel htmlFor="name" value={<span>Full Name <span className="text-red-500">*</span></span>} />
                            <TextInput
                                className="mt-1 block w-full"
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                required
                            />
                            <InputError message={clientErrors.name || errors.name} className="mt-2" />
                        </div>

                        {/* Email */}
                        <div>
                            <InputLabel htmlFor="email" value={<span>Email <span className="text-red-500">*</span></span>} />
                            <TextInput
                                className="mt-1 block w-full"
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                required
                            />
                            <InputError message={clientErrors.email || errors.email} className="mt-2" />
                        </div>

                        {/* Password */}
                        <div>
                            <InputLabel htmlFor="password" value={<span>Password <span className="text-red-500">*</span></span>} />
                            <TextInput
                                className="mt-1 block w-full"
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                required
                            />
                            <div className="text-xs text-gray-500 mt-1">
                                Password must be at least 8 characters and include a letter and number.
                            </div>
                            <InputError message={clientErrors.password || errors.password} className="mt-2" />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <InputLabel htmlFor="password_confirmation" value={<span>Confirm Password <span className="text-red-500">*</span></span>} />
                            <TextInput
                                className="mt-1 block w-full"
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData("password_confirmation", e.target.value)}
                                required
                            />
                            <InputError message={clientErrors.password_confirmation || errors.password_confirmation} className="mt-2" />
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <InputLabel htmlFor="dob" value={<span>Date of Birth <span className="text-red-500">*</span></span>} />
                            <TextInput
                                className="mt-1 block w-full"
                                id="dob"
                                type="date"
                                name="dob"
                                value={data.dob}
                                onChange={(e) => setData("dob", e.target.value)}
                                required
                            />
                            <InputError message={clientErrors.dob || errors.dob} className="mt-2" />
                        </div>

                        {/* Gender */}
                        <div>
                            <InputLabel value={<span>Gender <span className="text-red-500">*</span></span>} />
                            <SelectInput
                                className="mt-1 block w-full"
                                name="gender"
                                value={data.gender}
                                onChange={(e) => setData("gender", e.target.value)}
                                options={[
                                    { value: "male", label: "Male" },
                                    { value: "female", label: "Female" },
                                ]}
                                required
                            />
                            <InputError message={clientErrors.gender || errors.gender} className="mt-2" />
                        </div>

                        {/* Nationality */}
                        <div>
                            <InputLabel htmlFor="nationality" value={<span>Nationality <span className="text-red-500">*</span></span>} />
                            <TextInput
                                className="mt-1 block w-full"
                                id="nationality"
                                name="nationality"
                                value={data.nationality}
                                onChange={(e) => setData("nationality", e.target.value)}
                                required
                            />
                            <InputError message={clientErrors.nationality || errors.nationality} className="mt-2" />
                        </div>

                        {/* Preferred Course */}
                        <div>
                            <InputLabel value={<span>Preferred Course <span className="text-red-500">*</span></span>} />
                            <SelectInput
                                className="mt-1 block w-full"
                                name="preferred_course"
                                value={data.preferred_course}
                                onChange={(e) => setData("preferred_course", e.target.value)}
                                options={[
                                    { value: "IELTS Academic", label: "IELTS Academic" },
                                    { value: "IELTS General", label: "IELTS General" },
                                ]}
                                required
                            />
                            <InputError message={clientErrors.preferred_course || errors.preferred_course} className="mt-2" />
                        </div>

                        {/* Target Country */}
                        <div>
                            <InputLabel htmlFor="target_country" value={<span>Target Country <span className="text-red-500">*</span></span>} />
                            <TextInput
                                id="target_country"
                                value={data.target_country}
                                onChange={(e) => setData("target_country", e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={clientErrors.target_country || errors.target_country} className="mt-2" />
                        </div>

                        {/* Target Score */}
                        <div>
                            <InputLabel htmlFor="target_score" value={<span>Target Score (e.g., 6.5) <span className="text-red-500">*</span></span>} />
                            <TextInput
                                id="target_score"
                                type="number"
                                step="0.5"
                                value={data.target_score}
                                onChange={(e) => setData("target_score", e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={clientErrors.target_score || errors.target_score} className="mt-2" />
                        </div>
                        

                        {/* Payment Method */}
                        <div>
                            <InputLabel value={<span>Payment Method <span className="text-red-500">*</span></span>} />
                            <SelectInput
                                className="mt-1 block w-full"
                                name="payment_method"
                                value={data.payment_method}
                                onChange={(e) => setData("payment_method", e.target.value)}
                                options={[
                                    { value: "Bank Payment", label: "Bank Payment" },
                                    { value: "Online Transfer", label: "Online Transfer" },
                                    { value: "Handover", label: "Handover" },
                                ]}
                                required
                            />
                            <InputError message={clientErrors.payment_method || errors.payment_method} className="mt-2" />
                        </div>
                    </div>

                    {/* Payment Receipt (conditional) */}
                    {["Bank Payment", "Online Transfer"].includes(data.payment_method) && (
                        <div className="mt-6">
                            <InputLabel
                                htmlFor="payment_receipt"
                                value={<span>Upload Payment Receipt <span className="text-red-500">*</span></span>}
                            />
                            <input
                                type="file"
                                id="payment_receipt"
                                onChange={(e) => setData("payment_receipt", e.target.files[0])}
                                required
                                className="mt-1 block w-full"
                            />
                            <InputError message={clientErrors.payment_receipt || errors.payment_receipt} className="mt-2" />
                        </div>
                    )}

                    <div className="mt-8 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                        <Link
                            href={route("login")}
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            Already registered?
                        </Link>
                        <PrimaryButton disabled={processing}>
                            {processing ? "Registering..." : "Register"}
                        </PrimaryButton>
                    </div>
                </form>
                {/* Registration Fee and Payment Instructions */}
            <section className="max-w-4xl mx-auto mt-10 mb-8">
                <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-6 flex flex-col md:flex-row md:items-center gap-4 shadow">
                    <div className="flex items-center gap-2 text-blue-700 mb-2 md:mb-0">
                        <PaymentIcon fontSize="large" />
                        <span className="text-lg font-bold">Registration Fee:</span>
                        <span className="text-xl font-bold text-blue-900">LKR 2,000.00</span>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <InfoOutlinedIcon className="text-blue-500" />
                            <span className="font-semibold text-blue-700">Payment Instructions</span>
                        </div>
                        <ul className="ml-7 text-sm text-gray-700 list-disc">
                            <li>
                                Please make the payment to the following account <b>before uploading your payment receipt</b>:
                            </li>
                            <li>
                                <span className="font-semibold">Bank Name:</span> Bank of Ceylon – Bandarawela Branch
                            </li>
                            <li>
                                <span className="font-semibold">Account Number:</span> 85856678
                            </li>
                            <li>
                                <span className="font-semibold">Account Name:</span> Gifted Education (Pvt) Ltd
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            </div>
        </GuestLayout>
    );
}



