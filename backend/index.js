const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
app.use(bodyParser.json());

// Adatbázis kapcsolat
const db = mysql.createPool({
  host: 'localhost',
  user: 'root', // Az adatbázis felhasználója
  password: '', // Az adatbázis jelszava
  database: 'music', // Az adatbázis neve
});

// Teszt endpoint
app.get('/', (req, res) => {
  res.send('Songs API is running!');
});

/// *** CRUD ÉS MŰVELETEK *** ///

// ** 1. Listázás (Lapozás) **
app.get('/songs', async (req, res) => {
  const { skip = 0, take = 10 } = req.query;
  try {
    const [rows] = await db.query('SELECT * FROM Songs LIMIT ? OFFSET ?', [parseInt(take), parseInt(skip)]);
    res.json(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ** 2. Új dal felvétele **
app.post('/songs', async (req, res) => {
  const { title, artist_id, album_id, genre, release_date, rating } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO Songs (title, artist_id, album_id, genre, release_date, rating) VALUES (?, ?, ?, ?, ?, ?)',
      [title, artist_id, album_id, genre, release_date, rating || 0]
    );
    res.json({ id: result.insertId, message: 'Song added successfully!' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ** 3. Dal törlése **
app.delete('/songs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM Songs WHERE id = ?', [id]);
    res.json({ message: 'Song deleted successfully!' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ** 4. Teljes módosítás **
app.put('/songs/:id', async (req, res) => {
  const { id } = req.params;
  const { title, artist_id, album_id, genre, release_date, rating } = req.body;
  try {
    await db.query(
      'UPDATE Songs SET title = ?, artist_id = ?, album_id = ?, genre = ?, release_date = ?, rating = ? WHERE id = ?',
      [title, artist_id, album_id, genre, release_date, rating, id]
    );
    res.json({ message: 'Song updated successfully!' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ** 5. Keresés cím alapján **
app.get('/songs/search', async (req, res) => {
  const { title } = req.query;
  try {
    const [rows] = await db.query('SELECT * FROM Songs WHERE title LIKE ?', [`%${title}%`]);
    res.json(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ** 6. Rendezés **
app.get('/songs/sort', async (req, res) => {
  const { field = 'title', order = 'ASC' } = req.query;
  try {
    const [rows] = await db.query(`SELECT * FROM Songs ORDER BY ${field} ${order}`);
    res.json(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ** 7. Toggle favorite státusz **
app.patch('/songs/:id/toggle-favorite', async (req, res) => {
  const { id } = req.params;
  try {
    const [song] = await db.query('SELECT is_favorite FROM Songs WHERE id = ?', [id]);
    if (!song.length) return res.status(404).send('Song not found!');
    const is_favorite = !song[0].is_favorite;
    await db.query('UPDATE Songs SET is_favorite = ? WHERE id = ?', [is_favorite, id]);
    res.json({ message: 'Favorite status toggled!', is_favorite });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ** 8. Értéknövelés vagy csökkentés **
app.patch('/songs/:id/increment-rating', async (req, res) => {
  const { id } = req.params;
  const { value } = req.query;
  try {
    await db.query('UPDATE Songs SET rating = rating + ? WHERE id = ?', [parseFloat(value), id]);
    res.json({ message: 'Rating updated!' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/// *** SERVER START *** ///
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
