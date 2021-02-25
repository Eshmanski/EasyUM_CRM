import { useEffect, useState, useCallback } from 'react';
import { useRequest } from '../hooks/request.hook';
import { useParams } from 'react-router-dom';
import Layout from './layout/Layout';

const Lead = () => {
    const [lead, setLead] = useState([]),
        { name, phone, status, createdAt } = lead,
        { request } = useRequest(),
        { id } = useParams();

    const getLead = useCallback(async () => {
        const { res } = await request(`/api/leads/${id}`);

        res && setLead(res);
    }, [request, lead, setLead]);

    // const handleRemove = async id => {
    //     const { res } = await request(`/api/leads/${id}`, 'DELETE');
    //
    //     res && setLeads(res);
    // }

    useEffect(() => {
        getLead();
    }, []);

    return <Layout>
        <h3>Карточка Лида</h3>

        <div>
            <div>Имя: {name}</div>
            <div>Телефон: {phone}</div>
            <div>Статус: {status}</div>
            <div>Дата создания: {createdAt}</div>
            {/*<div onClick={() => handleRemove(id)}>Удалить</div>*/}
            <br />
        </div>
    </Layout>;
};

export default Lead;
