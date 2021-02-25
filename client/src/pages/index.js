import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from './auth/Auth';
import Register from './auth/Register';
import Leads from './Leads';
import Lead from './Lead';
import Home from './Home';

const Pages = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Switch>
            <Route path='/' exact>
                <Home />
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
