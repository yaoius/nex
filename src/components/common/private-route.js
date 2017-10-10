import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';

import FirebaseService from '../../services/firebase-service';

class PrivateRoute extends Component {
    render() {
        const { component: RouteComponent, ...rest } = this.props;
        const isAuthenticated = FirebaseService.isAuthenticated();

        return (
            <Route
                {...rest}
                render={(props) =>
                    isAuthenticated ?
                        <RouteComponent {...props}/> :
                        <Redirect to={{
                            pathname: '/',
                            state: {from: props.location}
                        }}/>
                }
            />
        );
    }
}

export default PrivateRoute;