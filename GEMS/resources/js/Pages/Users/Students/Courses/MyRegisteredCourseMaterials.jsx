import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyRegisteredCourseMaterials = ({ registeredCourses }) => {
  const [materials, setMaterials] = useState({});

  useEffect(() => {
    const fetchMaterials = async () => {
      const allMaterials = {};
      for (const course of registeredCourses) {
        try {
          const res = await axios.get(`/course-materials/${course.id}`);
          allMaterials[course.id] = res.data;
        } catch (error) {
          console.error(`Error loading materials for course ${course.id}`, error);
        }
      }
      setMaterials(allMaterials);
    };
    fetchMaterials();
  }, [registeredCourses]);

  return (
    <div className="p-4 bg-white rounded shadow space-y-6 mt-6">
      <h3 className="text-lg font-bold">Your Courses and Materials</h3>
      {registeredCourses.map(course => (
        <div key={course.id} className="border p-4 rounded bg-gray-50">
          <h4 className="font-semibold text-blue-700">{course.name}</h4>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            {(materials[course.id] || []).map(material => (
              <li key={material.id}>
                <a
                  href={`/storage/${material.file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {material.title} ({material.type})
                </a>
              </li>
            ))}
            {(materials[course.id]?.length === 0) && <p className="text-sm text-gray-500">No materials uploaded yet.</p>}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MyRegisteredCourseMaterials;
