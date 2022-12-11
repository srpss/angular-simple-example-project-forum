

import {Action, createReducer, on} from '@ngrx/store'
import { logged, notLogged } from './logged.actions';


export const intialLog: boolean = false;

export const toggle = createReducer(
    intialLog,
    on(logged, () => true
    ),
    on(notLogged, () => false)
    );

    export function loggedReducer(state :any, action :any){
        return toggle(state,action)
    }