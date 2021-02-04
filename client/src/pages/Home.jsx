import Layout from './layout/Layout';
import { connect } from 'react-redux';
import { createLead } from '../actions/leads';

const Home = ({ leads, createLead }) => {
    return <Layout>
        <div>Домашняя страница</div>

        <button
            onClick={() => createLead({ id: leads.length, name: 'Name'})}
        >
            Добавить
        </button>

        { leads?.map(({ id, name, phone }) => <div key={id}>
            {id} {name} {phone}
        </div>)}
    </Layout>;
};

const mapStateToProps = ({ leads }) => leads;

const mapDispatchToProps = {
    createLead
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);


