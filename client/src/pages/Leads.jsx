import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeads } from '../actions/leads';
import Layout from './layout/Layout';

const getLeads = ({ leads: { leads } }) => leads;

const Leads = () => {
    const dispatch = useDispatch(),
        leads = useSelector(getLeads);

    const loadLeads = useCallback(async () => {
        await dispatch(fetchLeads());
    }, []);

    useEffect(() => {
        loadLeads();
    }, [])

    return <Layout>
        <h3>Лиды</h3>
        <div>
            {leads?.map(({ id, name, phone }) => {
                return <div key={id}>
                    <div>{id} - {name}</div>
                    <div>{phone}</div>
                    <br />
                </div>
            })}
        </div>
    </Layout>;
};

export default Leads;
