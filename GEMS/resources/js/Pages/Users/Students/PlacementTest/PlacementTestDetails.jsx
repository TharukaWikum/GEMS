// import React from 'react';

// const PlacementTestDetails = ({ test }) => {
//   if (!test) return <p>No placement test scheduled yet.</p>;

//   const { title, date, time, location, status, results } = test;

//   return (
//     <div className="bg-white shadow-md rounded-xl p-6 mb-6">
//       <h2 className="text-xl font-semibold mb-4">Placement Test Details</h2>
      
//       <div className="mb-2"><strong>Title:</strong> {title}</div>
//       <div className="mb-2"><strong>Date:</strong> {date}</div>
//       <div className="mb-2"><strong>Time:</strong> {time}</div>
//       <div className="mb-2"><strong>Location:</strong> {location}</div>
//       <div className="mb-4"><strong>Status:</strong> {status}</div>

//       {status === 'completed' && results ? (
//         <div className="mt-4 border-t pt-4">
//           <h3 className="text-lg font-semibold mb-2">Your Scores</h3>
//           <div><strong>Writing:</strong> {results.writing_score} - {results.writing_comment}</div>
//           <div><strong>Speaking:</strong> {results.speaking_score} - {results.speaking_comment}</div>
//           <div><strong>Listening:</strong> {results.listening_score} - {results.listening_comment}</div>
//           <div><strong>Reading:</strong> {results.reading_score} - {results.reading_comment}</div>
//           <div className="mt-2"><strong>Final Score:</strong> {results.final_score}</div>
//           <div><strong>Final Comment:</strong> {results.final_comment}</div>
//         </div>
//       ) : (
//         <p className="text-yellow-600 font-medium">Results are not available yet.</p>
//       )}
//     </div>
//   );
// };

// export default PlacementTestDetails;


import React from 'react';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const statusColors = {
  scheduled: 'bg-blue-100 text-blue-800',
  ongoing: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const PlacementTestDetails = ({ test }) => {
  if (!test) {
    return (
      <div className="max-w-7xl mx-auto mt-8 px-4">
        <div className="bg-white rounded-lg shadow p-6 flex items-center gap-3">
          <AssignmentTurnedInIcon color="disabled" fontSize="large" />
          <span className="text-base text-gray-500 font-medium">
            No placement test scheduled yet.
          </span>
        </div>
      </div>
    );
  }

  const { title, date, time, location, status, results } = test;

  return (
    <section className="max-w-7xl mx-auto mt-8 px-4">
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3 border-b pb-3">
          <AssignmentTurnedInIcon color="primary" fontSize="large" />
          <h2 className="text-2xl font-bold text-gray-800 flex-1">
            Placement Test Details
          </h2>
          <span
            className={`px-3 py-1 rounded-full font-semibold text-sm capitalize ${statusColors[status] || 'bg-gray-100 text-gray-600'}`}
          >
            {status}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-gray-700 text-base">
          <div>
            <span className="font-semibold">Title:</span> {title}
          </div>
          <div>
            <span className="font-semibold">Date:</span> {date}
          </div>
          <div>
            <span className="font-semibold">Time:</span> {time}
          </div>
          <div>
            <span className="font-semibold">Location:</span> {location}
          </div>
        </div>

        {status === 'completed' && results ? (
          <div className="mt-2 border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Scores</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-gray-700">
              <div>
                <span className="font-semibold">Writing:</span>{' '}
                <span className="font-mono">{results.writing_score}</span>
                <span className="ml-2 text-gray-500">{results.writing_comment}</span>
              </div>
              <div>
                <span className="font-semibold">Speaking:</span>{' '}
                <span className="font-mono">{results.speaking_score}</span>
                <span className="ml-2 text-gray-500">{results.speaking_comment}</span>
              </div>
              <div>
                <span className="font-semibold">Listening:</span>{' '}
                <span className="font-mono">{results.listening_score}</span>
                <span className="ml-2 text-gray-500">{results.listening_comment}</span>
              </div>
              <div>
                <span className="font-semibold">Reading:</span>{' '}
                <span className="font-mono">{results.reading_score}</span>
                <span className="ml-2 text-gray-500">{results.reading_comment}</span>
              </div>
            </div>
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="font-semibold text-gray-800">Final Score:</span>
              <span className="font-bold text-lg text-green-700">{results.final_score}</span>
              <span className="text-gray-600">{results.final_comment}</span>
            </div>
          </div>
        ) : (
          <div className="mt-2 text-yellow-700 font-medium bg-yellow-50 rounded p-3">
            Results are not available yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default PlacementTestDetails;
