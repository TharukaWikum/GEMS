import React from 'react';

const PlacementTestDetails = ({ test }) => {
  if (!test) return <p>No placement test scheduled yet.</p>;

  const { title, date, time, location, status, results } = test;

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Placement Test Details</h2>
      
      <div className="mb-2"><strong>Title:</strong> {title}</div>
      <div className="mb-2"><strong>Date:</strong> {date}</div>
      <div className="mb-2"><strong>Time:</strong> {time}</div>
      <div className="mb-2"><strong>Location:</strong> {location}</div>
      <div className="mb-4"><strong>Status:</strong> {status}</div>

      {status === 'completed' && results ? (
        <div className="mt-4 border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">Your Scores</h3>
          <div><strong>Writing:</strong> {results.writing_score} - {results.writing_comment}</div>
          <div><strong>Speaking:</strong> {results.speaking_score} - {results.speaking_comment}</div>
          <div><strong>Listening:</strong> {results.listening_score} - {results.listening_comment}</div>
          <div><strong>Reading:</strong> {results.reading_score} - {results.reading_comment}</div>
          <div className="mt-2"><strong>Final Score:</strong> {results.final_score}</div>
          <div><strong>Final Comment:</strong> {results.final_comment}</div>
        </div>
      ) : (
        <p className="text-yellow-600 font-medium">Results are not available yet.</p>
      )}
    </div>
  );
};

export default PlacementTestDetails;
