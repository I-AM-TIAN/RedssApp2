import express from 'express';
import mysql from 'mysql';
const app = express();
import cors from 'cors';



// Configurar la conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'redssapp',
    port: 3308
});

app.use(cors());
app.use(express.static('./'));

// Conectar a la base de datos MySQL
connection.connect(err => {
    if (err) {
        console.error('Error de conexión a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conexión a la base de datos MySQL establecida como id ' + connection.threadId);
});

// Endpoint para obtener datos de empresas
app.get('/empresas', (req, res) => {
    const sql = 'SELECT * FROM organizacion';
    connection.query(sql, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.get('/empresas/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM organizacion WHERE id_organizacion =?`;
    connection.query(sql, [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error en la consulta de la base de datos' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: 'Empresa no encontrada' });
        } else {
            res.json(results[0]);
        }
    });
});
// Puerto en el que el servidor escuchará las solicitudes
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Node.js iniciado en el puerto ${PORT}`);
});



