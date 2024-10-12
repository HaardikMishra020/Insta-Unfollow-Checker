import React from 'react';

const FileUploader = ({ onFileSelect }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onFileSelect(file);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <input
        type="file"
        accept=".zip"
        onChange={handleFileChange}
        className="mt-2 mb-4 border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
    </div>
  );
};

export default FileUploader;
