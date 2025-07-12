// import { useState } from "react";
// import axios from "axios";

// export default function CourseMaterialUpload({ courseId }) {
//     const [title, setTitle] = useState("");
//     const [file, setFile] = useState(null);
//     const [message, setMessage] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append("title", title);
//         formData.append("file", file);
//         formData.append("course_id", courseId);

//         try {
//             await axios.post(route("materials.store"), formData);
//             setMessage("Material uploaded successfully.");
//             setTitle("");
//             setFile(null);
//         } catch (err) {
//             setMessage("Upload failed.");
//         }
//     };

//     return (
//         <div className="mt-4">
//             <h3 className="font-semibold mb-2">Add Course Material</h3>
//             {message && <p className="text-sm text-green-600">{message}</p>}
//             <form onSubmit={handleSubmit} className="space-y-3">
//                 <input
//                     type="text"
//                     placeholder="Title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     className="border p-2 w-full rounded"
//                     required
//                 />
//                 <input
//                     type="file"
//                     onChange={(e) => setFile(e.target.files[0])}
//                     className="w-full"
//                     required
//                 />
//                 <button
//                     type="submit"
//                     className="bg-blue-600 text-white px-4 py-2 rounded"
//                 >
//                     Upload
//                 </button>
//             </form>
//         </div>
//     );
// }




import { useState, useRef } from "react";
import Modal from "@/Components/Modal"; // Use your reusable Modal component
import PrimaryButton from "@/Components/PrimaryButton"; // Use your reusable button

export default function CourseMaterialUpload({ courseId }) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef();

  const handleOpen = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setMessage("");
    setTitle("");
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    formData.append("course_id", courseId);

    try {
      await axios.post(route("materials.store"), formData);
      setMessage("Material uploaded successfully.");
      setTitle("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setMessage("Upload failed.");
    }
  };

  return (
    <div className="my-4">
      <PrimaryButton onClick={handleOpen}>
        Upload Course Material
      </PrimaryButton>

      <Modal show={showModal} maxWidth="sm" onClose={handleClose}>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <h3 className="text-xl font-bold mb-2 text-gray-800">
            Add Course Material
          </h3>
          {message && (
            <div
              className={`text-sm px-3 py-2 rounded ${
                message.includes("success")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              placeholder="Material Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">File</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full"
              required
            />
          </div>
          <div className="flex gap-2 justify-end">
            <PrimaryButton type="submit">
              Upload
            </PrimaryButton>
            <button
              type="button"
              onClick={handleClose}
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
