import express from 'express';
import dotenv from 'dotenv';
import pkg from 'pg'; 
const { Client } = pkg;


dotenv.config();


const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, 
});

client.connect()
  .then(() => console.log("Conectado a PostgreSQL"))
  .catch(err => console.log("Error al conectar a PostgreSQL", err));


const app = express();



app.get('/api', (req, res) => {
    res.send("API funcionando");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
