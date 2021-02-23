import { useEffect, useState, useCallback } from 'react';
import { useRequest } from '../hooks/request.hook';
import Layout from './layout/Layout';

const Leads = () => {
    const [leads, setLeads] = useState([]),
        { request } = useRequest();

    const getLeads = useCallback(async () => {

        const { res } = await request('/api/leads');

        res && setLeads(res);
    }, [request, leads, setLeads]);

    const handleRemove = async id => {
        const { res } = await request(`/api/leads/${id}`, 'DELETE');

        res && setLeads(res);
    }

    useEffect(() => {
        getLeads();
    }, []);

    return <Layout>
        <h3>Лиды</h3>
        <div>
            {leads?.map(({ _id: id, name, phone }) => {
                return <div key={id}>
                    <div>{name}</div>
                    <div>{phone}</div>
                    <div onClick={() => handleRemove(id)}>Удалить</div>
                    <br />
                </div>
            })}
        </div>
    </Layout>;
};

export default Leads;
