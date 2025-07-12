// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const CourseMaterials = ({ courseId }) => {
//   const [materials, setMaterials] = useState([]);

//   useEffect(() => {
//     axios.get(`/course-materials/${courseId}`).then(res => {
//       setMaterials(res.data);
//     });
//   }, [courseId]);

//   return (
//     <div className="p-4 bg-white rounded shadow">
//       <h3 className="text-lg font-bold mb-2">Course Materials</h3>
//       <ul className="space-y-2">
//         {materials.map((mat) => (
//           <li key={mat.id}>
//             <a href={`/storage/${mat.file_path}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
//               {mat.title} ({mat.type})
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CourseMaterials;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DownloadIcon from '@mui/icons-material/Download';
import dayjs from 'dayjs';

const CourseMaterials = ({ courseId }) => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    axios.get(`/course-materials/${courseId}`).then(res => {
      setMaterials(res.data);
    });
  }, [courseId]);

  return (
    <section className="max-w-7xl mx-auto mt-8 px-4">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Course Materials</h3>
        {materials.length === 0 ? (
          <div className="text-gray-500 text-base bg-gray-50 rounded p-4">
            No materials available.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {materials.map((mat) => (
              <div
                key={mat.id}
                className="bg-gray-50 rounded-lg shadow-sm p-4 flex flex-col gap-2"
              >
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                  <InsertDriveFileIcon fontSize="small" className="text-blue-400" />
                  <span>{dayjs(mat.created_at).format("YYYY-MM-DD")}</span>
                  <span className="ml-auto px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs font-semibold uppercase">
                    {mat.type}
                  </span>
                </div>
                <div className="font-semibold text-base text-gray-800">{mat.title}</div>
                <div className="text-gray-600 text-xs break-all">{mat.file_path.split('/').pop()}</div>
                <a
                  href={`/storage/${mat.file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition font-medium w-max"
                  download
                >
                  <DownloadIcon fontSize="small" />
                  Download
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseMaterials;
