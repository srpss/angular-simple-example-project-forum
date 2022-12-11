import { Action ,props, createAction} from '@ngrx/store';


export const logged = createAction('[Make true] true')
export const notLogged = createAction('[Make false] false')