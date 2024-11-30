import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';  // Make sure to install axios

function DocumentEditor({ title, documentId }) {
  const [content, setContent] = useState('');
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // Fetch initial document content
  useEffect(() => {
    const fetchDocumentContent = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/document/${documentId}/`);
        setContent(response.data.content);
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchDocumentContent();
  }, [documentId]);

  useEffect(() => {
    const newSocket = new WebSocket(`ws://localhost:8000/ws/document/${documentId}/`);
    
    newSocket.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      // Implement a more sophisticated merge strategy
      // This is a simple last-write-wins strategy
      if (data.content !== content) {
        setContent(data.content);
      }
    };

    newSocket.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [documentId, content]);

  const handleChange = useCallback((event) => {
    const newContent = event.target.value;
    setContent(newContent);

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ 
        type: 'update',
        content: newContent 
      }));
    }
  }, [socket]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        {title}
      </h1>

      <p className="text-sm text-gray-500 mb-4">
        Status: {isConnected ? 'Connected 🟢' : 'Disconnected 🔴'}
      </p>

      <textarea
        className="w-[90vw] h-[70vh] text-lg border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={content}
        onChange={handleChange}
        style={{ lineHeight: '1.5' }}
        placeholder={isConnected ? "Start typing..." : "Connecting..."}
      />
    </div>
  );
}

export default DocumentEditor;