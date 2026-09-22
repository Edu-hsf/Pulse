import { QueryResult } from "pg";
import pool from "../../config/database";
import { ConversationPrivateSettings, ConversationPublicSettings, CreateConversationDTO } from "../../types/conversation";

export async function Create (data: CreateConversationDTO) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        let conversationResult: QueryResult<any>;

        conversationResult = await client.query('INSERT INTO CONVERSATIONS DEFAULT VALUES RETURNING id')
        const conversationId = conversationResult.rows[0].id;

        if ('name' in data) {
            const settings: ConversationPrivateSettings = {
                messages: {
                    disappearingMessagesEnabled: false,
                    disappearingMessagesDuration: null,
                }
            }

            await client.query('INSERT INTO CONVERSATION_GROUPS (CONVERSATION_ID, NAME, DESCRIPTION, AVATAR, SETTINGS) VALUES ($1, $2, $3, $4, $5)', [conversationId, data.name, data.description, data.avatar, settings])
            
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

            await client.query('INSERT INTO CONVERSATION_PRIVATES (CONVERSATION_ID, SETTINGS) VALUES ($1, $2)', [conversationId, settings])
        }

        const participantOwnerResult = await client.query(`INSERT INTO CONVERSATION_PARTICIPANTS (USER_ID, CONVERSATION_ID, ROLE) VALUES ($1, $2, 'super_admin') RETURNING id`, [data.createdBy, conversationId]);

        const participantOwnerId = participantOwnerResult.rows[0].id;

        await client.query(`UPDATE CONVERSATIONS SET CREATED_BY = $1 WHERE ID = $2`, [participantOwnerId, conversationId]);

        if ("participantsUserId" in data) {
            for (const userId in data.participantsUserId) {
                await client.query(`INSERT INTO CONVERSATION_PARTICIPANTS (USER_ID, CONVERSATION_ID, ROLE) VALUES ($1, $2, 'member') RETURNING id`, [userId, conversationId]);
            }
        } else {
            await client.query(`INSERT INTO CONVERSATION_PARTICIPANTS (USER_ID, CONVERSATION_ID, ROLE) VALUES ($1, $2, 'member') RETURNING id`, [data.participantUserId, conversationId]);
        }
        
        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}