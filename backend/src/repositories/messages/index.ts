import * as Create from './Create';
import * as Update from './Update';
import * as Get from './Get';

export const MessagesRepository = {
    ...Create,
    ...Update,
    ...Get
}