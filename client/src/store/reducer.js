import * as actions from './action';
//import defaultState from './defaultState';

const initialState = {
    suggestions: [],
    tweets: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.LOAD_TWEETS:
            return Object.assign({}, state, {
                tweets: [
                    ...action.payload
                ]
            })
        default:
            return state;
    }
};

export default reducer;