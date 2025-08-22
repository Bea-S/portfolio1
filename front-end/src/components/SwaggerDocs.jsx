import React from 'react';

const SwaggerDocs = () => {
  return (
    <div style={{ height: '90vh', width: '100%' }}>
      <iframe
        title="Swagger API Docs"
        src="http://localhost:5000/api-docs"
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    </div>
  );
};

export default SwaggerDocs;
