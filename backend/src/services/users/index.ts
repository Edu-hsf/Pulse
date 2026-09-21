import * as update from './Update';
import * as Delete from './Delete';
import * as get from './Get';

export const UsersService = {
    ...update,
    ...Delete,
    ...get
}