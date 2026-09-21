import pool from "../../config/database";

export async function Create (userId: number) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const conversationResult = await client.query('INSERT INTO CONVERSATIONS DEFAULT VALUES RETURNING id')

        const conversationId = conversationResult.rows[0].id;

        const participantResult = await client.query(`INSERT INTO CONVERSATION_PARTICIPANTS (USER_ID, CONVERSATION_ID, ROLE) VALUES ($1, $2, 'super_admin') RETURNING id`, [userId, conversationId]);

        const participantId = participantResult.rows[0].id;

        await client.query(`UPDATE CONVERSATIONS SET CREATED_BY = $1 WHERE ID = $2`, [participantId, conversationId]);
        
        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }

    return 
}