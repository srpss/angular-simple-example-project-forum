
import { IBoards } from '../repos';
import {createReducer, on} from '@ngrx/store'
import { addBoard, removeBoard } from './boards.actions';

export const intialBoardEntries: IBoards[] = [];

export const boardReducer = createReducer(
    intialBoardEntries,
    on(addBoard, (entries, board) =>{
        const entriesClone: IBoards[] = JSON.parse(JSON.stringify(entries));
        entriesClone.push(board);
        return entriesClone;
    }),
    on(removeBoard, _ => [])
    );