import express from "express";
import cors from 'cors';
import mysql from 'mysql2';

const app = express();
const port = 3000;

app.use(cors())

app.use(express.json());

const pool =  mysql.createPool({
    user: 'root',
    host: 'localhost',
    database: 'webbolt',
    password: '',
}).promise();

// GET /tablets - Retrieve all tablets
app.get('/tablets', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;
        const offset = (page - 1) * limit;

        const [rows] = await pool.query('SELECT * FROM ipad_specs LIMIT ? OFFSET ?', [limit, offset]);

        const [countResult] = await pool.query('SELECT COUNT(*) AS total FROM ipad_specs');
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

app.get('/tablets/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM ipad_specs WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).send('Tablet not found');
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving tablet');
    }
});

// POST /tablets - Add a new tablet
app.post('/tablets', async (req, res) => {
    const { os, processor_speed, processor_cores, display_size, display_resolution, ram_size, description, price } = req.body;
    try {
        // Insert data into the database
        const insertResult = await pool.query(
            'INSERT INTO ipad_specs (os, processor_speed, processor_cores, display_size, display_resolution, ram_size, description, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [os, processor_speed, processor_cores, display_size, display_resolution, ram_size, description, price]
        );

        // Retrieve the inserted row
        const [newTablet] = await pool.query('SELECT * FROM ipad_specs WHERE id = LAST_INSERT_ID()');

        res.status(201).json(newTablet[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding tablet');
    }
});


// DELETE /tablets/:id - Delete a specific tablet by ID
app.delete('/tablets/:id', async (req, res) => {
    try {
        // First, fetch the tablet to verify it exists and get its details
        const [tablet] = await pool.query('SELECT * FROM ipad_specs WHERE id = ?', [req.params.id]);
        if (tablet.length === 0) return res.status(404).send('Tablet not found');

        // Then, delete the tablet
        await pool.query('DELETE FROM ipad_specs WHERE id = ?', [req.params.id]);

        // Return the deleted tablet's details
        res.json(tablet[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting tablet');
    }
});


// PUT /tablets/:id - Update a specific tablet by ID
app.put('/tablets/:id', async (req, res) => {
    const { os, processor_speed, processor_cores, display_size, display_resolution, ram_size, description, price } = req.body;
    try {
        const result = await pool.query(
            'UPDATE ipad_specs SET os = $1, processor_speed = $2, processor_cores = $3, display_size = $4, display_resolution = $5, ram_size = $6, description = $7, price = $8 WHERE id = $9 RETURNING *',
            [os, processor_speed, processor_cores, display_size, display_resolution, ram_size, description, price, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).send('Tablet not found');
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating tablet');
    }
});

app.listen(port);
