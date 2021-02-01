import { useEffect, useState, useCallback } from 'react';
import { useRequest } from '../hooks/request.hook';
import Layout from './layout/Layout';

const Leads = () => {
    const [leads, setLeads] = useState([]),
        { request } = useRequest();

    const getLeads = useCallback(async () => {

        const { res } = await request('/api/leads');

        res && setLeads(res.leads);
    }, [request, leads, setLeads]);

    useEffect(() => {
        getLeads();
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
