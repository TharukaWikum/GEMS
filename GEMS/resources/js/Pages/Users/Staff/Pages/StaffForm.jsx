// import { useForm, Head, Link } from "@inertiajs/react";
// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import TextInput from "@/Components/TextInput";
// import InputLabel from "@/Components/InputLabel";
// import InputError from "@/Components/InputError";
// import PrimaryButton from "@/Components/PrimaryButton";
// import SelectInput from "@/Components/SelectInput";

// export default function StaffForm({ auth }) {
//     const { data, setData, post, processing, errors, reset } = useForm({
//         name: "",
//         email: "",
//         address: "",
//         nic: "",
//         contact_no: "",
//         description: "",
//         role: "", 
//     });

//     const submit = (e) => {
//         e.preventDefault();
//         post(route("admin.staff.store"), {
//             onSuccess: () => reset(),
//         });
//     };

//     return (
//         // <AuthenticatedLayout
//         //     user={auth.user}
//         //     header={
//         //         <h2 className="font-semibold text-xl text-gray-800 leading-tight">
//         //             Add New Staff
//         //         </h2>
//         //     }
//         // >
//             <div>
//             <Head title="Add Staff" />
//             <div className="max-w-3xl mx-auto bg-white shadow p-6 rounded mt-10">
//                 <form onSubmit={submit}>
//                     <div className="grid grid-cols-1 gap-4">
//                         <div>
//                             <InputLabel value="Full Name" />
//                             <TextInput
//                                 value={data.name}
//                                 onChange={(e) =>
//                                     setData("name", e.target.value)
//                                 }
//                                 required
//                                 className="w-full"
//                             />
//                             <InputError
//                                 message={errors.name}
//                                 className="mt-1"
//                             />
//                         </div>
//                         <div>
//                             <InputLabel value="Email" />
//                             <TextInput
//                                 type="email"
//                                 value={data.email}
//                                 onChange={(e) =>
//                                     setData("email", e.target.value)
//                                 }
//                                 required
//                                 className="w-full"
//                             />
//                             <InputError
//                                 message={errors.email}
//                                 className="mt-1"
//                             />
//                         </div>
//                         <div>
//                             <InputLabel value="Address" />
//                             <TextInput
//                                 value={data.address}
//                                 onChange={(e) =>
//                                     setData("address", e.target.value)
//                                 }
//                                 required
//                                 className="w-full"
//                             />
//                             <InputError
//                                 message={errors.address}
//                                 className="mt-1"
//                             />
//                         </div>
//                         <div>
//                             <InputLabel value="Role" />
//                             <SelectInput
//                                 name="role"
//                                 value={data.role}
//                                 onChange={(e) =>
//                                     setData("role", e.target.value)
//                                 }
//                                 options={[
//                                     { value: "admin", label: "Admin" },
//                                     { value: "teacher", label: "Teacher" },
//                                     { value: "frontdesk", label: "Front Desk" },
//                                 ]}
//                                 className="mt-1 block w-full"
//                                 required
//                             />
//                             <InputError
//                                 message={errors.role}
//                                 className="mt-2"
//                             />
//                         </div>

//                         <div>
//                             <InputLabel value="NIC" />
//                             <TextInput
//                                 value={data.nic}
//                                 onChange={(e) => setData("nic", e.target.value)}
//                                 required
//                                 className="w-full"
//                             />
//                             <InputError message={errors.nic} className="mt-1" />
//                         </div>
//                         <div>
//                             <InputLabel value="Contact No" />
//                             <TextInput
//                                 value={data.contact_no}
//                                 onChange={(e) =>
//                                     setData("contact_no", e.target.value)
//                                 }
//                                 required
//                                 className="w-full"
//                             />
//                             <InputError
//                                 message={errors.contact_no}
//                                 className="mt-1"
//                             />
//                         </div>
//                         <div>
//                             <InputLabel value="Description" />
//                             <TextInput
//                                 value={data.description}
//                                 onChange={(e) =>
//                                     setData("description", e.target.value)
//                                 }
//                                 className="w-full"
//                             />
//                         </div>
//                     </div>
//                     <div className="mt-6 flex justify-end">
//                         <PrimaryButton disabled={processing}>
//                             Add Staff
//                         </PrimaryButton>
//                     </div>
//                 </form>
//             </div>
//             </div>
//         // </AuthenticatedLayout> 
//     );
// }



