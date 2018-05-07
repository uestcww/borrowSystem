import React from 'react';
import { Router, Route, hashHistory} from 'react-router';
import HomePage from "../templates/homepage/HomePage";

class Routes extends React.Component{
    render() {
        return  (
            <Router history={hashHistory}>
                <Route path="/" component={HomePage}>
                    {/*<Route path="/mylibrary" component={Mylibrary}>*/}
                        {/*<Route path="/mylibrary/MyInfo" component={Myinfo} />*/}
                        {/*<Route path="/mylibrary/ChangePsd" component={Changepsd} />*/}
                        {/*<Route path="/mylibrary/ChangeInfo" component={Changeinfo} />*/}
                    {/*</Route>*/}
                </Route>
            </Router>
        );
    }
}
export default Routes;
