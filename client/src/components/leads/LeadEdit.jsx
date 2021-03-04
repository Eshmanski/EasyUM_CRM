import { useEffect, useState, useCallback } from 'react';
import { useRequest } from '../../hooks/request.hook';
import { useHistory, useParams } from 'react-router-dom';
import Input from '../../ui-components/input/Input';
import Button from '../../ui-components/button/Button';
import Layout from '../layout/Layout';
import T from '../../ui-components/text/T';
import s from './leads.module.css';

const Lead = () => {
    const [lead, setLead] = useState([]),
        { name, phone, status, createdAt } = lead,
        { request } = useRequest(),
        { id } = useParams(),
        history = useHistory();

    const [fields, update] = useState({
        name,
        phone,
        status
    });

    const handleChange = useCallback(({ target: { name, value } }) => {
        update({ ...fields, [name]: value })
    }, [fields]);

    const getLead = useCallback(async () => {
        const { res } = await request(`/api/leads/${id}`);

        res && setLead(res);
        res && update(res);
    }, [lead]);

    const handleRemove = useCallback(async () => {
        const { res } = await request(`/api/leads/${id}`, 'DELETE');

        res && history.push('/leads/');
    }, [id]);

    useEffect(() => {
        getLead();
    }, []);

    return <Layout>
        <h3>Редактирование Лида</h3>

        <div className={s.lead}>
            <div>Имя:</div>
            <div>
                <Input value={fields.name} name='name' onChange={handleChange} />
            </div>
            <div>Телефон:</div>
            <div>
                <Input value={fields.phone} name='phone' onChange={handleChange} />
            </div>
            <div>Статус: <T id={status && `lead.${status}`} /></div>
            <div>Дата создания: {createdAt}</div>
            <div className={s.remove} onClick={handleRemove}>Удалить</div>
        </div>
    </Layout>;
};

export default Lead;
