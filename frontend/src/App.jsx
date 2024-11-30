import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Editing from './components/editing';
import DocumentPage from './components/editing_section';
import './index.css'; // Ensure this imports your Tailwind CSS

function App() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Routes>
        <Route
          path="/"
          element={
            <div className="text-center">
              <h1 className="text-5xl font-bold text-gray-800 mb-6">
                Welcome to the Collaborative Text Editor!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Collaborate with others in real-time.
              </p>
              <button
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                onClick={() => navigate('/edit')}
              >
                Documents
              </button>
            </div>
          }
        />
        <Route path="/edit" element={<Editing />} />
        <Route path="/document/:id" element={<DocumentPage />} />
      </Routes>
    </div>
  );
}

export default App;
