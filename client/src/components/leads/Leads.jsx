import { useEffect, useState, useCallback } from 'react';
import { statuses } from '../../constants';
import { useRequest } from '../../hooks/request.hook';
import { useHistory } from 'react-router-dom';
import Layout from '../layout/Layout';
import s from './leads.module.css';


const Leads = () => {
    const [leads, setLeads] = useState([]),
        { request } = useRequest(),
        history = useHistory();

    const getLeads = useCallback(async () => {

        const { res } = await request('/api/leads');

        res && setLeads(res);
    }, [request, leads, setLeads]);

    const handleRemove = useCallback(async id => {
        const { res } = await request(`/api/leads/${id}`, 'DELETE');

        res && setLeads(res);
    }, []);

    const handleOpenLead = useCallback(id => {
        history.push(`/leads/${id}`);
    }, []);

    useEffect(() => {
        getLeads();
    }, []);

    return <Layout>
        <h3>Лиды</h3>
        <div className={s.board}>
            {statuses.map(({ value, title }) => <div className={s.list} key={value}>
                <div className={s.title}>
                    {title}
                </div>

                {leads?.filter(({ status }) => status === value).map(({ _id: id, name, phone }) => {
                    return <div key={id} className={s.card} onClick={() => handleOpenLead(id)}>
                        <div>{name}</div>
                        <div>{phone}</div>
                    </div>
                })}
                </div>
            )}

        </div>
    </Layout>;
};

export default Leads;
