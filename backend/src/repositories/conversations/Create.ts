import { QueryResult } from "pg";
import pool from "../../config/database";
import { ConversationPrivateSettings, ConversationPublicSettings, CreateConversationDTO } from "../../types/conversation";

export async function Create (data: CreateConversationDTO) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        let conversationResult: QueryResult<any>;

        if ('name' in data) {
            const settings: ConversationPrivateSettings = {
                messages: {
                    disappearingMessagesEnabled: false,
                    disappearingMessagesDuration: null,
                }
            }

            conversationResult = await client.query('INSERT INTO CONVERSATIONS (SETTINGS) VALUES ($1) RETURNING id', [settings])
        } else {
            const settings: ConversationPublicSettings = {
                permissions: {
                    whoCanSendMessages: 'everyone',
                    whoCanAddMembers: 'everyone',
                    whoCanEditGroupConfig: 'admins',
                    whoCanPinMessages: 'everyone',
                },
                messages: {
                    disappearingMessagesEnabled: false,
                    disappearingMessagesDuration: null,
                }
            }

            conversationResult = await client.query('INSERT INTO CONVERSATIONS (SETTINGS) VALUES ($1) RETURNING id', [settings])
        }

        const conversationId = conversationResult.rows[0].id;

        const participantResult = await client.query(`INSERT INTO CONVERSATION_PARTICIPANTS (USER_ID, CONVERSATION_ID, ROLE) VALUES ($1, $2, 'super_admin') RETURNING id`, [data.createdBy, conversationId]);

        const participantId = participantResult.rows[0].id;

        await client.query(`UPDATE CONVERSATIONS SET CREATED_BY = $1 WHERE ID = $2`, [participantId, conversationId]);
        
        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}