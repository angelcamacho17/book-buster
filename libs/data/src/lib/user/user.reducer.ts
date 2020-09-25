import { createReducer, on } from '@ngrx/store';
import { refreshUsersDone, editUser, cancelUser, refreshScannedUserDone } from './user.actions';
import { IUserState, IUser, IUsersState } from '../models/user.model';

export const initialState: IUsersState = {
  users: []
};

export const initialUserState: IUserState = {
  user: null
};

export const usersReducer = createReducer<IUser[]>(initialState.users,
  on(refreshUsersDone, (_, action) => action.users),
);

export const userReducer = createReducer<IUser>(initialUserState.user,
  on(refreshScannedUserDone, (_, action) => action.user)
);


