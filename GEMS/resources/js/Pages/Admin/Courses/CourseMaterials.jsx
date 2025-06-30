import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseMaterials = ({ courseId }) => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    axios.get(`/course-materials/${courseId}`).then(res => {
      setMaterials(res.data);
    });
  }, [courseId]);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-bold mb-2">Course Materials</h3>
      <ul className="space-y-2">
        {materials.map((mat) => (
          <li key={mat.id}>
            <a href={`/storage/${mat.file_path}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              {mat.title} ({mat.type})
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseMaterials;
