// import { useForm } from '@inertiajs/react';

// export default function CourseProfile({ course, teachers }) {
//     const { data, setData, put, processing, errors } = useForm({
//         course_fee: course.course_fee,
//         status: course.status,
//         conductor_id: course.conductor_id,
//     });

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         put(route('admin.courses.update', course.id));
//     };

//     return (
//         <div className="space-y-8">
//             {/* Display Section */}
//             <div className="bg-white p-6 rounded shadow">
//                 <h2 className="text-2xl font-bold mb-4">Course Details</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//                     <div><strong>Name:</strong> {course.name}</div>
//                     <div><strong>Description:</strong> {course.description}</div>
//                     <div><strong>Type:</strong> {course.type}</div>
//                     <div><strong>Duration:</strong> {course.duration}</div>
//                     <div><strong>Conductor:</strong> {course.conductor_name}</div>
//                 </div>
//             </div>

//             {/* Update Form */}
//             <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
//                 <h2 className="text-xl font-semibold mb-2">Update Course</h2>

//                 <div>
//                     <label className="block font-medium">Course Fee (LKR)</label>
//                     <input
//                         type="number"
//                         value={data.course_fee}
//                         onChange={(e) => setData('course_fee', e.target.value)}
//                         className="w-full border p-2 rounded"
//                     />
//                     {errors.course_fee && <div className="text-red-500">{errors.course_fee}</div>}
//                 </div>

//                 <div>
//                     <label className="block font-medium">Status</label>
//                     <select
//                         value={data.status}
//                         onChange={(e) => setData('status', e.target.value)}
//                         className="w-full border p-2 rounded"
//                     >
//                         <option value="Active">Active</option>
//                         <option value="Inactive">Inactive</option>
//                     </select>
//                     {errors.status && <div className="text-red-500">{errors.status}</div>}
//                 </div>

//                 <div>
//                     <label className="block font-medium">Instructor</label>
//                     <select
//                         value={data.conductor_id}
//                         onChange={(e) => setData('conductor_id', e.target.value)}
//                         className="w-full border p-2 rounded"
//                     >
//                         {teachers.map((teacher) => (
//                             <option key={teacher.id} value={teacher.id}>
//                                 {teacher.name}
//                             </option>
//                         ))}
//                     </select>
//                     {errors.conductor_id && <div className="text-red-500">{errors.conductor_id}</div>}
//                 </div>

//                 <button
//                     type="submit"
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                     disabled={processing}
//                 >
//                     Save Changes
//                 </button>
//             </form>
//         </div>
//     );
// }

import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import Modal from "@/Components/Modal";

export default function CourseProfile({ course, teachers }) {
  const [showEdit, setShowEdit] = useState(false);

  const { data, setData, put, processing, errors, reset } = useForm({
    course_fee: course.course_fee,
    status: course.status,
    conductor_id: course.conductor_id,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route("admin.courses.update", course.id), {
      onSuccess: () => setShowEdit(false),
    });
  };

  const closeModal = () => {
    setShowEdit(false);
    reset();
  };

  return (
    <section className="max-w-7xl mx-auto mt-8 px-4">
      {/* Display Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Course Details</h2>
          <PrimaryButton onClick={() => setShowEdit(true)}>
            Edit
          </PrimaryButton>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-base text-gray-700">
          <div>
            <span className="font-semibold">Name:</span> {course.name}
          </div>
          <div>
            <span className="font-semibold">Description:</span> {course.description}
          </div>
          <div>
            <span className="font-semibold">Type:</span> {course.type}
          </div>
          <div>
            <span className="font-semibold">Duration:</span> {course.duration}
          </div>
          <div>
            <span className="font-semibold">Instructor:</span> {course.conductor_name}
          </div>
          <div>
            <span className="font-semibold">Fee:</span> LKR {course.course_fee}
          </div>
          <div>
            <span className="font-semibold">Status:</span>{" "}
            <span className={`inline-block px-3 py-0.5 rounded-full font-semibold text-xs capitalize ${
              course.status === "Active"
                ? "bg-green-100 text-green-700"
                : course.status === "Inactive"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-700"
            }`}>
              {course.status}
            </span>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal show={showEdit} maxWidth="md" onClose={closeModal}>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Edit Course</h2>
          <div>
            <InputLabel htmlFor="course_fee" value="Course Fee (LKR)" />
            <TextInput
              id="course_fee"
              type="number"
              value={data.course_fee}
              onChange={(e) => setData("course_fee", e.target.value)}
              className="mt-1 block w-full"
              min={0}
              required
            />
            <InputError message={errors.course_fee} className="mt-1" />
          </div>

          <div>
            <InputLabel htmlFor="status" value="Status" />
            <SelectInput
              id="status"
              value={data.status}
              onChange={(e) => setData("status", e.target.value)}
              options={[
                { label: "Active", value: "Active" },
                { label: "Inactive", value: "Inactive" },
              ]}
              className="mt-1 block w-full"
              required
            />
            <InputError message={errors.status} className="mt-1" />
          </div>

          <div>
            <InputLabel htmlFor="conductor_id" value="Instructor" />
            <SelectInput
              id="conductor_id"
              value={data.conductor_id}
              onChange={(e) => setData("conductor_id", e.target.value)}
              options={teachers.map((t) => ({ label: t.name, value: t.id }))}
              className="mt-1 block w-full"
              required
            />
            <InputError message={errors.conductor_id} className="mt-1" />
          </div>

          <div className="flex justify-end gap-2">
            <PrimaryButton type="submit" disabled={processing}>
              {processing ? "Saving..." : "Save Changes"}
            </PrimaryButton>
            <button
              type="button"
              onClick={closeModal}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
