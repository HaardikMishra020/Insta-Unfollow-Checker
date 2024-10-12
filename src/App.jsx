import React, { useState } from 'react';
import FileUploader from './components/FileUploader';
import { processZipFile } from './components/FileProcessor';
import logo from './assets/modi.jpg'; // Update this path to your logo image

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState([]);
  const [error, setError] = useState('');

  const handleFileSelect = (file) => {
    setFile(file);
    setError(''); // Reset any previous errors
  };

  const handleSubmit = async () => {
    if (file) {
      try {
        const result = await processZipFile(file);
        setResult(result);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-4">
      <header className="w-full flex items-center justify-center  py-4 mb-6">
        <img src={logo} alt="Logo" className="max-w-36 mr-2" /> {/* Logo image */}
        <h1 className="text-2xl font-bold">Pradhan Mantri Gaddar Pakdo Yojna</h1>
      </header>
      <div className="flex flex-col items-center w-full max-w-md">
        <FileUploader onFileSelect={handleFileSelect} />
        <button
          onClick={handleSubmit}
          className="text-xl rounded-xl mt-4 px-6 py-4 bg-primary text-offwhite rounded hover:bg-opacity-80 transition w-full"
        >
          Submit
        </button>
        {error && <div className="mt-4 text-red-500">{error}</div>}
        <div className="mt-4 w-full">
          <h2 className="text-xl font-semibold">List of Gaddars</h2>
          <ul className="list-disc list-inside mt-2">
            {result.length === 0 ? (
              <li className="mt-2 text-gray-600">No results to display.</li>
            ) : (
              result.map((name, index) => (
                <li key={index} className="mt-2 text-lg">{name}</li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
