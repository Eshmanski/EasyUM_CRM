import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from '../components/auth/Auth';
import Register from '../components/auth/Register';
import Leads from '../components/leads/Leads';
import Lead from '../components/leads/Lead';
import LeadEdit from '../components/leads/LeadEdit';
import Home from './Home';

const Pages = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Switch>
            <Route path='/' exact>
                <Home />
            </Route>

            <Route path='/leads/:id/edit' exact>
                <LeadEdit />
            </Route>

            <Route path='/leads/:id' exact>
                <Lead />
            </Route>

            <Route path='/leads' exact>
                <Leads />
            </Route>

            <Redirect to='/' />
        </Switch>
    }

    return <Switch>
        <Route path='/auth' exact>
            <Auth />
        </Route>

        <Route path='/register' exact>
            <Register />
        </Route>

        <Redirect to='/auth' />
    </Switch>
}

export default Pages;
