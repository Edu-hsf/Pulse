import * as Create from './Create';
import * as Update from './Update';
import * as Delete from './Delete';
import * as Get from './Get';

export const ConversationsRepository = {
    ...Create,
    ...Update,
    ...Delete,
    ...Get
}