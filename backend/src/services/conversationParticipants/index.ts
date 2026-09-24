import * as create from './Create';
import * as update from './Update';
import * as get from './Get';

export const ConversationParticipantsService = {
    ...create,
    ...update,
    ...get
}