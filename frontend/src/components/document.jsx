import React, { useState, useEffect, useCallback } from 'react';

function DocumentEditor({ documentId }) {
  const [content, setContent] = useState('');
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = new WebSocket(`ws://localhost:8000/ws/document/${documentId}/`);
    
    newSocket.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setContent(data.content);
    };

    newSocket.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [documentId]);

  const handleChange = useCallback((event) => {
    const newContent = event.target.value;
    setContent(newContent);

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ content: newContent }));
    }
  }, [socket]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Document Editor {isConnected ? '🟢' : '🔴'}
      </h1>
      <textarea
        className="w-full max-w-4xl h-[80vh] p-4 text-lg border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={content}
        onChange={handleChange}
        style={{ lineHeight: '1.5' }}
        placeholder={isConnected ? "Start typing..." : "Connecting..."}
      />
    </div>
  );
}

export default DocumentEditor;