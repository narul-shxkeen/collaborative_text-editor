import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import DocumentEditor from './document';

function DocumentPage() {
  const { id: documentId } = useParams(); // Extract the documentId from the URL
  const location = useLocation();
  const { title } = location.state || { title: 'Untitled Document' }; // Get title from state, fallback to default

  return (
    <div>
      <DocumentEditor title={title} documentId={documentId} />
    </div>
  );
}

export default DocumentPage;
