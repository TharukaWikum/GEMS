// import React, { useState } from "react";
// import { router } from "@inertiajs/react";

// export default function ScheduleCourseExam({ courseId, students }) {
//     const [form, setForm] = useState({
//         title: "",
//         description: "",
//         exam_date: "",
//         start_time: "",
//         duration_minutes: "",
//         student_ids: [],
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setForm((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleStudentSelect = (id) => {
//         setForm((prev) => {
//             const selected = prev.student_ids.includes(id)
//                 ? prev.student_ids.filter((sid) => sid !== id)
//                 : [...prev.student_ids, id];
//             return { ...prev, student_ids: selected };
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         router.post(
//             "/admin/course-exams",
//             {
//                 ...form,
//                 course_id: courseId,
//             },
//             {
//                 preserveScroll: true,
//                 onSuccess: () =>
//                     setForm({
//                         title: "",
//                         description: "",
//                         exam_date: "",
//                         start_time: "",
//                         duration_minutes: "",
//                         student_ids: [],
//                     }),
//                 onError: (errors) => {
//                     console.error("Validation errors:", errors);
//                     alert("Validation failed: " + JSON.stringify(errors));
//                 },
//             }
//         );
//     };

//     return (
//         <div className="mt-10 border p-6 rounded-lg bg-gray-50">
//             <h3 className="text-lg font-semibold mb-4">Schedule Course Exam</h3>
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                     <label className="block font-medium">Exam Title</label>
//                     <input
//                         type="text"
//                         name="title"
//                         value={form.title}
//                         onChange={handleChange}
//                         required
//                         className="w-full border rounded px-3 py-2"
//                     />
//                 </div>
//                 <div>
//                     <label className="block font-medium">Exam Description</label>
//                     <textarea
//                         name="description"
//                         value={form.description}
//                         onChange={handleChange}
//                         className="w-full border rounded px-3 py-2"
//                     />
//                 </div>
//                 <div>
//                     <label className="block font-medium">Exam Date</label>
//                     <input
//                         type="date"
//                         name="exam_date"
//                         value={form.exam_date}
//                         onChange={handleChange}
//                         required
//                         className="w-full border rounded px-3 py-2"
//                     />
//                 </div>
//                 <div>
//                     <label className="block font-medium">Start Time</label>
//                     <input
//                         type="time"
//                         name="start_time"
//                         value={form.start_time}
//                         onChange={handleChange}
//                         required
//                         className="w-full border rounded px-3 py-2"
//                     />
//                 </div>
//                 <div>
//                     <label className="block font-medium">Duration (minutes)</label>
//                     <input
//                         type="number"
//                         name="duration_minutes"
//                         value={form.duration_minutes}
//                         onChange={handleChange}
//                         required
//                         min={1}
//                         className="w-full border rounded px-3 py-2"
//                     />
//                 </div>

//                 <div>
//                     <label className="block font-medium mb-2">Select Students</label>
//                     <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto border p-3 rounded">
//                         {students.map((student) => (
//                             <label
//                                 key={student.id}
//                                 className="flex items-center space-x-2"
//                             >
//                                 <input
//                                     type="checkbox"
//                                     checked={form.student_ids.includes(student.id)}
//                                     onChange={() => handleStudentSelect(student.id)}
//                                 />
//                                 <span>
//                                     {student.name} ({student.email})
//                                 </span>
//                             </label>
//                         ))}
//                     </div>
//                 </div>

//                 <button
//                     type="submit"
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 >
//                     Schedule Exam
//                 </button>
//             </form>
//         </div>
//     );
// }


import React, { useState, useMemo } from "react";
import { router } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";

export default function ScheduleCourseExam({ courseId, students }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    exam_date: "",
    start_time: "",
    duration_minutes: "",
    student_ids: [],
  });
  const [search, setSearch] = useState("");

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      exam_date: "",
      start_time: "",
      duration_minutes: "",
      student_ids: [],
    });
    setSearch("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleStudentSelect = (id) => {
    setForm((prev) => {
      const selected = prev.student_ids.includes(id)
        ? prev.student_ids.filter((sid) => sid !== id)
        : [...prev.student_ids, id];
      return { ...prev, student_ids: selected };
    });
  };

  const handleSelectAll = () => {
    if (form.student_ids.length === filteredStudents.length) {
      setForm((prev) => ({ ...prev, student_ids: [] }));
    } else {
      setForm((prev) => ({
        ...prev,
        student_ids: filteredStudents.map((s) => s.id),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post(
      "/admin/course-exams",
      {
        ...form,
        course_id: courseId,
      },
      {
        preserveScroll: true,
        onSuccess: () => {
          resetForm();
          setShowModal(false);
        },
        onError: (errors) => {
          alert("Validation failed: " + JSON.stringify(errors));
        },
      }
    );
  };

  // Filter students by search
  const filteredStudents = useMemo(() => {
    if (!search.trim()) return students;
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, students]);

  // Selected students as objects
  const selectedStudents = students.filter((s) =>
    form.student_ids.includes(s.id)
  );

  return (
    <div className="my-8">
      <PrimaryButton onClick={() => setShowModal(true)}>
        Schedule Course Exam
      </PrimaryButton>

      <Modal show={showModal} maxWidth="2xl" onClose={() => setShowModal(false)}>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <h3 className="text-xl font-bold mb-2 text-gray-800">
            Schedule Course Exam
          </h3>

          <div>
            <label className="block font-medium mb-1">Exam Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Exam Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium mb-1">Exam Date</label>
              <input
                type="date"
                name="exam_date"
                value={form.exam_date}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Start Time</label>
              <input
                type="time"
                name="start_time"
                value={form.start_time}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Duration (minutes)</label>
              <input
                type="number"
                name="duration_minutes"
                value={form.duration_minutes}
                onChange={handleChange}
                required
                min={1}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">Select Students</label>
            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-2 w-full border rounded px-3 py-2"
            />
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={
                  filteredStudents.length > 0 &&
                  form.student_ids.length === filteredStudents.length
                }
                onChange={handleSelectAll}
                className="mr-2"
              />
              <span className="text-sm">Select All</span>
            </div>
            <div className="max-h-48 overflow-y-auto border rounded p-3 bg-gray-50 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredStudents.map((student) => (
                <label key={student.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={form.student_ids.includes(student.id)}
                    onChange={() => handleStudentSelect(student.id)}
                  />
                  <span>
                    {student.name} <span className="text-xs text-gray-500">({student.email})</span>
                  </span>
                </label>
              ))}
              {filteredStudents.length === 0 && (
                <div className="text-gray-500 text-sm col-span-2">No students found.</div>
              )}
            </div>
            {selectedStudents.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedStudents.map((s) => (
                  <span
                    key={s.id}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <PrimaryButton type="submit">
              Schedule Exam
            </PrimaryButton>
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

