import { useEffect, useState } from "react"

interface Song {
    id: number;
    title: string;
    genre: string;
    release_date: string;
    rating : number;
}

export default function Kezdolap(){
    const [songs, setSongs] = useState<Song[]>([]);
    const [error, setError] = useState(null);
    const [errorServer, setErrorServer] = useState("");
    const [loading, setLoading] = useState(true);
    const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);

    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        fetch(`http://localhost:3000/songs?page=${currentPage}&limit=${itemsPerPage}`)
            .then((response) => { 
                if (response.status === 404){
                    setErrorServer('A kért erőforrás nem található (404)!');
                    //throw new Error('A kért erőforrás nem található (404)!');
                }
                if (!response.ok) {
                    setErrorServer(`Server responded with status ${response.status}`);
                    //throw new Error(`Server responded with status ${response.status}`);
                }
                return response.json() 
            })
            .then((data) => {
                setSongs(data.data);
                setTotalPages(data.totalPages);
                setFilteredSongs(data.data);
                setLoading(false);
                //console.log(data); 
            })
            .catch((error) => { 
                console.log(error.message) 
                setError(error.message);
            })
    }, [currentPage, itemsPerPage])
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = songs.filter(
            (song) =>
                song.title.toLowerCase().includes(term) ||
                song.genre.includes(term) ||
                song.release_date.includes(term) ||
                song.rating.toString().includes(term)
        );
        setFilteredSongs(filtered);
    };
    if(errorServer){
        return <p>{errorServer}</p>
    }
    if(loading) { 
        return <p>Loading...</p>
    }
    if(error){
        return <p>Hiba történt: {error}.</p>
    }
    return <>
    <div className="container">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Webshop</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <a className="nav-link" href="/kezdolap">Kezdőlap</a>
      </li>
     
      <li className="nav-item">
        <a className="nav-link" href="/song-felvetel">Felvétel</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/tabletek-torles">Törlés</a>
      </li>
    </ul>
  </div>
</nav>
        <div className="jumbotron my-4 text-center">
            <h1 className="display-4">Zenék</h1>
            <hr className="my-3" />
        </div>
        <div className='mb-2 d-flex justify-content-center'>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        style={{
                            width : "60vw",
                            fontFamily: "monospace"
                        }}
                        placeholder="Keresés"
                    />
            </div>
        <table className="table table-hover mt-4">
            <thead className="thead-dark text-center">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Release Date</th>
                    <th scope="col">Rating</th>
                </tr>
            </thead>
            <tbody>
                {filteredSongs.map((song, index) => (
                    <tr key={index}>
                        <th scope="row" className="text-center">{song.id}</th>
                        <td className="text-center">{song.title}</td>
                        <td className="text-center">{song.genre}</td>
                        <td className="text-center">{song.release_date.split('T')[0]}</td>
                        <td className="text-center">{song.rating}</td>
                        <td className="text-center"></td>
                    </tr>
                ))}
            </tbody>
           
        </table>
        <div className="d-flex justify-content-end mb-4">
            <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="form-control w-auto"
            >
                <option value={3}>3</option>
                <option value={2}>2</option>
                <option value={5}>5</option>
            </select>
        </div>
            <div className="d-flex justify-content-center mt-4">
                <button
                    className="btn btn-primary mx-2"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                    Previous
                </button>
                <span className="align-self-center">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="btn btn-primary mx-2"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                >
                    Next
                </button>
            </div>
     </div>
</>

}