import React from 'react';
import { Router, Route, hashHistory} from 'react-router';

import HomePage from "../templates/homepage/HomePage";
import HomePageSearch from "../templates/homepage/HomePageSearch";
import Login from "../templates/login/Login";
import UserManage from "../templates/user/UserManage";
import ExcelUpload from "../templates/excelUpload/ExcelUpload";

class Routes extends React.Component{
    render() {
        return  (
            <Router history={hashHistory}>
                <Route path="/" component={Login} />
                <Route path="/homePage" component={HomePage}>
                    <Route path="/homePage/Search" component={HomePageSearch} />
                    <Route path="/homePage/userManage" component={UserManage} />
                    <Route path="/homePage/upload" component={ExcelUpload} />
                </Route>
            </Router>
        );
    }
}
export default Routes;
