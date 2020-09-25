import { createAction, props } from '@ngrx/store';
import { IUser } from '../models/user.model';

export const refreshUsersRequest = createAction('[User] Refresh Users Request');
export const getUsersRequest = createAction('[User] Get Users Request', props<{filter: string }>());
export const refreshUsersDone = createAction('[User] Refresh User Done', props<{users: IUser[] }>());
export const setCurrentUserRequest = createAction('[User] Set Current User Done', props<{user: IUser}>());
export const appendUserRequest = createAction('[User] Append User Request', props<{user: IUser }>());
export const replaceUserRequest = createAction('[User] Replace User Request', props<{user: IUser }>());
export const deleteUserRequest = createAction('[User] Delete User Request', props<{userId: number}>());
export const editUser = createAction('[User] Edit User', props<{userId: number}>());
export const cancelUser = createAction('[User] Cancel User');

export const getUserScannedRequest = createAction('[User] Get User Scanned Request', props<{barcode: string }>());
export const refreshScannedUserDone = createAction('[User] Get User Scanned Done', props<{ user: IUser }>());
