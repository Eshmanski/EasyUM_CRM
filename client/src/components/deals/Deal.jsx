import { useEffect, useState, useCallback } from 'react';
import { useRequest } from '../../hooks/request.hook';
import { useHistory, useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import Button from '../../ui-components/button/Button';
import T from '../../ui-components/text/T';
import s from './deals.module.css';

const Deal = () => {
    const [deal, update] = useState([]),
        { name, phone, status, createdAt, lead } = deal,
        { request } = useRequest(),
        { id } = useParams(),
        history = useHistory();

    const getLead = useCallback(async () => {
        const { res } = await request(`/api/deals/${id}`);

        res && update(res);
    }, [request, deal]);

    const handleRemove = useCallback(async () => {
        const { res } = await request(`/api/deals/${id}`, 'DELETE');

        res && history.push('/deals/');
    }, [id]);

    const handleEdit = useCallback (() => history.push(`/deals/${id}/edit`), [id]);

    const handleOpenLead = useCallback(() => {
        history.push(`/leads/${lead}`);
    });

    useEffect(() => {
        getLead();
    }, []);

    return <Layout>
        <h3>Карточка Сделки</h3>

        <div className={s.lead}>
            <div className={s.remove} onClick={handleEdit}>Изменить</div>
            <div>Имя: {name}</div>
            <div>Телефон: {phone}</div>
            <div>Статус: <T id={status && `lead.${status}`} /></div>
            <div>Дата создания: {createdAt}</div>
            <div className={s.remove} onClick={handleRemove}>Удалить</div>

            <Button onClick={handleOpenLead}>Открыть лид</Button>
        </div>
    </Layout>;
};

export default Deal;
