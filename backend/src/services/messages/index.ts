import * as create from './Create';
import * as update from './Update';
import * as get from './Get';

export const MessagesService = {
    ...create,
    ...update,
    ...get
}