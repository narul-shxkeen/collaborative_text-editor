import { useState } from 'react';
import './index.css'; // Ensure this imports your Tailwind CSS
import DocPage from './components/editing';

function App() {
  const [showDocPage, setShowDocPage] = useState(false);

  const handleButtonClick = () => {
    setShowDocPage(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {!showDocPage ? (
        <div className="text-center p-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Collaborative Text Editor!</h1>
          <p className="text-lg text-gray-600 mb-6">Collaborate with others in real-time.</p>
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={handleButtonClick}
          >
            Documents
          </button>
        </div>
      ) : (
        <DocPage  documentId="1"/>
      )}
    </div>
  );
}

export default App;