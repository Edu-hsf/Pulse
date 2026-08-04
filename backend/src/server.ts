import app from "./app";
import pool from "./config/database";

const PORT = process.env.DB_PORT || 3000;

async function Start () {
    try {
        await pool.query('SELECT NOW()');

        console.log('Conectado ao banco.');

        app.listen(PORT, () => {
            console.log(`Servidor iniciado na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao conectar ao PostgreSQL');
        console.error(error);
    }
}

Start();