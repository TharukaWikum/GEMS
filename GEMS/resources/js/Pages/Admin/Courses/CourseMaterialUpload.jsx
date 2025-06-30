import { useState } from "react";
import axios from "axios";

export default function CourseMaterialUpload({ courseId }) {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

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
        } catch (err) {
            setMessage("Upload failed.");
        }
    };

    return (
        <div className="mt-4">
            <h3 className="font-semibold mb-2">Add Course Material</h3>
            {message && <p className="text-sm text-green-600">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 w-full rounded"
                    required
                />
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Upload
                </button>
            </form>
        </div>
    );
}
