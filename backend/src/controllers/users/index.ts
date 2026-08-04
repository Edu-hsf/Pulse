import * as create from './Create';
import * as update from './Update';
import * as Delete from './Delete';
import * as get from './Get';

export const UsersController = {
    ...create,
    ...update,
    ...Delete,
    ...get
}