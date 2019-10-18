import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import 'gestalt/dist/gestalt.css';
import App from './components/App';
import Navbar from "./components/Navbar";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Checkout from "./components/Checkout";
import Brews from "./components/Brews";
import { getToken } from "./utils/index";
import registerServiceWorker from "./registerServiceWorker";

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            getToken() !== null ?
                <Component {...props} /> : <Redirect to={{
                    pathname: "/signin",
                    state: { from: props.location }
                }} />
        )} />
    )
}


const Root = () => (
    <Router>
        <React.Fragment>
            <Navbar />
            <Switch>
                <Route component={App} exact path="/" />
                <Route component={Signin} exact path="/signin" />
                <Route component={Signup} exact path="/signup" />
                <PrivateRoute component={Checkout} exact path="/checkout" />
                <Route component={Brews} path="/:id" />
            </Switch>
        </React.Fragment>
    </Router>
)
ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