import { useForm, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import { useState } from "react";

// NIC validation helper
function validateNIC(nic) {
  if (!nic) return "NIC is required.";
  // Old format: 9 digits + V/v (e.g., 998877679V)
  const oldNicMatch = nic.match(/^(\d{9})([Vv])$/);
  // New format: 12 digits (e.g., 200220900860)
  const newNicMatch = nic.match(/^(\d{12})$/);

  let birthYear;
  if (oldNicMatch) {
    birthYear = parseInt("19" + oldNicMatch[1].slice(0, 2), 10);
  } else if (newNicMatch) {
    birthYear = parseInt(newNicMatch[1].slice(0, 4), 10);
  } else {
    return "NIC format is invalid. Use 9 digits + V or 12 digits.";
  }
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  if (age < 18)
    return "Staff must be at least 18 years old (NIC birth year too recent).";
  if (age > 60)
    return "Staff must be under 61 years old (NIC birth year too old).";
  return "";
}

// Main validation function
function validateStaffForm(data) {
  const errors = {};
  if (!data.name?.trim()) errors.name = "Full Name is required.";
  if (!data.email?.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Email must be valid.";
  if (!data.address?.trim()) errors.address = "Address is required.";
  if (!data.role) errors.role = "Role is required.";
  const nicError = validateNIC(data.nic);
  if (nicError) errors.nic = nicError;
  if (!data.contact_no?.trim()) errors.contact_no = "Contact No is required.";
  return errors;
}

export default function StaffForm({ auth }) {
  const { data, setData, post, processing, errors: serverErrors, reset } = useForm({
    name: "",
    email: "",
    address: "",
    nic: "",
    contact_no: "",
    description: "",
    role: "",
  });
  const [clientErrors, setClientErrors] = useState({});

  const submit = (e) => {
    e.preventDefault();
    const validation = validateStaffForm(data);
    setClientErrors(validation);
    if (Object.keys(validation).length > 0) return;
    post(route("admin.staff.store"), {
      onSuccess: () => {
        reset();
        setClientErrors({});
      },
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Add New Staff
        </h2>
      }
    >
      <Head title="Add Staff" />
      <div className="max-w-3xl mx-auto bg-white shadow p-6 rounded mt-10">
        <form onSubmit={submit}>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <InputLabel value={<span>Full Name <span className="text-red-500">*</span></span>} />
              <TextInput
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                required
                className="w-full"
              />
              <InputError message={clientErrors.name || serverErrors.name} className="mt-1" />
            </div>
            <div>
              <InputLabel value={<span>Email <span className="text-red-500">*</span></span>} />
              <TextInput
                type="email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                required
                className="w-full"
              />
              <InputError message={clientErrors.email || serverErrors.email} className="mt-1" />
            </div>
            <div>
              <InputLabel value={<span>Address <span className="text-red-500">*</span></span>} />
              <TextInput
                value={data.address}
                onChange={(e) => setData("address", e.target.value)}
                required
                className="w-full"
              />
              <InputError message={clientErrors.address || serverErrors.address} className="mt-1" />
            </div>
            <div>
              <InputLabel value={<span>Role <span className="text-red-500">*</span></span>} />
              <SelectInput
                name="role"
                value={data.role}
                onChange={(e) => setData("role", e.target.value)}
                options={[
                  { value: "admin", label: "Admin" },
                  { value: "teacher", label: "Teacher" },
                  { value: "frontdesk", label: "Front Desk" },
                ]}
                className="mt-1 block w-full"
                required
              />
              <InputError message={clientErrors.role || serverErrors.role} className="mt-2" />
            </div>
            <div>
              <InputLabel value={<span>NIC <span className="text-red-500">*</span></span>} />
              <TextInput
                value={data.nic}
                onChange={(e) => setData("nic", e.target.value)}
                required
                className="w-full"
                placeholder="e.g. 998877679V or 200220900860"
              />
              <InputError message={clientErrors.nic || serverErrors.nic} className="mt-1" />
              <div className="text-xs text-gray-500 mt-1">
                NIC must be 9 digits + V (old) or 12 digits (new). Age must be 18–60 years.
              </div>
            </div>
            <div>
              <InputLabel value={<span>Contact No <span className="text-red-500">*</span></span>} />
              <TextInput
                value={data.contact_no}
                onChange={(e) => setData("contact_no", e.target.value)}
                required
                className="w-full"
              />
              <InputError message={clientErrors.contact_no || serverErrors.contact_no} className="mt-1" />
            </div>
            <div>
              <InputLabel value="Description" />
              <TextInput
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
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
    </AuthenticatedLayout>
  );
}
