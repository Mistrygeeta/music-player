import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { faHome, faUpload } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    const [songs, setSongs] = useState([])
    const [playingIndex, setPlayingIndex] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio());

    useEffect(()=>{
        axios.get("http://localhost:3000/songs")
        .then(res=>{
            console.log(res.data)
            setSongs(res.data.songs)
        })
    },[])

    useEffect(() => {
        const audio = audioRef.current;
        const onEnded = () => {
        setIsPlaying(false);
        setPlayingIndex(null);
    };

    audio.addEventListener('ended', onEnded);

    return () => {
        audio.removeEventListener('ended', onEnded);
    };
}, []);


   const handlePlayPause = (index) => {
    const audio = audioRef.current
    console.log(songs[index].audioUrl);
    if (playingIndex === index) {
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play().catch(err => {
                console.log("Audio play error:", err);
            });
            setIsPlaying(true);
        }
    } else {
        if (playingIndex !== null) {
            audio.pause();
        }
        audio.src = songs[index].audioUrl;
        audio.play().catch(err => {
            console.log("Audio play error:", err);
        });
        setIsPlaying(true);
        setPlayingIndex(index);
    }
};


    return (
        <div className="home">
            <div className="song-list">
                {songs.map((song, index) => (
                    <div className="song-item" key={index}>
                        <img src={song.coverImage} alt={song.title} className="song-thumbnail" />
                        <div className="song-info">
                            <h2 className="song-title">{song.title}</h2>
                            <p className="song-artist">{song.artist}</p>
                            <p className="song-album">{song.album} ({song.releaseDate})</p>
                        </div>
                        <button className="play-pause-button" onClick={() => handlePlayPause(index)}>
                            <FontAwesomeIcon icon={playingIndex === index && isPlaying ? faPause : faPlay} />
                        </button>
                    </div>
                ))}
            </div>
            <nav className="bottom-nav">
                <Link to="/" className="nav-item active">
                    <FontAwesomeIcon icon={faHome} />
                    <span>Home</span>
                </Link>
                <Link to="/upload" className="nav-item">
                    <FontAwesomeIcon icon={faUpload} />
                    <span>Upload</span>
                </Link>
            </nav>
        </div>
    );
};

export default Home;