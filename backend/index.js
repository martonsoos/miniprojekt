import express from "express";
import cors from 'cors';
import mysql from 'mysql2';

const app = express();
const port = 3000;

app.use(cors())

app.use(express.json());

// Adatbázis kapcsolat
const db = mysql.createPool({
  host: 'localhost',
  user: 'root', // Az adatbázis felhasználója
  password: '', // Az adatbázis jelszava
  database: 'music', // Az adatbázis neve
}).promise();

// Teszt endpoint
app.get('/', (req, res) => {
  res.send('Songs API is running!');
});

/// *** CRUD ÉS MŰVELETEK *** ///

// ** 1. Listázás (Lapozás) **
app.get('/songs', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const [rows] = await db.query('SELECT * FROM songs LIMIT ? OFFSET ?', [limit, offset]);

    const [countResult] = await db.query('SELECT COUNT(*) AS total FROM songs');
    const total = countResult[0].total;

    res.status(200).json({
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        data: rows,
    });
} catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving tablets');
}
});

// ** 2. Új dal felvétele **
app.post('/songs', async (req, res) => {
  const { title, genre, release_date, rating } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO Songs (title, genre, release_date, rating) VALUES (?, ?, ?, ?)',
      [title, genre, release_date, rating || 0]
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

// ** 7. Toggle láthatóság **
app.patch('/songs/:id', async (req, res) => {
  const songId = parseInt(req.params.id);
  const { isVisible } = req.body;

  if (typeof isVisible !== 'boolean') {
      return res.status(400).json({ error: 'isVisible must be a boolean value' });
  }

  try {
      const [result] = await db.query(
          'UPDATE Songs SET isVisible = ? WHERE Id = ?',
          [isVisible ? 1 : 0, songId]
      );

      if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Song not found' });
      }

      res.status(200).json({ songId, isVisible });
  } catch (error) {
      console.error(`Error updating song visibility: ${error}`);
      res.status(500).json({ error: 'Internal Server Error' });
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
