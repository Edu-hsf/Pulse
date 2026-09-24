import * as Create from './Create';
import * as Update from './Update';
import * as Get from './Get';

export const ConversationParticipantsRepository = {
    ...Create,
    ...Update,
    ...Get
}