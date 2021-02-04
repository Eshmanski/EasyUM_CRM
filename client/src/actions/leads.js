import { CREATE_LEAD, FETCH_LEADS } from '../reducers/leadsReducer';

export const createLead = lead => {
    return {
        type: CREATE_LEAD,
        payload: lead
    }
};


export const fetchLeads = () => {
    return async dispatch => {
        const { leads } = await (await fetch('/api/leads')).json();

        dispatch({ type: FETCH_LEADS, payload: leads });
    }
}
