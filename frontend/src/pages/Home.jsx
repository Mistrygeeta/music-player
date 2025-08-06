import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { faHome, faUpload } from '@fortawesome/free-solid-svg-icons';

const songs = [
    {
        title: 'Song Title 1',
        artist: 'Artist 1',
        album: 'Album 1',
        releasedYear: 2023,
        thumbnail: 'https://images.unsplash.com/photo-1682685797275-9c3f0993a193?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
        audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
        title: 'Song Title 2',
        artist: 'Artist 2',
        album: 'Album 2',
        releasedYear: 2022,
        thumbnail: 'https://images.unsplash.com/photo-1682920648149-359b90801c37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
        audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
    {
        title: 'Song Title 3',
        artist: 'Artist 3',
        album: 'Album 3',
        releasedYear: 2021,
        thumbnail: 'https://images.unsplash.com/photo-1682834300892-344a0999a48c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
        audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    },
    {
        title: 'Song Title 4',
        artist: 'Artist 4',
        album: 'Album 4',
        releasedYear: 2020,
        thumbnail: 'https://images.unsplash.com/photo-1682887435939-9f52e075b940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    },
    {
        title: 'Song Title 5',
        artist: 'Artist 5',
        album: 'Album 5',
        releasedYear: 2019,
        thumbnail: 'https://images.unsplash.com/photo-1682839037934-57c92cd559e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    },
    {
        title: 'Song Title 6',
        artist: 'Artist 6',
        album: 'Album 6',
        releasedYear: 2018,
        thumbnail: 'https://images.unsplash.com/photo-1682823423755-459c44945964?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    },
];

const Home = () => {
    const [playingIndex, setPlayingIndex] = useState(null);
    const [audio] = useState(new Audio());
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        audio.addEventListener('ended', () => {
            setIsPlaying(false);
            setPlayingIndex(null);
        });

        return () => {
            audio.removeEventListener('ended', () => {
                setIsPlaying(false);
                setPlayingIndex(null);
            });
        };
    }, [audio]);


    const handlePlayPause = (index) => {
        if (playingIndex === index) {
            // If the same song is playing, pause it
            if (isPlaying) {
                audio.pause();
                setIsPlaying(false);
            } else {
                audio.play();
                setIsPlaying(true);
            }
        } else {
            // If a different song is playing
            if (playingIndex !== null) {
                // Pause the currently playing song
                audio.pause();
            }
            audio.src = songs[index].audio;
            audio.play();
            setIsPlaying(true);
            setPlayingIndex(index);
        }
    };

    return (
        <div className="home">
            <div className="song-list">
                {songs.map((song, index) => (
                    <div className="song-item" key={index}>
                        <img src={song.thumbnail} alt={song.title} className="song-thumbnail" />
                        <div className="song-info">
                            <h2 className="song-title">{song.title}</h2>
                            <p className="song-artist">{song.artist}</p>
                            <p className="song-album">{song.album} ({song.releasedYear})</p>
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