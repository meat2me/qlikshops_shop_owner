import * as StateActions from '../actions/store.action';

export type Action = StateActions.All;

export interface ConfigurationState {
    configuration: any;
}

export interface State {
    store: any;
}

export const initialState: State = {
    store: null
};

export function reducer(state = initialState, action: StateActions.All): any {
    switch (action.type) {
        case StateActions.GETSTORE_SUCCESS:
            return {
                ...state,
                store: action.payload.store
            };
        case StateActions.GETSTORE_FAILURE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
