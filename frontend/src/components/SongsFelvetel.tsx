import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Song {
    title: string;
    genre: string;
    release_date: string;
    rating : number;
}

export default function SongsFelvetel() {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [rating, setRating] = useState<number | ''>('');

    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e: React.FormEvent) => {
        
        setSuccess(false);
        setError(null);

        const newSong: Song = {
            title : title,
            genre:genre,
            release_date : releaseDate,
            rating: Number(rating),
        };
        console.log(newSong);
        try{ 
            const response = await fetch('http://localhost:3000/songs', {
                method : 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(newSong),                        
            })
            if(!response.ok){
                throw new Error(`Szerverhiba: ${response.status}`);
            }
            setTitle('');
            setGenre('');
            setReleaseDate('');
            setRating('');
        }
        catch(error){
            setError(error.message);
        }
       
    };

    return (
        <div className="container">
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Webshop</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" href="/kezdolap">Kezdőlap</a>
      </li>
      <li className="nav-item active">
        <a className="nav-link" href="/songs-felvetel">Felvétel</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/tabletek-torles">Törlés</a>
      </li>
    </ul>
  </div>
</nav>
            <h2 className="mb-4 text-center">Új tablet felvétele</h2>
            <form onSubmit={handleSubmit} className="shadow p-4 rounded border">
                <div className="mb-3">
                    <label htmlFor="os" className="form-label">Title:</label>
                    <input
                        id="title"
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="genre" className="form-label">Genre:</label>
                    <input
                        id="genre"
                        type="text"
                        className="form-control"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="Release Date" className="form-label">Release Date:</label>
                    <input
                        id="release_date"
                        type="text"
                        className="form-control"
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="rating" className="form-label">Rating:</label>
                    <input
                        id="rating"
                        type="number"
                        className="form-control"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        required
                        min={1}
                        max={5}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-4">Song felvétele</button>
            </form>
        </div>
    );
}
