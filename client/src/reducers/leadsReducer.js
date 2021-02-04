export const CREATE_LEAD = 'LEADS/CREATE_LEAD';
export const FETCH_LEADS = 'LEADS/FETCH_LEADS';

const initialState = {
    leads: []
}

export const leadsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_LEAD:
            return { ...state, leads: [...state.leads, action.payload] }
        case FETCH_LEADS:
            return { ...state, leads: action.payload }
        default:
            return state;
    };

};
