import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import s from 'styled-components';
// import video1 from '../'
const EatClips = () => {
  const [eatClips, setEatClips] = useState([]);
  const [newClip, setNewClip] = useState({
    title: '',
    description: '',
  });
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://eat-ease-62d8.onrender.com/api/eat_ease/eatclips');
      setEatClips(response.data);
    } catch (error) {
      console.error('Error fetching EatClips:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewClip({ ...newClip, [e.target.name]: e.target.value });
  };

  const onDrop = (acceptedFiles) => {
    // Set the first accepted file as the videoFile
    setVideoFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'video/*', // Allow only video files
    multiple: false,
  });

  const handleAddClip = async () => {
    try {
      // Create a FormData object to append the file and other form data
      const formData = new FormData();
      formData.append('video', videoFile);
      formData.append('title', newClip.title);
      formData.append('description', newClip.description);


      const response = await axios.post('https://eat-ease-62d8.onrender.com/api/eat_ease/eatclips', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const insertedClip = response.data;
      console.log('Inserted Clip from Server:', insertedClip);

      setEatClips((prevClips) => [...prevClips, insertedClip]);

      setNewClip({
        title: '',
        description: '',
      });
      setVideoFile(null); // Reset the videoFile after upload
    } catch (error) {
      console.error('Error adding EatClip:', error);
    }
  };

  const handleDeleteClip = async (id) => {
    try {
      await axios.delete(`https://eat-ease-62d8.onrender.com/api/eat_ease/eatclips/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting EatClip:', error);
    }
  };

  return (
    <div>
      <h2>EatClips</h2>

      {/* Add EatClip Form */}
      <div>
        <h3>Add EatClip</h3>
        <label>Title:</label>
        <input type="text" name="title" value={newClip.title} onChange={handleInputChange} />
        <label>Description:</label>
        <textarea name="description" value={newClip.description} onChange={handleInputChange} />

        {/* Dropzone for file upload */}
        <div {...getRootProps()} style={{ border: '1px solid #ccc', padding: '20px', marginTop: '10px' }}>
          <input {...getInputProps()} />
          {videoFile ? <p>Video selected: {videoFile.name}</p> : <p>Drag 'n' drop a video file here, or click to select one</p>}
        </div>

        <button onClick={handleAddClip}>Add EatClip</button>
      </div>
 <div>
   
     </div>
      {/* Display EatClips */}
      <div>
        <h3>EatClips List</h3>
        {eatClips.map((clip) => (
          <div key={clip._id}>
  <h4>{clip.title}</h4>
<p>{clip.videoUrl}</p>
<p>{clip.description}</p>
<p>{`${process.env.PUBLIC_URL+clip.videoUrl.replace(/\\/g, '/').replace('https://eat-ease-62d8.onrender.com/public/uploads/', '')}`}</p>
  <video
    src={`${process.env.PUBLIC_URL+clip.videoUrl.replace(/\\/g, '/').replace('https://eat-ease-62d8.onrender.com/public/uploads/', '')}`}
    controls
    width="500"
    height="800"
  ></video>
  <button onClick={() => handleDeleteClip(clip._id)}>Delete</button>
</div>

        ))}
      </div>
    </div>
  );
};

export default EatClips;
