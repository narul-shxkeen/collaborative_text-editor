import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Editing() {
  const [documents, setDocuments] = useState([
    { id: '1', title: 'Welcome Document', content: 'Initial welcome content' },
    { id: '2', title: 'Meeting Notes', content: 'Notes from team meeting' },
    { id: '3', title: 'Project Proposal', content: 'Draft of project proposal' },
  ]);

  const [isAddingDocument, setIsAddingDocument] = useState(false);
  const [newDocumentTitle, setNewDocumentTitle] = useState('');
  const navigate = useNavigate();

  const handleNewDocument = () => {
    setIsAddingDocument(true);
    setNewDocumentTitle('');
  };

  const createDocument = () => {
    if (!newDocumentTitle.trim()) {
      alert('Please enter a document title');
      return;
    }

    const newDocumentId = (documents.length + 1).toString();
    const newDocument = {
      id: newDocumentId,
      title: newDocumentTitle,
      content: '',
    };

    setDocuments([...documents, newDocument]);
    setIsAddingDocument(false);
    setNewDocumentTitle('');
  };

  const handleDocumentClick = (document) => {
    navigate(`/document/${document.id}`, { state: { title: document.title } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Documents!</h1>

      {/* New Document Modal */}
      {isAddingDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">Create New Document</h2>
            <input
              type="text"
              value={newDocumentTitle}
              onChange={(e) => setNewDocumentTitle(e.target.value)}
              placeholder="Enter document title"
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsAddingDocument(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
              >
                Cancel
              </button>
              <button
                onClick={createDocument}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document List */}
      <div className="w-full max-w-md mb-4">
        <button
          onClick={handleNewDocument}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-2"
        >
          New Document
        </button>

        {documents.map((doc) => (
          <div
            key={doc.id}
            onClick={() => handleDocumentClick(doc)}
            className="p-3 border rounded mb-2 cursor-pointer bg-white hover:bg-gray-100"
          >
            {doc.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Editing;
