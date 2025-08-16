import React, { useState } from 'react';
import axios from 'axios';
import './Upload.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUpload } from '@fortawesome/free-solid-svg-icons';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSuccess(false);
    setError('');
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    setSuccess(false);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('audio', file);
      const result= await axios.post('http://localhost:3000/songs', formData);
      console.log(result)
      setSuccess(true);
      setFile(null);
    } catch (err) {
      setError('Upload failed.');
    }
    setUploading(false);
  };

  return (
    <div className="upload-container">
      <form className="upload-form" onSubmit={handleUpload}>
        <label htmlFor="audio" className="upload-label">
          Select Studio File
        </label>
        <input
          type="file"
          id="audio"
          accept="audio/*"
          className="upload-input"
          onChange={handleFileChange}
          disabled={uploading}
        />
        <button
          type="submit"
          className="upload-btn"
          disabled={!file || uploading}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        {success && <div className="upload-success">Upload successful!</div>}
        {error && <div className="upload-error">{error}</div>}
      </form>
      <nav className="bottom-nav">
        <Link to="/" className="nav-item">
          <FontAwesomeIcon icon={faHome} />
          <span>Home</span>
        </Link>
        <Link to="/upload" className="nav-item active">
          <FontAwesomeIcon icon={faUpload} />
          <span>Upload</span>
        </Link>
      </nav>
    </div>
  );
};

export default Upload;