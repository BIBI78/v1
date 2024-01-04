import React, { useState } from 'react';
import axios from 'axios';

const Mp3Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select an MP3 file!');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('mp3File', selectedFile);

      const response = await axios.post('https://drfa-api-0c6557539d5a.herokuapp.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle the response from the server, update UI accordingly
      setUploadStatus(`Upload successful: ${response.data.message}`);
    } catch (error) {
      // Handle errors
      setUploadStatus('Upload failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>MP3 Upload</h2>
      <input type="file" accept=".mp3" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload MP3</button>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default Mp3Upload;
