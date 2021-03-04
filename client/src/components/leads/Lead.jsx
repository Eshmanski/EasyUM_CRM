import { useEffect, useState, useCallback } from 'react';
import { useRequest } from '../../hooks/request.hook';
import { useHistory, useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import T from '../../ui-components/text/T';
import s from './leads.module.css';

const Lead = () => {
    const [lead, setLead] = useState([]),
        { name, phone, status, createdAt } = lead,
        { request } = useRequest(),
        { id } = useParams(),
        history = useHistory();

    const getLead = useCallback(async () => {
        const { res } = await request(`/api/leads/${id}`);

        res && setLead(res);
    }, [request, lead, setLead]);

    const handleRemove = useCallback(async () => {
        const { res } = await request(`/api/leads/${id}`, 'DELETE');

        res && history.push('/leads/');
    }, [id]);

    const handleEdit = useCallback (() => history.push(`/leads/${id}/edit`), [id]);

    useEffect(() => {
        getLead();
    }, []);

    return <Layout>
        <h3>Карточка Лида</h3>

        <div className={s.lead}>
            <div className={s.remove} onClick={handleEdit}>Изменить</div>
            <div>Имя: {name}</div>
            <div>Телефон: {phone}</div>
            <div>Статус: <T id={status && `lead.${status}`} /></div>
            <div>Дата создания: {createdAt}</div>
            <div className={s.remove} onClick={handleRemove}>Удалить</div>
        </div>
    </Layout>;
};

export default Lead;
