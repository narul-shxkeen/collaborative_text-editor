import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DocPage from './document';

function Editing() {
  const [documentId, setDocumentId] = useState(null);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Fetch existing documents or create a new one
    const fetchOrCreateDocument = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/documents/');
        const existingDocs = response.data;
        
        if (existingDocs.length > 0) {
          setDocuments(existingDocs);
          setDocumentId(existingDocs[0].id);
        } else {
          // Create a new document if none exist
          const newDocResponse = await axios.post('http://localhost:8000/api/documents/', {
            title: 'New Document',
            content: ''
          });
          
          setDocumentId(newDocResponse.data.id);
          setDocuments([newDocResponse.data]);
        }
      } catch (error) {
        console.error('Error fetching/creating documents:', error);
        
        // Fallback to creating a new document
        try {
          const newDocResponse = await axios.post('http://localhost:8000/api/documents/', {
            title: 'New Document',
            content: ''
          });
          
          setDocumentId(newDocResponse.data.id);
          setDocuments([newDocResponse.data]);
        } catch (createError) {
          console.error('Error creating document:', createError);
        }
      }
    };

    fetchOrCreateDocument();
  }, []);

  const handleNewDocument = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/documents/', {
        title: `New Document ${documents.length + 1}`,
        content: ''
      });
      
      setDocumentId(response.data.id);
      setDocuments([...documents, response.data]);
    } catch (error) {
      console.error('Error creating new document:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Edit Your Document</h1>
      
      {/* Document Selection Dropdown */}
      <div className="flex items-center space-x-4 mb-4">
        {documents.length > 0 && (
          <select 
            value={documentId || ''}
            onChange={(e) => setDocumentId(e.target.value)}
            className="p-2 border rounded"
          >
            {documents.map(doc => (
              <option key={doc.id} value={doc.id}>
                {doc.title}
              </option>
            ))}
          </select>
        )}
        
        <button 
          onClick={handleNewDocument}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          New Document
        </button>
      </div>

      {documentId && <DocPage documentId={documentId} />}
    </div>
  );
}

export default Editing;