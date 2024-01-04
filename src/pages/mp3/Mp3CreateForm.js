import React, { useState } from 'react';
import axios from 'axios';

const Mp3CreateForm = () => {
  const [mp3Info, setMp3Info] = useState({
    title: '',
    artist: '',
    // Add more fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMp3Info((prevMp3Info) => ({
      ...prevMp3Info,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to your backend to create the MP3 entry with the provided information
      const response = await axios.post('https://drfa-api-0c6557539d5a.herokuapp.com/create-mp3', mp3Info);
      
      // Handle the response from the server (e.g., show success message)
      console.log('MP3 created successfully:', response.data);
    } catch (error) {
      // Handle errors (e.g., show error message)
      console.error('Error creating MP3:', error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Create MP3</h2>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={mp3Info.title}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="artist">Artist:</label>
      <input
        type="text"
        id="artist"
        name="artist"
        value={mp3Info.artist}
        onChange={handleInputChange}
        required
      />

      {/* Add more input fields for additional information as needed */}

      <button type="submit">Create MP3</button>
    </form>
  );
};

export default Mp3CreateForm;
