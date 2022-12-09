import { Action ,props, createAction} from '@ngrx/store';
import { IBoards } from '../repos';


export const addBoard = createAction('Add Board', props<IBoards>())
export const removeBoard = createAction('Remove Board')