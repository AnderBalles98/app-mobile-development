import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Observable} from "rxjs";
import {Action} from "@ngrx/store";
import {map} from "rxjs/internal/operators";



// ESTADO
export class Noticia {
    constructor(public titulo: string) {
    }
}

export interface NoticiasState {
    items: Noticia[];
    sugerida: Noticia;
    readNow: Noticia[];
}

export function initilizeNoticiasState () {
    return {
        items: [],
        sugerida: null,
        readNow: []
    }
}

// ACTIONS

export enum NoticiasActionTypes {
    INIT_MY_DATA = "[Noticias] Init My Data",
    NUEVA_NOTICIA = "[Noticias] Nueva",
    SUGERIR_NOTICIA = "[Noticias] Sugerir",
    ADD_TO_READ_NOW = "[Noticias] Add To Read Now"
}

export class InitMyDataAction implements Action {
    type = NoticiasActionTypes.INIT_MY_DATA;
    constructor(public noticias: Array<string>) {
    }
}

export class NuevaNoticiaAction implements Action {
    type = NoticiasActionTypes.NUEVA_NOTICIA;
    constructor(public noticia: Noticia) {
    }
}

export class SugerirNoticiaAction implements Action {
    type = NoticiasActionTypes.SUGERIR_NOTICIA;
    constructor(public noticia: Noticia) {
    }
}

export class AddToReadNowAction implements Action {
    type = NoticiasActionTypes.ADD_TO_READ_NOW;
    constructor(public noticia: Noticia) {
    }
}

export type NoticiasActions = InitMyDataAction | NuevaNoticiaAction | SugerirNoticiaAction;

export function reducersNoticias(state: NoticiasState, action: NoticiasActions): NoticiasState {
    switch (action.type) {
        case NoticiasActionTypes.INIT_MY_DATA: {
            return {
              ...state,
              items: (action as InitMyDataAction).noticias.map( (noticia) => {
                  return new Noticia(noticia);
              })
            };
        }
        case NoticiasActionTypes.SUGERIR_NOTICIA: {
            return {
              ...state,
              sugerida: (action as SugerirNoticiaAction).noticia
            };
        }
        case NoticiasActionTypes.NUEVA_NOTICIA: {
            return {
              ...state,
              items: [...state.items, (action as NuevaNoticiaAction).noticia]
            };
        }
        case NoticiasActionTypes.ADD_TO_READ_NOW: {
            return {
                ...state,
                readNow: [...state.readNow, (action as AddToReadNowAction).noticia]
            }
        }
    }

    return state;
}


// EFFECTS
@Injectable()
export class NoticiasEffects {
    @Effect() nuevoAgregado$: Observable<Action> = this.actions$.pipe(
        ofType(NoticiasActionTypes.NUEVA_NOTICIA),
        map((action: NuevaNoticiaAction) => {
            return new SugerirNoticiaAction(action.noticia);
        }));

    constructor(private actions$: Actions) {
    }
}
